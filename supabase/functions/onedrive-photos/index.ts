// Supabase Edge Function: onedrive-photos
// Fetches and normalizes photos from Microsoft Graph / OneDrive shared folder
// Deploy command: supabase functions deploy onedrive-photos

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

// Convert a standard OneDrive sharing URL into a Microsoft Graph sharing token
function encodeSharingUrl(url: string): string {
  const base64 = btoa(url);
  const base64Url = base64
    .replace(/=/g, '')
    .replace(/\//g, '_')
    .replace(/\+/g, '-');
  return `u!${base64Url}`;
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const sharedFolderUrl =
      Deno.env.get('ONEDRIVE_FOLDER_URL') ||
      'https://1drv.ms/f/c/0C611E8D3ECCD702/Ei4SU4pGo7JLu-Vi6GSR3VEB0R5vkIwBKLEg6j9-Z1iEmw';

    const clientId = Deno.env.get('MICROSOFT_CLIENT_ID');
    const clientSecret = Deno.env.get('MICROSOFT_CLIENT_SECRET');
    const tenantId = Deno.env.get('MICROSOFT_TENANT_ID') || 'consumers';

    // If Microsoft Graph app credentials are configured, authenticate and fetch directly from Microsoft Graph API
    if (clientId && clientSecret) {
      const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
      const tokenParams = new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'client_credentials',
        scope: 'https://graph.microsoft.com/.default',
      });

      const tokenRes = await fetch(tokenUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: tokenParams.toString(),
      });

      if (!tokenRes.ok) {
        throw new Error(`Failed to obtain Microsoft Graph token: ${tokenRes.statusText}`);
      }

      const tokenData = await tokenRes.json();
      const accessToken = tokenData.access_token;

      const sharingToken = encodeSharingUrl(sharedFolderUrl);
      const graphUrl = `https://graph.microsoft.com/v1.0/shares/${sharingToken}/driveItem/children?$select=id,name,description,webUrl,@microsoft.graph.downloadUrl,thumbnails,file`;

      const graphRes = await fetch(graphUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
      });

      if (!graphRes.ok) {
        throw new Error(`Microsoft Graph API request failed: ${graphRes.statusText}`);
      }

      const graphData = await graphRes.json();
      const items = graphData.value || [];

      // Filter for image mime types or extensions
      const imageItems = items.filter((item: any) => {
        const mime = item.file?.mimeType || '';
        const name = (item.name || '').toLowerCase();
        return (
          mime.startsWith('image/') ||
          name.endsWith('.jpg') ||
          name.endsWith('.jpeg') ||
          name.endsWith('.png') ||
          name.endsWith('.webp')
        );
      });

      const normalized = imageItems.map((item: any, index: number) => ({
        id: item.id || `onedrive-${index}`,
        title: item.name ? item.name.replace(/\.[^/.]+$/, '') : `Photo ${index + 1}`,
        caption: item.description || item.name?.replace(/\.[^/.]+$/, '') || 'Memorial photograph',
        src: item['@microsoft.graph.downloadUrl'] || item.webUrl,
        thumbnail: item.thumbnails?.[0]?.large?.url || item['@microsoft.graph.downloadUrl'] || item.webUrl,
        source: 'onedrive-graph',
      }));

      return new Response(JSON.stringify({ photos: normalized, count: normalized.length }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }

    // Default response when credentials are not yet configured in Supabase environment
    return new Response(
      JSON.stringify({
        photos: [],
        count: 0,
        configured: false,
        message: 'Microsoft Graph credentials not configured. Please set MICROSOFT_CLIENT_ID and MICROSOFT_CLIENT_SECRET in Supabase secrets.',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message, photos: [] }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});

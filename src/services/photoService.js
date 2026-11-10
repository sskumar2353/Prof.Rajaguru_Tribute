import { supabase } from './tributeService';
import { memorial } from '../data/memorial';

export async function getMemorialPhotos() {
  const fallbackPhotos = Array.isArray(memorial.photos) ? memorial.photos : [];

  try {
    // Attempt to invoke the Supabase Edge Function for OneDrive enumeration
    const { data, error } = await supabase.functions.invoke('onedrive-photos');

    if (!error && data?.photos && Array.isArray(data.photos) && data.photos.length > 0) {
      return data.photos;
    }
  } catch (err) {
    // Edge function not deployed or network unavailable; use verified memorial photo archive
    console.info('Supabase Edge Function onedrive-photos not active, falling back to curated archive.');
  }

  return fallbackPhotos.map((photo, index) => ({
    id: photo.id || `photo-${index}`,
    src: photo.src || photo.url,
    alt: photo.alt || photo.caption || 'Memorial photograph',
    title: photo.title || photo.caption || 'A cherished memory',
    caption: photo.caption || photo.title || 'A cherished memory',
  }));
}

import https from 'https';

const GOOGLE_PHOTOS_ALBUM_URL =
  'https://photos.app.goo.gl/yumGfaYodZ19hmHV6';

function fetchAlbum(shareUrl) {
  return new Promise((resolve, reject) => {
    function follow(url) {
      https
        .get(url, (res) => {
          if (
            res.statusCode >= 300 &&
            res.statusCode < 400 &&
            res.headers.location
          ) {
            follow(res.headers.location);
          } else if (res.statusCode === 200) {
            let body = '';
            res.on('data', (chunk) => (body += chunk));
            res.on('end', () => {
              const photos = [];
              const baseSet = new Set();

              // Parse AF_initDataCallback with key ds:1 to access full media item metadata
              const dsMatch = body.match(
                /AF_initDataCallback\((\{key:\s*\'ds:1\',[\s\S]*?\})\);/
              );

              if (dsMatch) {
                try {
                  // eslint-disable-next-line no-eval
                  let obj;
                  eval('obj = ' + dsMatch[1]);
                  const items = obj?.data?.[1] || [];

                  items.forEach((item) => {
                    const mediaData = item[1];
                    if (!mediaData || !mediaData[0]) return;
                    const url = mediaData[0];
                    const metadata = item[9] || {};

                    // Key 76647426 contains video duration (durationMs); ignore videos!
                    const isVideo = Boolean(
                      metadata['76647426'] ||
                      (item[8] && item[8].some && item[8].some((x) => x[0] === 36))
                    );

                    if (!isVideo && !baseSet.has(url)) {
                      baseSet.add(url);
                      photos.push({
                        id: `gphoto-${photos.length + 1}`,
                        src: `${url}=w1600`,
                        thumbnail: `${url}=w800`,
                        width: mediaData[1],
                        height: mediaData[2],
                        alt: 'Memorial photograph of Prof. Rajaguru',
                      });
                    }
                  });
                } catch (e) {
                  console.error('Error parsing ds:1 JSON', e);
                }
              }

              // Fallback regex if ds:1 couldn't be parsed
              if (photos.length === 0) {
                const regex =
                  /https:\/\/lh3\.googleusercontent\.com\/pw\/([a-zA-Z0-9_\-=]+)/g;
                let match;
                while ((match = regex.exec(body)) !== null) {
                  const full = match[0];
                  const base = full.split('=')[0];
                  if (!baseSet.has(base)) {
                    baseSet.add(base);
                    photos.push({
                      id: `gphoto-${photos.length + 1}`,
                      src: `${base}=w1600`,
                      thumbnail: `${base}=w800`,
                      alt: 'Memorial photograph of Prof. Rajaguru',
                    });
                  }
                }
              }

              resolve(photos);
            });
          } else {
            reject(new Error(`HTTP ${res.statusCode}`));
          }
        })
        .on('error', reject);
    }
    follow(shareUrl);
  });
}

export default async function handler(req, res) {
  try {
    const photos = await fetchAlbum(GOOGLE_PHOTOS_ALBUM_URL);
    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=1800');
    // Reversed so newest added photos are returned first at the top
    const reversed = [...photos].reverse();
    return res.status(200).json({ success: true, count: reversed.length, photos: reversed });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

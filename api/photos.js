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
              const regex =
                /https:\/\/lh3\.googleusercontent\.com\/pw\/([a-zA-Z0-9_\-=]+)/g;
              let match;
              const baseSet = new Set();
              const photos = [];

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
                    title: `Cherished Memory ${photos.length + 1}`,
                    caption: `Cherished memory ${photos.length + 1}`,
                  });
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
    return res.status(200).json({ success: true, count: photos.length, photos });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

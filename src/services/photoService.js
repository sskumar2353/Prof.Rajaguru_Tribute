import { googlePhotos } from '../data/googlePhotos';
import { memorial } from '../data/memorial';

export async function getMemorialPhotos() {
  // 1. Try to fetch dynamically from live Google Photos album via serverless endpoint
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await fetch('/api/photos', {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data?.photos && Array.isArray(data.photos) && data.photos.length > 0) {
        // Return reversed: latest/newest added photographs appear first at the top
        return [...data.photos].reverse();
      }
    }
  } catch (err) {
    // Falls back seamlessly to pre-cached verified Google Photos
  }

  // 2. Return pre-cached verified Google Photos (reversed: latest photos first)
  if (Array.isArray(googlePhotos) && googlePhotos.length > 0) {
    return [...googlePhotos].reverse();
  }

  // 3. Fallback to memorial config photos
  const fallbackPhotos = Array.isArray(memorial.photos) ? memorial.photos : [];
  return [...fallbackPhotos].reverse().map((photo, index) => ({
    id: photo.id || `photo-${index}`,
    src: photo.src || photo.url,
    thumbnail: photo.thumbnail || photo.src || photo.url,
    alt: 'Memorial photograph of Prof. Rajaguru',
  }));
}

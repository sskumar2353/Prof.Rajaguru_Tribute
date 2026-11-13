import { localPhotos } from '../data/localPhotos';
import { memorial } from '../data/memorial';

export async function getMemorialPhotos() {
  // Use locally stored photographs from /public/assets/
  if (Array.isArray(localPhotos) && localPhotos.length > 0) {
    return localPhotos;
  }

  // Fallback to memorial config photos if ever needed
  const fallbackPhotos = Array.isArray(memorial.photos) ? memorial.photos : [];
  return fallbackPhotos.map((photo, index) => ({
    id: photo.id || `photo-${index}`,
    src: photo.src || photo.url,
    thumbnail: photo.thumbnail || photo.src || photo.url,
    alt: 'Memorial photograph of Prof. Rajaguru',
  }));
}

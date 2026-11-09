import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !publishableKey) {
  throw new Error(
    'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to your .env file.',
  );
}

export const supabase = createClient(supabaseUrl, publishableKey);

export async function getTributes() {
  try {
    const { data, error } = await supabase
      .from('tributes')
      .select('id, name, place, message, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      // If 'place' column does not exist in schema yet, fallback to baseline query
      if (error.message?.includes('place') || error.code === '42703') {
        const fallback = await supabase
          .from('tributes')
          .select('id, name, message, created_at')
          .order('created_at', { ascending: false });
        if (fallback.error) throw fallback.error;
        return Array.isArray(fallback.data) ? fallback.data : [];
      }
      throw error;
    }
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('Error fetching tributes:', err);
    throw err;
  }
}

export async function createTribute({ name, place, message }) {
  const payload = {
    name: name.trim(),
    message: message.trim(),
  };

  const cleanPlace = place ? place.trim() : '';
  if (cleanPlace && cleanPlace.toLowerCase() !== 'not specified') {
    payload.place = cleanPlace;
  }

  try {
    const { data, error } = await supabase
      .from('tributes')
      .insert(payload)
      .select('id, name, place, message, created_at')
      .single();

    if (error) {
      // If 'place' column does not exist in user schema, retry without it
      if (payload.place && (error.message?.includes('place') || error.code === '42703')) {
        delete payload.place;
        const fallback = await supabase
          .from('tributes')
          .insert(payload)
          .select('id, name, message, created_at')
          .single();
        if (fallback.error) throw fallback.error;
        return fallback.data;
      }
      throw error;
    }
    return data;
  } catch (err) {
    console.error('Error creating tribute:', err);
    throw err;
  }
}

import { createClient } from '@supabase/supabase-js';
import { fallbackTributes } from '../data/fallbackTributes';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !publishableKey) {
  throw new Error(
    'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to your .env file.',
  );
}

export const supabase = createClient(supabaseUrl, publishableKey);

// Map of message prefixes to full unabridged messages from the authentic Excel file
const fullMessageMap = new Map();
fallbackTributes.forEach((t) => {
  if (t.message) {
    fullMessageMap.set(t.message.substring(0, 100).trim(), t.message);
  }
});

function normalizeTribute(item) {
  const rawName = item.name ? String(item.name).trim() : '';
  const rawPlace = item.place ? String(item.place).trim() : '';
  const rawMessage = item.message ? String(item.message).trim() : '';

  // Check if this message was truncated by database character limits and restore full text
  let finalMessage = rawMessage;
  const prefix = rawMessage.substring(0, 100).trim();
  if (fullMessageMap.has(prefix)) {
    finalMessage = fullMessageMap.get(prefix);
  }

  return {
    ...item,
    name: rawName,
    place: rawPlace,
    message: finalMessage,
  };
}

export async function getTributes() {
  try {
    const { data, error } = await supabase
      .from('tributes')
      .select('id, name, place, message, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      if (error.message?.includes('place') || error.code === '42703') {
        const fallback = await supabase
          .from('tributes')
          .select('id, name, message, created_at')
          .order('created_at', { ascending: false });
        if (fallback.error) throw fallback.error;
        const normalized = (fallback.data || []).map(normalizeTribute);
        return normalized.length > 0 ? normalized : fallbackTributes;
      }
      throw error;
    }

    const normalized = (data || []).map(normalizeTribute);
    return normalized.length > 0 ? normalized : fallbackTributes;
  } catch (err) {
    console.warn('Falling back to local tributes due to network error:', err);
    return fallbackTributes;
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

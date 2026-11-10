import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!url) {
  throw new Error('VITE_SUPABASE_URL is missing.');
}

if (!publishableKey) {
  throw new Error('VITE_SUPABASE_PUBLISHABLE_KEY is missing.');
}

const supabase = createClient(url, publishableKey);

export async function getTributes() {
  const { data, error } = await supabase
    .from('tributes')
    .select('id, name, place, message, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return Array.isArray(data) ? data : [];
}

export async function createTribute({ name, place, message }) {
  const { data, error } = await supabase
    .from('tributes')
    .insert({
      name: name.trim(),
      place: place.trim(),
      message: message.trim(),
    })
    .select('id, name, place, message, created_at')
    .single();

  if (error) {
    throw error;
  }

  return data;
}
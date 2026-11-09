import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !publishableKey) {
  throw new Error(
    'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to your .env file.',
  );
}

const supabase = createClient(supabaseUrl, publishableKey);

export async function getTributes() {
  const { data, error } = await supabase
    .from('tributes')
    .select('id, name, message, created_at')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return Array.isArray(data) ? data : [];
}

export async function createTribute({ name, message }) {
  const { data, error } = await supabase
    .from('tributes')
    .insert({
      name: name.trim(),
      message: message.trim(),
    })
    .select('id, name, message, created_at')
    .single();

  if (error) throw error;
  return data;
}

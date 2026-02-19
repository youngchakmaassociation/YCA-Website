import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

// Create a client even if values are missing to prevent runtime crashes.
// The api.js handler will detect if these are placeholders and trigger fallbacks.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.warn('Supabase URL is missing. The app is running in Demo Mode.');
}

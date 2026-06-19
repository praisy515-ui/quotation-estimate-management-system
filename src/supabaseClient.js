import { createClient } from '@supabase/supabase-js';

// Support both Vite (VITE_) and Next.js (NEXT_PUBLIC_) environment variable prefix names
const supabaseUrl = 
  import.meta.env.VITE_SUPABASE_URL || 
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL || 
  '';

const supabaseAnonKey = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 
  '';

// Safely initialize the Supabase client only if keys are present
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

if (!supabase) {
  console.warn(
    "Supabase client not initialized. Please copy '.env.example' to '.env.local' and add your Supabase URL and Anon Key."
  );
}

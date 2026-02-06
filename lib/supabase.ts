import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

// #region agent log
if (typeof fetch !== 'undefined') fetch('http://127.0.0.1:7242/ingest/6e40aa55-1f21-4915-8f95-48a5c1d51167',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'lib/supabase.ts:init',message:'Supabase env at load',data:{hasUrl:Boolean(supabaseUrl),hasKey:Boolean(supabaseKey),isConfigured:isSupabaseConfigured},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H1'})}).catch(()=>{});
// #endregion

export const supabase: SupabaseClient = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey)
  : createClient('https://placeholder.supabase.co', 'placeholder-key');
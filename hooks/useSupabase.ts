'use client'
import { getSupabaseBrowserClient } from '@/utils/supabase';
import { useMemo } from 'react';
 
function useSupabase() {
  return useMemo(getSupabaseBrowserClient, []);
}
 
export default useSupabase;
import { TypedSupabaseClient } from "@/utils/supabase";

export function getWatchesByUserId(
    client: TypedSupabaseClient, 
    userId: string
  ) {
    return client
    .from("watches")
    .select("*")
    .eq("user_id", userId)
    .order("brand", { ascending: true });
  }
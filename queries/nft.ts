'use server';

import { INFTItem } from "@/types/types";
import { TypedSupabaseClient } from "@/utils/supabase";
import useSupabaseServer from "@/utils/supabase-server";
import { cookies } from "next/headers";

export async function createNft(
    client: TypedSupabaseClient, 
    createNft: INFTItem
  ) {
    const plainNftItem = JSON.parse(JSON.stringify(createNft));
    console.log(plainNftItem)
    return client
    .from("nft")
    .insert(createNft as any)
    .select('id')
    .single();
  }

  export async function createNfttest(formData: any) {
    const coolieStore = cookies();
    const supabase = useSupabaseServer(coolieStore)
  
    const { error, data } = await supabase.from("nft")
    .insert(formData as any)
    .select('id')
    .single();
  
    if (error) {
      console.log(error)
    }
    return data;
    // revalidatePath('/', 'layout')
    // redirect('/')
  }

  export async function getNftById(nftId: string) {
    const coolieStore = cookies();
    const supabase = useSupabaseServer(coolieStore)
  
    const { error, data } = await supabase
    .from('nft') 
    .select('*')            
    .eq('id', nftId)
    .single();        
  
    if (error) {
      console.log(error)
    }
    return data;
    // revalidatePath('/', 'layout')
    // redirect('/')
  }


  export async function getNftList(
    client: TypedSupabaseClient, 
  ) {
    return client
    .from("nft")
    .select('*')
  }
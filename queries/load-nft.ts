import { TypedSupabaseClient } from "@/utils/supabase";
import {v4 as uuid} from 'uuid';

export const uploadImage = (file: File, userId: string, client: TypedSupabaseClient ) => 
      client.storage
        .from("images")
        .upload(userId + "/" + uuid().toString(), file);

export const getNft = (client: TypedSupabaseClient, userId: string) => 
    client.storage.from("images").list(userId);

export const deleteImageByUserId = (client: TypedSupabaseClient, userId: string, imageName: string) => 
    client.storage.from("images").remove([userId + '/' + imageName]);
import { TypedSupabaseClient } from "@/utils/supabase";
import { getNft } from "@/queries/load-nft";

function useGetNft(userId: string, client: TypedSupabaseClient) {
    const queryKey = ['images', userId];

    const queryFn = async () => {
      return getNft(client, userId).then(
        (result) => result.data
      );
    };

    return { queryKey, queryFn, enabled: userId !== 'undefined' };
  }
   
  export default useGetNft;
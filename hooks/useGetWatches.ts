import { useQuery, useQueryClient } from "@tanstack/react-query";
import useSupabase from "./useSupabase";
import { getWatchesByUserId } from "@/queries/get-watches";
import { TypedSupabaseClient } from "@/utils/supabase";

function useGetWatches({userId, client}: {userId: string, client: TypedSupabaseClient}) {
    const queryKey = ['watches', userId];

    const queryFn = async () => {
      return getWatchesByUserId(client, userId).then(
        (result) => result.data
      );
    };

    return { queryKey, queryFn, enabled: userId !== 'undefined' };
  }
   
  export default useGetWatches;
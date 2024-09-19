import { createNfttest, getNftById } from "@/queries/nft";
import { INFTItem } from "@/types/types";
import { TypedSupabaseClient } from "@/utils/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateNft = () => {
    const queryClient = useQueryClient();
    const mutationFn = async ({createNftData}: {createNftData: INFTItem, client: TypedSupabaseClient}) => {
      return createNfttest(createNftData)
    };
   
    return useMutation({ mutationFn,  onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['images'] })
      }, onError: (erroe) => console.log(erroe)});
  }

  function useGetNftById(nftId: string) {
    const queryKey = ['nftItem', nftId];

    const queryFn = async () => {
      return getNftById(nftId).then(
        (result) => result
      );
    };

    return { queryKey, queryFn, enabled: nftId !== 'undefined' };
  }

  export {useCreateNft, useGetNftById} 
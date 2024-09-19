import { deleteImageByUserId, uploadImage } from "@/queries/load-nft";
import { TypedSupabaseClient } from "@/utils/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

  const useLoadNft = () => {
    const queryClient = useQueryClient();
   
    const mutationFn = async ({file, userId, client}: {file: File, userId: string, client: TypedSupabaseClient}) => {
      return uploadImage(file,userId, client).then(
        (result) => result.data
      );
    };
   
    return useMutation({ mutationFn,  onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['images'] })
      }  });
  }

  const useDeleteNft = () => {
    const queryClient = useQueryClient();
   
    const mutationFn = async ({imgName, userId, client}: {imgName: string, userId: string, client: TypedSupabaseClient}) => {
      return deleteImageByUserId(client, userId, imgName).then(
        (result) => result.data
      );
    };
   
    return useMutation({ mutationFn,  onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['images'] })
      }  });
  }

  export {useLoadNft, useDeleteNft}
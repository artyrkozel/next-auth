import { getNftList } from "@/queries/nft";
import { useQuery } from "@tanstack/react-query";
import useSupabase from "./useSupabase";

  const useGetNftList = () => {
    const client = useSupabase();
    return useQuery({
        queryFn: async () => getNftList(client),
        queryKey: ['nft-list']
      });
  }

  export {useGetNftList};
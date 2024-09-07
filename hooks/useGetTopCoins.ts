import { fetchWatches } from "@/queries/getTopCoins";

function useGetTopCoins() {
    const queryKey = ['top-coins'];

    const queryFn = async () => {
      return fetchWatches().then(
        (result) => result.data
      );
    };

    return { queryKey, queryFn };
  }
   
  export default useGetTopCoins;
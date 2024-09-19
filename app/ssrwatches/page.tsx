import useGetWatches from "@/hooks/useGetWatches";
import useSupabaseServer from "@/utils/supabase-server";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import Watches from "./watches";
import { Page } from "../components/Page/Page";
import useGetTopCoins from "@/hooks/useGetTopCoins";
import { useGetNftList } from "@/hooks/useGetNftList";
import { getNftList } from "@/queries/nft";

export default async function WatchesPage() {
  const queryClient = new QueryClient();
  const coolieStore = cookies();
  const client = useSupabaseServer(coolieStore);
  const {
    data: { user },
  } = await client.auth.getUser();

  await queryClient.prefetchQuery(
    useGetWatches({ userId: String(user?.id), client })
  );

  await queryClient.prefetchQuery({
    queryKey: ["nft-list"],
    queryFn: () => getNftList(client),
  });

  // await queryClient.prefetchQuery(useGetTopCoins());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Page>
        <Watches userId={String(user?.id)} />
      </Page>
    </HydrationBoundary>
  );
}

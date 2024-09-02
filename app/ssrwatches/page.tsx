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

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Page>
        <Watches userId={String(user?.id)} />
      </Page>
    </HydrationBoundary>
  );
}

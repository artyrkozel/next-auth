import useGetWatches from "@/hooks/useGetWatches";
import useUser from "@/hooks/useUser";
import useSupabaseServer from "@/utils/supabase-server";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import Watches from "./watches";

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
      <Watches userId={String(user?.id)} />
    </HydrationBoundary>
  );
}

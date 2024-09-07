"use client";

import useGetWatches from "@/hooks/useGetWatches";
import useSupabase from "@/hooks/useSupabase";
import useUser from "@/hooks/useUser";
import { useQuery } from "@tanstack/react-query";
import { Page } from "../components/Page/Page";
import useGetTopCoins from "@/hooks/useGetTopCoins";

export default function WatchesPage() {
  const { user } = useUser();
  const client = useSupabase();
  const { data: watchkst } = useQuery(
    useGetWatches({ userId: String(user?.id), client })
  );

  const { data: topCoins } = useQuery(useGetTopCoins());

  return (
    <Page>
      <div className="bg-slate-500">
        {watchkst &&
          watchkst.length &&
          watchkst.map((el) => (
            <div key={el.id}>
              <div>{el.brand}</div>
            </div>
          ))}
      </div>
    </Page>
  );
}

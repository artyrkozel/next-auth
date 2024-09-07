"use client";

import useGetTopCoins from "@/hooks/useGetTopCoins";
import useGetWatches from "@/hooks/useGetWatches";
import useSupabase from "@/hooks/useSupabase";
import { useQuery } from "@tanstack/react-query";

const Watches = ({ userId }: { userId: String }) => {
  const client = useSupabase();

  const { data } = useQuery(useGetWatches({ userId: String(userId), client }));
  const { data: topCoins } = useQuery(useGetTopCoins());
  
  return (
    <div>
      {data?.map((el) => (
        <div key={el.id}>{el.brand}</div>
      ))}
    </div>
  );
};

export default Watches;

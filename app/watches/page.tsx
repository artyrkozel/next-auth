"use client";
import useGetWatches from "@/hooks/useGetWatches";
import useSupabase from "@/hooks/useSupabase";
import useUser from "@/hooks/useUser";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function WatchesPage() {
  const { user } = useUser();
  const client = useSupabase();
  const { data: watchkst } = useQuery(
    useGetWatches({ userId: String(user?.id), client })
  );

  return (
    <div>
      {watchkst &&
        watchkst.length &&
        watchkst.map((el) => (
          <div key={el.id}>
            <div>{el.brand}</div>
          </div>
        ))}
    </div>
  );
}

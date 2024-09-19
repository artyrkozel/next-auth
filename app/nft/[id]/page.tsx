"use client";

import { useGetNftById } from "@/hooks/useCreateNft";
import { useQuery } from "@tanstack/react-query";

export default function PostPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const { data } = useQuery(useGetNftById(id));
  console.log(data);
  return <div>sdfsdfdf</div>;
}

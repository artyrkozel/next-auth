"use client";

import useGetWatches from "@/hooks/useGetWatches";
import useSupabase from "@/hooks/useSupabase";
import useUser from "@/hooks/useUser";
import { useQuery } from "@tanstack/react-query";
import { Page } from "../components/Page/Page";
import useGetTopCoins from "@/hooks/useGetTopCoins";
import { ChangeEvent } from "react";
import useGetNft from "@/hooks/useGetNft";
import { useDeleteNft, useLoadNft } from "@/hooks/useLoadNft";
import Image from "next/image";
import Button from "../components/Button/Button";

const CDN =
  "https://bcruufbaahvqnrzayvgy.supabase.co/storage/v1/object/public/images";

export default function WatchesPage() {
  const { user } = useUser();
  const client = useSupabase();
  const { data: watchkst } = useQuery(
    useGetWatches({ userId: String(user?.id), client })
  );

  // const { data: topCoins } = useQuery(useGetTopCoins());
  const { data: nftList } = useQuery(useGetNft(String(user?.id), client));
  const { mutateAsync: loadNft } = useLoadNft();
  const { mutateAsync: deleteImg } = useDeleteNft();


  const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files && e.target.files.length) {
      loadNft({
        file: e.target.files[0],
        userId: String(user?.id),
        client,
      });
    }
  };

  const deleteImgHandler = async (imgName: string) => {
    deleteImg({ imgName, userId: String(user?.id), client });
  };

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
      <div>
        {user &&
          nftList &&
          nftList.length &&
          nftList.map((el: any) => (
            <>
              <Image
                src={`${CDN}/${String(user.id)}/${el.name}`}
                alt="img"
                width={100}
                height={100}
              />
              <Button onClick={() => deleteImgHandler(el.name)}>delete</Button>
            </>
          ))}
      </div>
      <input type="file" onChange={(e) => uploadImage(e)} />
    </Page>
  );
}

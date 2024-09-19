"use client";
import Button, { ButtonTheme } from "@/app/components/Button/Button";
import { FileChangeEvent } from "@/app/components/InputFile/InputFile";
import { Page } from "@/app/components/Page/Page";
import { IMG_TYPES, Upload } from "@/app/components/Upload/Upload";
import { useState } from "react";
import { IoCloudDownloadSharp } from "react-icons/io5";
import { Text } from "@/app/components/Text/Text";
import { ContentWrapper } from "@/app/components/ContentWrapper/ContentWrapper";
import { ControllerInput } from "@/app/components/ControllerInput/ControllerInput";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import { useCreateNft } from "@/hooks/useCreateNft";
import { useLoadNft } from "@/hooks/useLoadNft";
import useUser from "@/hooks/useUser";
import useSupabase from "@/hooks/useSupabase";
import { INFTItem } from "@/types/types";
import { useRouter } from "next/navigation";
import { useGetNftList } from "@/hooks/useGetNftList";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { z } from "zod";

const UserSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  discription: z.string().min(1, { message: "Discription is required" }),
  price: z.string().min(1, { message: "Price is required" }),
  size: z.string(),
  category: z.array(z.string()).min(1, { message: "Properties is required" }),
  royality: z.string().min(1, { message: "Royality is required" }),
  properties: z.string().min(1, { message: "Properties is required" }),
});

interface INftFields {
  name: string;
  discription: string;
  price: string;
  size: string;
  properties: string;
  royality: string;
  category: string[];
}

export type TNFTCreate = z.infer<typeof UserSchema>;

const NFTCreatePage = () => {
  const [preview, setPreview] = useState<null | File>(null);
  const { data } = useGetNftList();
  const queryClient = new QueryClient();
  console.log(data);
  const { mutateAsync: createNft, isPending: createNftLoading } =
    useCreateNft();
  const { mutateAsync: loadNft, isPending: loadNftLoading } = useLoadNft();
  const { user } = useUser();
  const client = useSupabase();
  const router = useRouter();

  const form = useForm<INftFields>({
    // resolver: zodResolver(UserSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      discription: "",
      price: "",
      size: "",
      properties: "",
      royality: "",
      category: [],
    },
  });

  const onChange = (e: FileChangeEvent) => {
    if (e.target.value[0]) {
      setPreview(e.target.value[0]);
    }
  };

  const handleSubmit: SubmitHandler<TNFTCreate> = async (data: TNFTCreate) => {
    const fileRes = await loadNft({
      file: preview as File,
      userId: String(user?.id),
      client,
    });

    const createNftData: INFTItem = {
      id: uuidv4(),
      likes: 0,
      category: ["Art"],
      created_at: new Date().toISOString(),
      discription: data.discription,
      price: Number(data.price),
      preview_image: fileRes?.id as string,
      product_name: data.name,
      user_id: user?.id as string,
      properties: data.properties,
      royality: data.royality,
      size: Number(data.size),
      updated_at: null,
    };
    console.log(createNftData);

    const nft = await createNft({
      createNftData,
      client,
    });

    if (nft && nft.id) {
      router.push(`/nft/${nft.id}`);
    }
  };

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Page pageTitle="Create NFT">
        <div
          style={{ maxWidth: "60%", margin: "0 auto", gap: 12 }}
          className="flex items-center m-w[80%]"
        >
          <div className="group max-w-[300px] w-[300px] h-[300px] max-h-[300px] cursor-pointer">
            <Upload
              variant={ButtonTheme.CLEAR}
              fileType={IMG_TYPES}
              onChange={onChange}
            >
              <div className="flex flex-col justify-center items-center">
                <IoCloudDownloadSharp color="#1ba1f2" size={40} />
                <Text className="text-gray-500" text="Load Image" />
              </div>
            </Upload>
          </div>
          <ContentWrapper>
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)}>
                <div className="grid grid-cols-3 gap-5">
                  <ControllerInput
                    label="Product Name"
                    placeholder="e. g."
                    className="col-span-3"
                    name="name"
                  />
                  <ControllerInput
                    label="Discription"
                    placeholder="e. g. “After purchasing the product you can get item...”"
                    className="col-span-3"
                    name="discription"
                  />
                  <ControllerInput
                    label="Item Price in $"
                    placeholder="e. g. `20$`"
                    name="price"
                  />
                  <ControllerInput
                    label="Size"
                    placeholder="e. g. `Size`"
                    name="size"
                  />
                  <ControllerInput
                    label="Properties"
                    placeholder="e. g. `Propertie`"
                    name="properties"
                  />
                  <ControllerInput
                    label="Royality"
                    placeholder="e. g. `20%`"
                    className="col-span-3"
                    name="royality"
                  />
                  <Button className="col-span-1" variant="primary">
                    Preview
                  </Button>
                  <Button
                    className="col-span-2"
                    variant="secondary"
                    type="submit"
                    isLoading={createNftLoading || loadNftLoading}
                  >
                    Create NFT
                  </Button>
                </div>
              </form>
            </FormProvider>
          </ContentWrapper>
        </div>
      </Page>
    </HydrationBoundary>
  );
};

export default NFTCreatePage;

"use client";

import { Page } from "./components/Page/Page";
import { Dropdown } from "./components/Dropdown/Dropdown";
import { IOptions } from "@/types/types";
import { ControlWrapperForm } from "./components/ControlWrapperForm/ControlWrapperForm";
import { FormProvider, useForm } from "react-hook-form";
import { VscClose } from "react-icons/vsc";

export default function Home() {
  const methods = useForm<any>({
    mode: "onChange",
    defaultValues: {
      toCurrenency: null,
      test: null,
    },
  });
  const opt: IOptions[] = [
    {
      label: "Select an option",
      value: "Option 1",
      icon: VscClose,
    },
    {
      label: "qweqweqwe",
      value: "wrwerwer",
    },
  ];

  return (
    <Page pageTitle="tADE">
      <h1>Hello, Next.js!</h1>
      <FormProvider {...methods}>
        <ControlWrapperForm name="toCurrenency">
          <Dropdown placeholder="seelct" options={opt} showCleanBtn />
        </ControlWrapperForm>
      </FormProvider>
    </Page>
  );
}

"use client";

import { Page } from "./components/Page/Page";
import { Dropdown } from "./components/Dropdown/Dropdown";
import { IOptions } from "@/types/types";
import { ControlWrapperForm } from "./components/ControlWrapperForm/ControlWrapperForm";
import { FormProvider, useForm } from "react-hook-form";
import { VscClose } from "react-icons/vsc";
import { CardTheme } from "./components/Card/Card";
import { ContentWrapper } from "./components/ContentWrapper/ContentWrapper";

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
      <ContentWrapper title="test" theme={CardTheme.OUTLINED}>
        <FormProvider {...methods}>
          <ControlWrapperForm name="toCurrenency">
            <Dropdown placeholder="seelct" options={opt} showCleanBtn />
          </ControlWrapperForm>
        </FormProvider>
      </ContentWrapper>
    </Page>
  );
}

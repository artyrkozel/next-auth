"use client";

import { useFormStatus } from "react-dom";
import { Logout } from "./api/auth-actions";
import Button from "./components/Button/Button";
import { Page } from "./components/Page/Page";

export default function Home() {
  const { pending } = useFormStatus();

  return (
    <Page pageTitle="tADE">
      <h1>Hello, Next.js!</h1>
      <Button disabled={pending} type="submit">
        {pending ? "Loading" : "Logout"}
      </Button>
    </Page>
  );
}

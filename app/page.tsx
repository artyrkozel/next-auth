"use client";

import { useFormStatus } from "react-dom";
import { Logout } from "./api/auth-actions";
import { ThemeSwitcher } from "./components/ThemeSwitcher/ThemeSwitcher";
import Button from "./components/Button/Button";

export default function Home() {
  const { pending } = useFormStatus();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ThemeSwitcher />
      <form action={Logout}>
        <Button disabled={pending} type="submit">
          {pending ? "Loading" : "Logout"}
        </Button>
      </form>
    </main>
  );
}

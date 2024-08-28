"use client";

import { useFormStatus } from "react-dom";
import { Logout } from "./login/actions";

export default function Home() {
  const { pending } = useFormStatus();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form action={Logout}>
        <button disabled={pending} type="submit">
          {pending ? "Loading" : "Logout"}
        </button>
      </form>
    </main>
  );
}

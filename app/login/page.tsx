"use client";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { ControllerInput } from "../components/ControllerInput/ControllerInput";
import Button from "../components/Button/Button";
import { Text, TextSize } from "../components/Text/Text";
import { Login, Signup } from "../api/auth-actions";
import { useMutation } from "@tanstack/react-query";

const UserSchema = z.object({
  password: z.string().min(1, { message: "Name is required" }),
  email: z.string().email(),
});

export type TLogin = z.infer<typeof UserSchema>;

export default function LoginPage() {
  const { mutateAsync: login, isPending } = useMutation({
    mutationFn: Login,
    onError: (error) => {
      return alert(error.message || "Failed to login");
    },
  });

  const form = useForm<TLogin>({
    resolver: zodResolver(UserSchema),
    mode: "onChange",
  });

  const handleSubmit: SubmitHandler<TLogin> = async (data) => await login(data);

  return (
    <div className="h-lvh w-full grid grid-cols-2 grid-rows-1">
      <div className="flex items-center justify-center bg-slate-400 bg-login-bg">
        <div className="max-w-96">
          <Image
            className="text-center mb-8"
            src="/login-logo.png"
            alt="login-logo"
            width={400}
            height={100}
          />
          <Text
            className="text-white font-bold text-center mb-4"
            title="Buy & Sell Each Digital Cryptocurrency and Arts"
            size={TextSize.L}
          />
          <Text
            className="text-white font-semibold text-center leading-6"
            text="Easily buy Bitcoin and other cryptocurrencies using a wide range of payment options. Discover exclusive digital collectibles using InCrypto today"
            size={TextSize.S}
          />
        </div>
      </div>
      <div className=" flex items-center justify-center p-20 bg-grey-light">
        <div className="max-w-xs">
          <Text
            className="mb-4 font-bold text-center"
            title="Create Personal Account"
            size={TextSize.M}
          />
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <ControllerInput
                className="mb-6"
                name="email"
                label="email"
                type="text"
                autoFocus
                placeholder="Enter your email"
                max={19}
              />
              <ControllerInput
                className="mb-4"
                name="password"
                label="password"
                type="text"
                autoFocus
                placeholder="Enter your password"
                max={19}
              />
              <Button
                type="submit"
                className="w-full mb-2"
                isLoading={isPending}
              >
                Log in
              </Button>
              <Button
                className="w-full"
                formAction={Signup}
                variant="secondary"
              >
                Sign up
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}

"use client";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";
import { ControllerInput } from "../components/ControllerInput/ControllerInput";
import Button from "../components/Button/Button";
import { Text, TextSize } from "../components/Text/Text";
import { Login, Signup } from "../api/auth-actions";
import { useFormStatus } from "react-dom";

export default function LoginPage() {
  const methods = useForm();
  const { pending } = useFormStatus();

  const handleSubmit: SubmitHandler<any> = async (data) => {
    const res = await Login(data);
    console.log(res);
  };

  return (
    <div className="h-lvh w-1vh grid grid-cols-2 grid-rows-1">
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
          <FormProvider {...methods}>
            <form action={Login}>
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
              <Button formAction={Login} className="w-full mb-2">
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

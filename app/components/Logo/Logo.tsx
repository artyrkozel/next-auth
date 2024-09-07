'use client'

import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface ILogo {
  collapsed: boolean;
  className?: string;
}

export const Logo: FC<ILogo> = ({ collapsed, className }) => {
  return (
    <Link href="/" className={cn("block", className)}>
      {collapsed ? (
        <Image className="h-[52px]" src="/logo-mini.png" width={165} height={120} alt="logo" />
      ) : (
        <Image src="/logo.png" width={165} height={100} alt="logo" />
      )}
    </Link>
  );
};

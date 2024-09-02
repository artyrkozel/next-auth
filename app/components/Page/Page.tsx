import { FC, memo, ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Text, TextSize } from "../Text/Text";

interface PageProps {
  className?: string;
  children: ReactNode;
  pageTitle?: string;
}

export const Page: FC<PageProps> = memo(
  ({ className, pageTitle = "", children }) => {
    return (
      <main
        className={cn(
          "grow py-10 px-[62px] h-lvh overflow-auto shrink-1 bg-bg-page",
          className
        )}
      >
        <Text className="mb-11 font-bold" title={pageTitle} size={TextSize.M} />
        {children}
      </main>
    );
  }
);

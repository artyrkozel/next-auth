import { HTMLAttributes, memo, ReactNode } from "react";
import styles from "./Card.module.scss";
import { cn } from "@/utils/cn";

export enum CardTheme {
  NORMAL = "normal",
  OUTLINED = "outlined",
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  theme?: CardTheme;
  max?: boolean;
  overflowY?: boolean;
}

export const Card = memo((props: CardProps) => {
  const {
    className,
    children,
    max,
    theme = CardTheme.OUTLINED,
    overflowY = false,
    ...otherProps
  } = props;

  return (
    <div
      className={cn(
        "h-full p-4 rounded-xl cursor-pointer text-xs font-semibold bg-white",
        max && "w-full",
        overflowY && "overflow-y-scroll",
        className,
        theme === CardTheme.NORMAL && "bg-transparent text-grey-dark p-0",
        theme === CardTheme.OUTLINED && "border border-grey-dark"
      )}
      {...otherProps}
    >
      {children}
    </div>
  );
});

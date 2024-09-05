import { FC, ReactNode, memo } from "react";
import { Text } from "../Text/Text";
import { Card, CardTheme } from "../Card/Card";
import { cn } from "@/utils/cn";
import Button from "../Button/Button";

interface IContentWrapperProps {
  children: ReactNode;
  className?: string;
  title?: string;
  theme?: CardTheme;
  overflow?: boolean;
  fill?: boolean;
  onClick?: () => void;
  textButton?: string;
}

export const ContentWrapper: FC<IContentWrapperProps> = memo(
  ({
    children,
    className,
    theme,
    title,
    overflow = false,
    fill = false,
    onClick,
    textButton = "create",
  }) => {
    return (
      <div
        className={cn(
          "flex grow flex-col shrink",
          fill && "p-4 rounded-xl h-fit border-[#e8e8e8]",
          [className]
        )}
      >
        <div className="flex justify-between items-center">
          {title && <Text className="mb-4 ml-2 text-secondary font-semibold text-xl" title={title} />}
          {onClick && <Button onClick={onClick}>{textButton}</Button>}
        </div>
        <Card theme={theme} overflowY={overflow}>
          {children}
        </Card>
      </div>
    );
  }
);

'use client'

import React, { useMemo } from "react";
import { cn } from "@/utils/cn";
import { useUniqueId } from "@/hooks/useUniqueId";

export type ControlWrapperProps = {
  children:
    | React.JSXElementConstructor<{ hasError?: boolean; id?: string }>
    | React.ReactElement<{ hasError?: boolean; id?: string }>;
  getElementProps?: () => { hasError?: boolean; id?: string };
  error?: string;
  className?: string;
  headerClass?: string;
  label?: string | React.ReactNode;
};

export const ControlWrapper: React.FC<ControlWrapperProps> = React.forwardRef(
  ({ children, error, className, label, headerClass, getElementProps }) => {
    const wrapperClasses = cn("w-full inline-flex items-center", className);

    const headerClasses = cn("p-2 flex w-2/5 text-2xl", headerClass);
    const id = useUniqueId("control");

    const localGetElementProps = useMemo(() => {
      return getElementProps ?? (() => ({ hasError: Boolean(error), id }));
    }, [getElementProps, error, id]);

    const childrenProps = useMemo(() => {
      return localGetElementProps();
    }, [localGetElementProps]);

    return (
      <div className={wrapperClasses}>
        {label && (
          <label htmlFor={childrenProps.id} className={headerClasses}>
            {label}
          </label>
        )}
        <div className="relative w-full">
          {React.cloneElement(
            children as React.FunctionComponentElement<{ hasError: boolean }>,
            childrenProps
          )}
          {error && (
            <span className="pl-2 pr-2 block text-red text-left min-h-5 text-xs">
              {error}
            </span>
          )}
        </div>
      </div>
    );
  }
);

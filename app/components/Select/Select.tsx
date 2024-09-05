"use client";

import {
  ChangeEvent,
  RefObject,
  SelectHTMLAttributes,
  forwardRef,
  useMemo,
} from "react";
import { IOptions } from "@/types/types";
import { cn } from "@/utils/cn";

export type HTMLSelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "value" | "onChange"
>;

interface SelectProps extends HTMLSelectProps {
  className?: string;
  label?: string;
  options?: IOptions[];
  value?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  readonly?: boolean;
  ref?: RefObject<HTMLSelectElement>;
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      options,
      onChange,
      value,
      readonly,
      placeholder,
      ...rest
    },
    ref
  ) => {
    const optionsList = useMemo(
      () =>
        options?.map((opt) => (
          <option
            className="text-secondary bg-white"
            value={opt.value}
            key={opt.value}
          >
            {opt.label}
          </option>
        )),
      [options]
    );

    return (
      <div className={cn("flex flex-col", className)}>
        {label && (
          <span className="ml-4 text-gray-500 text-xs uppercase mb-2">{`${label}`}</span>
        )}
        <select
          {...rest}
          disabled={readonly}
          className="bg-[#ebebeb] outline-none text-secondary py-3 px-4 rounded-xl text-base"
          value={value}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            console.log(e.target.value);
          }}
          ref={ref}
        >
          <option disabled selected value="">
            {placeholder ?? ""}
          </option>
          {optionsList}
        </select>
      </div>
    );
  }
);

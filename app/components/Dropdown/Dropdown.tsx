"use client";

import { useEffect, useCallback, forwardRef } from "react";
import { useSelect } from "downshift";
import { IoIosArrowDown } from "react-icons/io";
import { VscClose } from "react-icons/vsc";
import { IOptions } from "@/types/types";
import { cn } from "@/utils/cn";

export type DropdownProps = {
  options?: Array<IOptions>;
  value?: IOptions | null;
  onChange?: (value: IOptions | null) => void;
  onChaggeValue?: (value: IOptions | null) => void;
  onBlur?: (value: IOptions | null) => void;
  onFocus?: (e?: any) => void;
  hasError?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  ariaLabel?: string;
  className?: string;
  labelname?: string;
  placeholder?: string;
  itemToString?: (item: IOptions | null) => string;
  id?: string;
  loading?: boolean;
  showCleanBtn?: boolean;
};

export const Dropdown = forwardRef(
  ({
    options = [],
    id,
    value,
    onBlur,
    onFocus,
    onChange,
    onChaggeValue,
    ariaLabel,
    hasError = false,
    disabled = false,
    autoFocus = false,
    labelname = "",
    placeholder = "",
    className,
    itemToString,
    loading,
    showCleanBtn = true,
  }: DropdownProps) => {
    const handleChange = useCallback(
      ({ selectedItem }: { selectedItem: IOptions | null }) => {
        if (onChange) {
          onChange(selectedItem);
        }
      },
      [onChange]
    );

    const {
      isOpen,
      getToggleButtonProps,
      getLabelProps,
      getMenuProps,
      highlightedIndex,
      getItemProps,
      selectedItem,
    } = useSelect({
      items: options,
      onSelectedItemChange: handleChange,
      selectedItem: value,
    });

    const menuClass = cn(
      "w-full relative flex flex-col items-center  bg-emerald-300 border-0 text-[14px] text-secondary font-semibold box-border cursor-pointer outline-none mt-2 rounded-xl",
      !isOpen && "hidden"
    );

    const arrowClass = cn(
      "place-self-center border-0 bg-transparent will-change-transform",
      !!isOpen && "fill-red"
    );
    const btnClass = cn(
      "h-12 justify-between w-full relative flex items-center rounded-xl bg-grey-medium border-0 text-[14px] text-secondary font-semibold box-border cursor-pointer outline-none",
      !isOpen && "border-b-secondary",
      hasError && "border-red",
      labelname && "mt-1"
    );

    const defaultItemToString = useCallback(
      (item: IOptions) => String(item.label),
      []
    );

    const convertItemToString = itemToString ?? defaultItemToString;

    useEffect(() => {
      if (isOpen && onFocus) {
        onFocus();
      }
    }, [isOpen, onFocus]);

    // const placeholderOption: Mods = {
    //   [styles.placeholderSmall]: Boolean(showCleanBtn && selectedItem),
    // };

    return (
      <div className={cn("w-full select-none", className)}>
        <label {...getLabelProps()}>
          {labelname}
          <button
            type="button"
            id={id}
            aria-label={ariaLabel}
            className={btnClass}
            disabled={disabled || options.length === 0}
            autoFocus={autoFocus}
            {...getToggleButtonProps()}
          >
            <div className="flex justify-between w-full" style={{ height: 24 }}>
              <div
                className={cn(
                  "flex items-center font-semibold min-h-5 pr-6 pl-3",
                  !Boolean(showCleanBtn && selectedItem) &&
                    "text-[#848484] font-normal"
                  //   placeholderOption
                )}
              >
                {selectedItem?.icon && (
                  <selectedItem.icon
                    width={24}
                    height={24}
                    size={16}
                    className="mr-2"
                  />
                )}
                {selectedItem ? convertItemToString(selectedItem) : placeholder}
              </div>
              <div className="absolute right-[6px] flex">
                {showCleanBtn && selectedItem && (
                  <span
                    role="button"
                    tabIndex={0}
                    className="place-self-center text-xl text-grey-dark"
                    aria-label="remove selection button"
                    onClick={(ev) => {
                      ev.preventDefault();
                      ev.stopPropagation();
                      if (onChange && !disabled) onChange(null);
                    }}
                  >
                    <VscClose fill="#b8b8b8" />
                  </span>
                )}
                <span
                  role="button"
                  className={arrowClass}
                  aria-label="toggle menu button"
                >
                  <IoIosArrowDown fontSize={22} fill="#b8b8b8" />
                </span>
              </div>
            </div>
          </button>
        </label>
        <div className="relative w-full z-10">
          {!loading ? (
            <ul className={menuClass} {...getMenuProps()}>
              {options.map((item: any, index: number) => (
                <li
                  style={{ display: "flex", alignItems: "center" }}
                  className={cn(
                    "py-2 px-4 w-full bg-white hover:bg-secondary hover:text-white",

                    highlightedIndex === index
                      ? "text-secondary font-bold"
                      : "",
                    item === selectedItem ? "bg-gray-300" : ""
                  )}
                  key={`${item}${index}`}
                  {...getItemProps({ item, index })}
                >
                  {item?.icon && <item.icon className="mr-2" />}
                  {item && convertItemToString(item)}
                </li>
              ))}
            </ul>
          ) : isOpen ? (
            <div>loader</div>
          ) : null}
        </div>
      </div>
    );
  }
);

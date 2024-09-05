"use client";

import { useCallback } from "react";
import { useController, useFormContext } from "react-hook-form";
import { useUniqueId } from "@/hooks/useUniqueId";
import {
  ControlWrapper,
  ControlWrapperProps,
} from "../ControlWrapper/ControlWrapper";

type ControlWrapperFormProp = Omit<ControlWrapperProps, "getElementProps"> & {
  name: string;
};

export const ControlWrapperForm: React.FC<ControlWrapperFormProp> = ({
  error: propsError,
  name,
  children,
  ...rest
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error: string | undefined =
    propsError ?? (errors[name]?.message as string);
  const { field } = useController({
    name,
    control,
  });

  const id = useUniqueId("control");

  const getElementProps = useCallback(
    () => ({
      hasError: Boolean(error),
      ...field,
      id,
    }),
    [field, error, id]
  );

  return (
    <ControlWrapper error={error} getElementProps={getElementProps} {...rest}>
      {children}
    </ControlWrapper>
  );
};

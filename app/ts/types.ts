import { ReactNode } from "react";

export type FormField = {
    label: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    placeholder: string;
    isPassword?: boolean;
  };
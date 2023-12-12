import { ReactNode } from "react";

// Requester
export type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE";

// Services
export type RegisterBody = {
  username: string;
  email: string;
  password: string;
};

export type LoginBody = {
  email_or_username: string;
  password: string;
};

export type LoginReturnBody = {
  email: string;
  token: string;
  user_id: number;
  username: string;
};

// Forms
export type FormField = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  placeholder: string;
  isPassword?: boolean;
};

// Contexts
export type AuthData = {
  token?: string;
  username?: string;
};

export type AuthContextType = {
  authData: AuthData | null;
  isAuth: boolean;
  userLogin: (authData: AuthData) => void;
  userLogout: () => void;
};
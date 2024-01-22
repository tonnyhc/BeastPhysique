import { ReactNode, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import {
  AuthData,
  LoginBody,
  LoginReturnBody,
  RegisterBody,
} from "../ts/types";

import * as SecureStore from "expo-secure-store";
import useApi from "../hooks/useApi";

type AuthProviderProps = {
  children: ReactNode;
};

interface AuthProps {
  token?: string | null;
  email?: string | null;
  isVerified?: boolean;
  isAuth?: boolean | null;
  onRegister?: (body: RegisterBody) => Promise<any>;
  onLogin?: (body: LoginBody) => Promise<any>;
  onLogout?: () => Promise<void>;
  onConfirmAccount?: (verificationCode: string) => Promise<void>;
  onResendVerificationCode?: () => Promise<void>;
}

export const AuthContext = createContext<AuthProps>({});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authData, setAuthData] = useState<AuthData>({
    token: null,
    isVerified: false,
    email: "",
  });
  const { post, get } = useApi(authData.token || "");
  const [verifyToken, setVerifyToken] = useState<boolean>(false);

  useEffect(() => {
    const loadAuthData = async (): Promise<void> => {
      const dataFromStorage = await SecureStore.getItemAsync("authData");
      if (dataFromStorage) {
        const data = await JSON.parse(dataFromStorage);
        if (data) {
          setAuthData({
            token: data.token,
            isVerified: data.is_verified,
            email: data.email,
          });
        }
      }
    };
    loadAuthData();
  }, []);

  useEffect(() => {
    setVerifyToken(authData.token ? true : false);
  }, [authData]);

  if (verifyToken) {
    verifyTokenFn();
    setVerifyToken(false);
  }
  async function verifyTokenFn() {
    const url = "authentication/verify-token/";
    try {
      const data = await get(url);
      return data;
    } catch (e) {
      logout();
      return;
    }
  }

  async function login(body: LoginBody): Promise<LoginReturnBody> {
    const loginURL = "authentication/login/";

    try {
      const data = await post(loginURL, body);

      setAuthData({
        token: data.token,
        isVerified: data.is_verified,
        email: data.email,
      });
      await SecureStore.setItemAsync("authData", JSON.stringify(data));
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async function register(body: RegisterBody): Promise<LoginReturnBody> {
    const registerURL = "authentication/register/";
    try {
      const data = await post(registerURL, body);
      setAuthData({
        token: data.token,
        isVerified: data.is_verified,
        email: data.email,
      });
      await SecureStore.setItemAsync("authData", JSON.stringify(data));
      return data;
    } catch (error) {
      throw error;
    }
  }
  async function logout(): Promise<void> {
    setAuthData({ token: null, isVerified: false, email: "" });
    await SecureStore.deleteItemAsync("authData");
  }
  async function confirmAccount(verificationCode: string): Promise<void> {
    const url = "authentication/verify-account/";
    try {
      await post(url, verificationCode);
      setAuthData((oldData) => ({
        ...oldData,
        isVerified: true,
      }));
    } catch (error) {
      throw error;
    }
  }
  async function resendVerificationCode(): Promise<void> {
    const url = "authentication/resend-confirmation/";
    try {
      await get(url);
    } catch (error) {
      throw error;
    }
  }

  const context = {
    token: authData.token,
    isAuth: authData.token ? true : false,
    email: authData.email,
    isVerified: authData.isVerified,
    onLogin: login,
    onRegister: register,
    onLogout: logout,
    onConfirmAccount: confirmAccount,
    onResendVerificationCode: resendVerificationCode,
  };
  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

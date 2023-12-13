import { ReactNode, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import useAsyncStorage from "../hooks/useAsyncStorage";
import {
  AuthContextType,
  AuthData,
  LoginBody,
  LoginReturnBody,
  RegisterBody,
} from "../ts/types";
import useSecureStore from "../hooks/useSecureStore";
import { post } from "../api/requester";

import * as SecureStore from "expo-secure-store";

type AuthProviderProps = {
  children: ReactNode;
};

interface AuthProps {
  authData?: AuthData;
  isAuth?: boolean | null;
  onRegister?: (body: RegisterBody) => Promise<any>;
  onLogin?: (body: LoginBody) => Promise<any>;
  onLogout?: () => void;
}

export const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authData, setAuthData] = useState<AuthData>({
    token: null,
    username: null,
  });

  useEffect(() => {
    const loadAuthData = async (): Promise<void> => {
      const dataFromStorage = await SecureStore.getItemAsync("authData");
      if (dataFromStorage) {
        const data = await JSON.parse(dataFromStorage);
        if (data) {
          setAuthData(data as AuthData);
        }
      }
    };
    loadAuthData();
  }, []);

  async function login(body: LoginBody): Promise<LoginReturnBody> {
    const loginURL = "authentication/login/";

    try {
      const data = await post(loginURL, body);
      setAuthData(data);
      const dataStorage = await SecureStore.setItemAsync(
        "authData",
        JSON.stringify(data)
      );
      console.log(dataStorage);
      return data;
    } catch (error) {
      throw error;
    }
  }
  async function register(body: RegisterBody): Promise<LoginReturnBody> {
    const registerURL = "authentication/register/";
    try {
      const data = await post(registerURL, body);
      setAuthData(data);
      await SecureStore.setItemAsync("authData", JSON.stringify(data));
      return data;
    } catch (error) {
      throw error;
    }
  }
  async function logout(): Promise<void> {
    setAuthData({});
    await SecureStore.deleteItemAsync("authData");
  }

  const context = {
    authData,
    isAuth: authData?.token ? true : false,
    onLogin: login,
    onRegister: register,
    onLogout: logout,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

import React, { useState } from "react";
import { Text, StyleSheet, View, Alert } from "react-native";
import LoginForm from "../../components/authentication/LoginForm";
import Screen from "../../components/common/Screen";
import { useTheme } from "../../contexts/ThemeContext";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { LoginBody, LoginReturnBody } from "../../ts/types";

const Login: React.FC = () => {
  const { colors } = useTheme();
  const { onLogin } = useAuth();
  const navigation = useNavigation();
  const [loginErrors, setLoginErrors] = useState<string>("");

  const styles = StyleSheet.create({
    section: {
      flex: 1,
      justifyContent: "space-around",
      fontFamily: "Acme",
    },
    welcomeText: {
      fontSize: 32,
      fontWeight: "700",
      fontFamily: "Acme",
      alignSelf: "center",
      color: colors.primaryText,
    },
  });

  const mutationLogin = async (data: LoginBody): Promise<LoginReturnBody> => {
    if (onLogin) {
      return onLogin(data);
    }
    return Promise.reject(new Error("onLogin function is not provided"));
  };

  const { data, mutate, isPending } = useMutation({
    mutationFn: mutationLogin,
    onSuccess: () => {
      !data?.is_verified ? navigation.navigate("AccountVerification") : "";
    },
    onError: (error: string) => {
      setLoginErrors(error);
    },
  });
  return (
    <Screen>
      <View style={styles.section}>
        <Text style={styles.welcomeText}>Welcome back 👋</Text>
        <LoginForm
          loginError={loginErrors}
          onLogin={mutate}
          isPending={isPending}
        />
      </View>
    </Screen>
  );
};

export default Login;

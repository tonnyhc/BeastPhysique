import React, { useState } from "react";
import { Text, StyleSheet, View, Alert } from "react-native";
import LoginForm from "../../components/authentication/LoginForm";
import Screen from "../../components/common/Screen";
import { useTheme } from "../../contexts/ThemeContext";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../contexts/AuthContext";
import { LoginBody, LoginReturnBody } from "../../ts/types";
import UpperLogoWrapper from "../../components/common/UpperLogoWrapper";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../../Stacks/AuthStack";

export interface LoginScreenProps {
  // navigation: StackNavigationProp<{
  //   AccountVerification: undefined,
  //   ForgotPassword: undefined,

  // }>
  navigation: StackNavigationProp<AuthStackParamList>;
}

const Login: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const { onLogin } = useAuth();
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
      <UpperLogoWrapper />
      <View style={styles.section}>
        <Text style={styles.welcomeText}>Welcome back 👋</Text>
        <LoginForm
          navigation={navigation}
          loginError={loginErrors}
          onLogin={mutate}
          isPending={isPending}
        />
      </View>
    </Screen>
  );
};

export default Login;

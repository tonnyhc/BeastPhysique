import React, { useState } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  Text,
} from "react-native";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../contexts/AuthContext";
import { LoginBody, LoginReturnBody } from "../../ts/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../../Stacks/AuthStack";
import AuthStackHeader from "../../components/authentication/AuthStackHeader";
import Screen from "../../components/common/Screen";
import { useTheme } from "../../contexts/ThemeContext";
import LoginForm from "../../components/authentication/LoginForm";

export interface LoginScreenProps {
  navigation: StackNavigationProp<AuthStackParamList>;
}

const Login: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { onLogin } = useAuth();
  const { colors } = useTheme();
  const [loginErrors, setLoginErrors] = useState<string>("");

  const styles = StyleSheet.create({
    section: {
      flex: 1,
      fontFamily: "RobotoRegular",
    },
    welcomeTextTitle: {
      fontSize: 20,
      fontFamily: "IntegralRegular",
      color: colors.primaryText
    },
    welcomeTextSubtitle: {
      fontSize: 16,
      fontFamily: "RobotoRegular",
      color: colors.primaryText
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#1C1C1E" }}
    >
      <AuthStackHeader decreaseOnKeyboard={true} decreasedHeight={140} />
      <Screen closeKeyboardOnClick={true}>
        <View style={styles.section}>
          <View style={{ gap: 10 }}>
            <Text style={styles.welcomeTextTitle}>Welcome back</Text>
            <Text style={styles.welcomeTextSubtitle}>
              Log in to improve yourself
            </Text>
          </View>
          <LoginForm
            navigation={navigation}
            loginError={loginErrors}
            onLogin={mutate}
            isPending={isPending}
          />
        </View>
      </Screen>
    </KeyboardAvoidingView>
  );
};

export default Login;

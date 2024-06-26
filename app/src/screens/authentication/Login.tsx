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
import { useTranslation } from "react-i18next";

export interface LoginScreenProps {
  navigation: StackNavigationProp<AuthStackParamList>;
}

const Login: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const { onLogin } = useAuth();
  const { colors } = useTheme();
  const [loginErrors, setLoginErrors] = useState<string>("");

  const styles = StyleSheet.create({
    section: {
      flex: 1,
      fontFamily: "RobotoRegular",
    },
    welcomeTextTitle: {
      fontSize: 18,
      fontFamily: "IntegralRegular",
      color: colors.primaryText,
    },
    welcomeTextSubtitle: {
      fontSize: 14,
      fontFamily: "RobotoRegular",
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#1C1C1E" }}
    >
      <AuthStackHeader />
      <Screen closeKeyboardOnClick={true}>
        <View style={styles.section}>
          <View style={{ gap: 10 }}>
            <Text style={styles.welcomeTextTitle}>
              {t("screens.login.headerText")}
            </Text>
            <Text style={styles.welcomeTextSubtitle}>
              {t("screens.login.subHeaderText")}
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

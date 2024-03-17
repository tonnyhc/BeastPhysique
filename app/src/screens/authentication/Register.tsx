import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { RegisterBody } from "../../ts/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../../Stacks/AuthStack";
import AuthStackHeader from "../../components/authentication/AuthStackHeader";
import Screen from "../../components/common/Screen";
import useKeyboard from "../../hooks/useKeyboard";
import { useTheme } from "../../contexts/ThemeContext";
import RegisterForm from "../../components/authentication/RegisterForm";

interface RegisterProps {
  navigation: StackNavigationProp<AuthStackParamList>;
}

const Register: React.FC<RegisterProps> = ({ navigation }) => {
  const keyboardVisible = useKeyboard();
  const { colors } = useTheme();
  const { onRegister } = useAuth();
  const [errors, setErrors] = useState({ email: "", username: "" });

  const mutationRegister = async (data: RegisterBody): Promise<any> => {
    if (onRegister) {
      return await onRegister(data);
    } else {
      return Promise.reject();
    }
  };
  const { mutate, isPending, error } = useMutation({
    mutationFn: mutationRegister,
    onSuccess: () => {
      navigation.navigate("AccountVerification");
    },
  });
  useEffect(() => {
    setErrors((oldErrors) => ({
      ...oldErrors,
      ...error
    }))
  }, [error]);

  const styles = StyleSheet.create({
    section: {
      flex: 1,
      justifyContent: "space-around",
      fontFamily: "RobotoRegular",
    },
    title: {
      fontSize: 20,
      color: colors.primaryText,
      fontFamily: "RobotoMedium",
    },
    subtitle: {
      fontSize: 14,
      color: colors.primaryText,
      fontFamily: "RobotoRegular",
    },
  });
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#1C1C1E" }}
    >
      <>
        <AuthStackHeader decreaseOnKeyboard={true} decreasedHeight={60} />
        <Screen closeKeyboardOnClick={true}>
          <Text>{error?.message}</Text>
          {!keyboardVisible ? (
            <View style={{ gap: 8 }}>
              <Text style={styles.title}>
                Hey! Ready to take your fitness to the next level?
              </Text>
              <Text style={styles.subtitle}>
                Create a BeastPhysique account to get started.
              </Text>
            </View>
          ) : null}

          <View style={styles.section}>
            <View style={{ flex: 1, marginTop: keyboardVisible ? 0 : 20 }}>
              <RegisterForm
                navigation={navigation}
                mutate={mutate}
                isPending={isPending}
                errors={errors}
              />
            </View>
          </View>
        </Screen>
      </>
    </KeyboardAvoidingView>
  );
};
export default Register;

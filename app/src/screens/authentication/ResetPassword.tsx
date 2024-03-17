import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import Screen from "../../components/common/Screen";
import BackButton from "../../components/common/BackButton";
import { useTheme } from "../../contexts/ThemeContext";
import ReusableInput from "../../components/common/ReusableInput";
import { AntDesign, Feather } from "@expo/vector-icons";
import SubmitButton from "../../components/common/Button";
import { useForgottenPassword } from "../../contexts/ForgottenPasswordContext";
import { useMutation } from "@tanstack/react-query";
import {
  samePasswordValidator,
  strenghtPasswordValidator,
} from "../../utils/formValidators";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../../Stacks/AuthStack";
import TestInput from "../../components/common/TestInput";
import EyeOnIcon from "../../icons/EyeOnIcon";
import LockIcon from "../../icons/LockIcon";

interface ResetPasswordProps {
  navigation: StackNavigationProp<AuthStackParamList>;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ navigation }) => {
  const { colors, theme } = useTheme();
  const [error, setError] = useState<string>("");
  const [formErrors, setFormErrors] = useState<{
    password: string;
    rePass: string;
  }>({
    password: "",
    rePass: "",
  });
  const { password, setPassword, rePass, setRePass, resetPassword } =
    useForgottenPassword();
  const [disabledBtn, setDisabledBtn] = useState<boolean>(true);
  const { mutate, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => navigation.navigate("SuccessPasswordReset"),
    onError: (error: string) => setError(error),
  });

  useEffect(() => {
    const isStrong = strenghtPasswordValidator(password);
    if (!isStrong && password !== "") {
      return setFormErrors((oldErrors) => ({
        ...oldErrors,
        password: "Weak password",
      }));
    }
    return setFormErrors((oldErrors) => ({
      ...oldErrors,
      password: "",
    }));
  }, [password]);
  useEffect(() => {
    const arePasswordsDifferent = samePasswordValidator(password, rePass);
    if (arePasswordsDifferent) {
      return setFormErrors((oldErrors) => ({
        ...oldErrors,
        rePass: "Passwords are not the same",
      }));
    }
    return setFormErrors((oldErrors) => ({
      ...oldErrors,
      rePass: "",
    }));
  }, [rePass]);
  useEffect(() => {
    const areErrors = Object.values(formErrors).some((value) => value !== "");
    if (password == "" || rePass == "" || areErrors) {
      return setDisabledBtn(true);
    }
    return setDisabledBtn(false);
  }, [password, rePass, formErrors]);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "transparent" }}
    >
      <Screen>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
          <BackButton onPress={() => navigation.goBack()} />
          <Text
            style={{
              color: colors.primaryText,
              fontSize: 20,
              lineHeight: 36,
              fontFamily: "IntegralRegular",
            }}
          >
            Reset Password
          </Text>
        </View>
        <View>
          <Text
            style={{
              marginTop: 18,
              fontSize: 16,
              color: colors.primaryText,
              fontFamily: "RobotoRegular",
            }}
          >
            At least 8 characters, with uppercase letter, lowercase letter,
            number and a special symbol
          </Text>
          <Text
            style={{
              color: colors.error,
              textAlign: "center",
              fontFamily: "RobotoMedium",
              paddingTop: 50,
            }}
          >
            {error}
          </Text>
        </View>
        <Text>{error}</Text>
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View style={{ gap: 20 }}>
            <TestInput
              value={password}
              onChange={setPassword}
              placeholder="Password"
              label="New Password"
              isPassword={true}
              leftIcon={<LockIcon size={24} color={colors.helperText} />}
              error={formErrors.password}
            />
            <TestInput
              value={rePass}
              onChange={setRePass}
              placeholder="Confirm password"
              label="Confirm Password"
              isPassword={true}
              error={formErrors.rePass}
              leftIcon={<LockIcon size={24} color={colors.helperText} />}
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <SubmitButton
              text="Continue"
              loading={isPending}
              onPress={() => mutate()}
              disabled={disabledBtn}
            />
          </View>
        </View>
      </Screen>
    </KeyboardAvoidingView>
  );
};

export default ResetPassword;

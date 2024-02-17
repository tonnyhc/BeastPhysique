import { View, Text } from "react-native";
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
    onSuccess: () => navigation.navigate("Login"),
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
    <Screen>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text
          style={{
            color: colors.primaryText,
            fontSize: 24,
            fontWeight: "700",
            lineHeight: 36,
            fontFamily: "Acme",
          }}
        >
          Reset Password
        </Text>
        <Text style={{ position: "absolute", right: 0 }}>LOGO HERE</Text>
      </View>
      <View>
        <Text
          style={{
            marginTop: 45,
            width: 300,
            fontSize: 16,
            color: colors.helperText,
            fontFamily: "Acme",
          }}
        >
          At least 8 characters, with uppercase letter, lowercase letter, number
          and a special symbol
        </Text>
        <Text
          style={{
            color: colors.error,
            fontWeight: "600",
            textAlign: "center",
            paddingTop: 50,
          }}
        >
          {error}
        </Text>
      </View>
      <Text>{error}</Text>
      <View style={{ gap: 20 }}>
        <ReusableInput
          value={password}
          onChange={setPassword}
          placeholder="Password"
          label="New Password"
          isPassword={true}
          leftIcon={
            <AntDesign
              name="lock"
              size={18}
              color={theme == "dark" ? "#DEE1E6FF" : "black"}
            />
          }
          rightIcon={
            <Feather
              name="eye-off"
              size={18}
              color={theme == "dark" ? "#DEE1E6FF" : "black"}
            />
          }
          error={formErrors.password}
        />
        <ReusableInput
          value={rePass}
          onChange={setRePass}
          placeholder="Confirm password"
          label="Confirm Password"
          isPassword={true}
          error={formErrors.rePass}
          leftIcon={
            <AntDesign
              name="lock"
              size={18}
              color={theme == "dark" ? "#DEE1E6FF" : "black"}
            />
          }
          rightIcon={
            <Feather
              name="eye-off"
              size={18}
              color={theme == "dark" ? "#DEE1E6FF" : "black"}
            />
          }
        />
      </View>
      <View style={{ marginTop: 55 }}>
        <SubmitButton
          text="Continue"
          loading={isPending}
          onPress={() => mutate()}
          disabled={disabledBtn}
        />
      </View>
    </Screen>
  );
};

export default ResetPassword;

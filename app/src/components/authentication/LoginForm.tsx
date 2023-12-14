import { AntDesign, Feather, FontAwesome5 } from "@expo/vector-icons";

import { FormField, LoginBody } from "../../ts/types";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import ReusableInput from "../common/ReusableInput";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import SubmitButton from "../common/SubmitButton";
import ActionButtons from "./ActionButtonsContainer";

type LoginError = {
  non_field_errors: string[];
  password?: string;
};

const LoginForm: React.FC = () => {
  const navigation = useNavigation();
  const [data, setData] = useState<LoginBody>({
    email_or_username: "",
    password: "",
  });
  const [loginErrors, setLoginErrors] = useState<null | string>(null);
  const mutationLogin = (): Promise<void> => {
    if (onLogin) {
      return onLogin(data);
    }
    return Promise.reject(new Error("onLogin function is not provided"));
  };
  const [disabledSubmit, setDisabledSubmit] = useState<boolean>(false);
  const { onLogin } = useAuth();
  const { mutate, isPending } = useMutation({
    mutationFn: mutationLogin,
    onError: (error: LoginError) => setLoginErrors(error.non_field_errors[0]),
  });

  useEffect(() => {
    if (data.email_or_username == "" || data.password == "") {
      return setDisabledSubmit(true);
    }
    setDisabledSubmit(false);
  }, [data]);

  const formFields: FormField[] = [
    {
      label: "Email or username",
      leftIcon: (
        <AntDesign
          name="mail"
          size={18}
          // color={colorScheme == "dark" ? "#DEE1E6FF" : "black"}
        />
      ),
      placeholder: "Enter email or username",
      value: data.email_or_username,
      onChange: (value) =>
        setData((oldData) => ({ ...oldData, email_or_username: value })),
    },
    {
      label: "Password",
      leftIcon: (
        <AntDesign
          name="lock"
          size={18}
          // color={colorScheme == "dark" ? "#DEE1E6FF" : "black"}
        />
      ),
      rightIcon: (
        <Feather
          name="eye-off"
          size={18}
          // color={colorScheme == "dark" ? "#DEE1E6FF" : "black"}
        />
      ),
      placeholder: "Enter password",
      isPassword: true,
      value: data.password,
      onChange: (value) =>
        setData((oldData) => ({ ...oldData, password: value })),
    },
  ];
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    inputWrapper: {
      marginBottom: 12,
    },
    forgotPass: {
      color: colors.blueText,
      fontWeight: "700",
      alignSelf: "flex-end",
      margin: 12,
      fontSize: 12,
    },
  });

  return (
    <View>
      <Text
        style={{
          alignSelf: "center",
          lineHeight: 50,
          fontWeight: "600",
          color: "red",
        }}
      >
        {loginErrors}
      </Text>
      {formFields.map((field) => (
        <View style={styles.inputWrapper} key={field.label}>
          <ReusableInput
            value={field.value}
            onChange={field.onChange}
            placeholder={field.placeholder}
            label={field.label}
            leftIcon={field.leftIcon}
            rightIcon={field.rightIcon}
            isPassword={field.isPassword}
          />
        </View>
      ))}

      <Text style={styles.forgotPass}>Forgot password?</Text>
      <ActionButtons
        onPrimaryAction={mutate}
        onSecondaryAction={() => navigation.navigate("Register")}
        primaryActionText="Sign In"
        secondaryActionText="SIGN UP"
        disabled={disabledSubmit}
        isLoading={isPending}
      />
    </View>
  );
};

export default LoginForm;

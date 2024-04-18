import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { FormField, RegisterBody, RegisterFormBody } from "../../ts/types";
import { useTheme } from "../../contexts/ThemeContext";
import {
  emailValidator,
  samePasswordValidator,
  strenghtPasswordValidator,
} from "../../utils/formValidators";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../../Stacks/AuthStack";
import Button from "../common/Button";
import TestInput from "../common/TestInput";
import EyeOnIcon from "../../icons/EyeOnIcon";
import EmailIcon from "../../icons/EmailIcon";
import useKeyboard from "../../hooks/useKeyboard";

interface RegisterFormProps {
  mutate: (data: RegisterBody) => Promise<any>;
  isPending: boolean;
  navigation: StackNavigationProp<AuthStackParamList>;
  errors: any;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  mutate,
  isPending,
  navigation,
  errors,
}) => {
  const keyboard = useKeyboard();
  const { theme, colors } = useTheme();
  const [data, setData] = useState<RegisterFormBody>({
    email: "",
    username: "",
    password: "",
    conf_pass: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({
    username: "",
    email: "",
    password: "",
    conf_pass: "",
  });

  const [disabledSubmit, setDisabledSubmit] = useState(false);
  // button disabled checker
  useEffect(() => {
    const areFieldsFilled = Object.values(data).every((value) => value !== "");
    const areErrors = Object.values(formErrors).some((value) => value !== "");

    if (!areFieldsFilled || areErrors) {
      return setDisabledSubmit(true);
    }
    return setDisabledSubmit(false);
  }, [data, formErrors]);
  useEffect(() => {
    const isValid = strenghtPasswordValidator(data.password);
    if (!isValid && data.password !== "") {
      return setFormErrors((oldErrors) => ({
        ...oldErrors,
        password: "Weak password",
      }));
    }
    return setFormErrors((oldErrors) => ({
      ...oldErrors,
      password: "",
    }));
  }, [data.password]);
  useEffect(() => {
    const error = samePasswordValidator(data.password, data.conf_pass);
    if (data.password === "" && data.conf_pass === "") {
      return;
    }
    if (error) {
      return setFormErrors((oldErrors) => ({
        ...oldErrors,
        conf_pass: "The passwords are not the same",
      }));
    }
    return setFormErrors((oldErrors) => ({
      ...oldErrors,
      conf_pass: "",
      password: "",
    }));
  }, [data.conf_pass]);
  useEffect(() => {
    const isValid = emailValidator(data.email);
    if (!isValid && data.email !== "") {
      return setFormErrors((oldErrors) => ({
        ...oldErrors,
        email: "Invalid email!",
      }));
    }
    return setFormErrors((oldErrors) => ({
      ...oldErrors,
      email: "",
    }));
  }, [data.email]);

  const formFields: FormField[] = [
    {
      label: "Username",
      leftIcon: <AntDesign name="user" size={18} color={colors.helperText} />,
      placeholder: "example",
      value: data.username,
      error: formErrors.username || errors.username,
      onChange: (value) =>
        setData((oldData) => ({ ...oldData, username: value })),
    },
    {
      label: "Email",
      leftIcon: <EmailIcon size={24} color={colors.helperText} />,
      placeholder: "example@example.com",
      value: data.email,
      onChange: (value) => setData((oldData) => ({ ...oldData, email: value })),
      error: formErrors.email || errors.email,
      inputMode: "email",
    },
    {
      label: "Password",
      leftIcon: <AntDesign name="lock" size={18} color={colors.helperText} />,
      rightIcon: <EyeOnIcon size={24} color={colors.helperText} />,
      placeholder: "Enter password",
      isPassword: true,
      value: data.password,
      onChange: (value) =>
        setData((oldData) => ({ ...oldData, password: value })),
      error: formErrors.password || errors.password,
      helperTextLeft:
        "Minimum 9 characters, at least 1 uppercase and 1 special symbol",
    },
    {
      label: "Confirm password",
      leftIcon: <AntDesign name="lock" size={18} color={colors.helperText} />,
      rightIcon: <Feather name="eye-off" size={18} color={colors.helperText} />,
      placeholder: "Confirm password",
      isPassword: true,
      value: data.conf_pass,
      onChange: (value) =>
        setData((oldData) => ({ ...oldData, conf_pass: value })),
      error: formErrors.conf_pass,
    },
  ];
  const styles = StyleSheet.create({
    form: {
      justifyContent: "space-between",
    },

    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    helperText: {
      fontSize: 15,
      fontFamily: "RobotoRegular",
    },
  });

  return (
    <View style={styles.form}>
      <View style={{ gap: keyboard ? 12 : 64 }}>
        <View style={{ gap: 14 }}>
          {formFields.map((field) => (
            <View key={field.label}>
              <TestInput
                value={field.value}
                onChange={field.onChange}
                placeholder={field.placeholder}
                leftIcon={field.leftIcon}
                rightIcon={field.rightIcon}
                isPassword={field.isPassword}
                label={field.label}
                error={field.error}
                inputMode={field.inputMode ? field.inputMode : "text"}
                onEndEditing={field.onEndEditing}
                helperTextLeft={field.helperTextLeft}
              />
            </View>
          ))}
        </View>

        <View style={{ gap: keyboard ? 6 : 20 }}>
          <Button
            text="Create Account"
            onPress={() => mutate(data)}
            disabled={disabledSubmit}
            loading={isPending}
          />
          <Button
            type="text"
            text="Sign in with an existing account"
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      </View>
    </View>
  );
};
export default RegisterForm;

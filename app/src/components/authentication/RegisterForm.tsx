import { useEffect, useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import ReusableInput from "../common/ReusableInput";
import { FormField, RegisterBody, RegisterFormBody } from "../../ts/types";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../contexts/ThemeContext";
import {
  emailValidator,
  samePasswordValidator,
  strenghtPasswordValidator,
} from "../../utils/formValidators";
import ActionButtons from "./ActionButtonsContainer";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../../Stacks/AuthStack";


interface RegisterFormProps {
  mutate: (data: RegisterBody) => Promise<any>;
  isPending: boolean;
  navigation: StackNavigationProp<AuthStackParamList>
}

const RegisterForm: React.FC<RegisterFormProps> = ({mutate, isPending, navigation}) => {
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
    if (!isValid  && data.password !== '') {
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
    if (!isValid && data.email !== '') {
      return setFormErrors((oldErrors) => ({
        ...oldErrors,
        email: "Invalid email!",
      }));
    }
    return setFormErrors((oldErrors) => ({
      ...oldErrors,
      email: "",
    }));
  },[data.email])

  const formFields: FormField[] = [
    {
      label: "Username",
      leftIcon: (
        <AntDesign
          name="user"
          size={18}
          color={theme == "dark" ? "#DEE1E6FF" : "black"}
        />
      ),
      placeholder: "Enter username",
      value: data.username,
      onChange: (value) =>
        setData((oldData) => ({ ...oldData, username: value })),
    },
    {
      label: "Email",
      leftIcon: (
        <AntDesign
          name="mail"
          size={18}
          color={theme == "dark" ? "#DEE1E6FF" : "black"}
        />
      ),
      placeholder: "Enter email",
      value: data.email,
      onChange: (value) => setData((oldData) => ({ ...oldData, email: value })),
      error: formErrors.email,
    },
    {
      label: "Password",
      leftIcon: (
        <AntDesign
          name="lock"
          size={18}
          color={theme == "dark" ? "#DEE1E6FF" : "black"}
        />
      ),
      rightIcon: (
        <Feather
          name="eye-off"
          size={18}
          color={theme == "dark" ? "#DEE1E6FF" : "black"}
        />
      ),
      placeholder: "Enter password",
      isPassword: true,
      value: data.password,
      onChange: (value) =>
        setData((oldData) => ({ ...oldData, password: value })),
      error: formErrors.password,
    },
    {
      label: "Confirm password",
      leftIcon: (
        <AntDesign
          name="lock"
          size={18}
          color={theme == "dark" ? "#DEE1E6FF" : "black"}
        />
      ),
      rightIcon: (
        <Feather
          name="eye-off"
          size={18}
          color={theme == "dark" ? "#DEE1E6FF" : "black"}
        />
      ),
      placeholder: "Confirm password",
      isPassword: true,
      value: data.conf_pass,
      onChange: (value) =>
        setData((oldData) => ({ ...oldData, conf_pass: value })),
      error: formErrors.conf_pass,
    },
  ];
  const styles = StyleSheet.create({
    formWrapper: {
      marginTop: 24,
    },
    formFieldWrapper: {
      marginBottom: 12,
    },
    termsConditions: {
      flexDirection: "row",
      gap: 8,
      alignItems: "center",
      marginTop: 12,
      marginBottom: 28,
    },
    termsConditionsText: {
      flex: 1,
    },
  });

  return (
    <View style={styles.formWrapper}>
      {formFields.map((field) => (
        <View style={styles.formFieldWrapper} key={field.label}>
          <ReusableInput
            value={field.value}
            onChange={field.onChange}
            placeholder={field.placeholder}
            label={field.label}
            leftIcon={field.leftIcon}
            rightIcon={field.rightIcon}
            isPassword={field.isPassword}
            error={field.error}
            onEndEditing={field.onEndEditing}
          />
        </View>
      ))}
      {/* Terms and conditions */}
      <View style={styles.termsConditions}>
        <Switch value={true} />
        <Text style={styles.termsConditionsText}>
          I agree with{" "}
          <Text style={{ color: colors.blueText, fontWeight: "700" }}>
            Terms & Conditions
          </Text>
        </Text>
      </View>

      <ActionButtons
        onPrimaryAction={() => mutate(data)}
        onSecondaryAction={() => navigation.navigate("Login")}
        primaryActionText="Sign Up"
        secondaryActionText="SIGN IN"
        disabled={disabledSubmit}
        isLoading={isPending}
      />
    </View>
  );
};
export default RegisterForm;

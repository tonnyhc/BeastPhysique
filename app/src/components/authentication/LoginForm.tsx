import { AntDesign, Feather } from "@expo/vector-icons";

import { FormField, LoginBody, LoginError } from "../../ts/types";
import { View, Text, StyleSheet } from "react-native";
import ReusableInput from "../common/ReusableInput";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";

import { useTheme } from "../../contexts/ThemeContext";
import ActionButtons from "./ActionButtonsContainer";



interface LoginFormProps {
  onLogin: (data?: LoginBody) => Promise<any>;
  isPending: boolean;
  loginError: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onLogin,
  isPending,
  loginError,
}) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [data, setData] = useState<LoginBody>({
    email: "",
    password: "",
  });
  const [disabledSubmit, setDisabledSubmit] = useState<boolean>(false);
  useEffect(() => {
    if (data.email == "" || data.password == "") {
      return setDisabledSubmit(true);
    }
    setDisabledSubmit(false);
  }, [data]);

  const formFields: FormField[] = [
    {
      label: "Email",
      leftIcon: (
        <AntDesign
          name="mail"
          size={18}
          // color={colorScheme == "dark" ? "#DEE1E6FF" : "black"}
        />
      ),
      placeholder: "Enter email",
      value: data.email,
      onChange: (value) => setData((oldData) => ({ ...oldData, email: value })),
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
        {loginError}
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
        onPrimaryAction={() => onLogin(data)}
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

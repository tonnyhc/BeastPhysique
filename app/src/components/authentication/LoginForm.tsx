import { LoginBody } from "../../ts/types";
import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";

import { useTheme } from "../../contexts/ThemeContext";

import { AuthStackParamList } from "../../Stacks/AuthStack";
import { StackNavigationProp } from "@react-navigation/stack";
import TestInput from "../common/TestInput";
import EmailIcon from "../../icons/EmailIcon";
import EyeOnIcon from "../../icons/EyeOnIcon";
import LockIcon from "../../icons/LockIcon";
import useKeyboard from "../../hooks/useKeyboard";
import Button from "../common/Button";

interface LoginFormProps {
  onLogin: (data?: LoginBody) => Promise<any>;
  isPending: boolean;
  loginError: string;
  navigation: StackNavigationProp<AuthStackParamList>;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onLogin,
  isPending,
  loginError,
  navigation,
}) => {
  const { colors, theme } = useTheme();
  const keyboard = useKeyboard();
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

  const styles = StyleSheet.create({
    form: {
      flex: 1,
      justifyContent: "space-between",
    },
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
    <View style={{ flex: 1 }}>
      <View style={styles.form}>
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
        <View style={{ gap: 20 }}>
          <TestInput
            inputMode="email"
            label="Email"
            onChange={(value) =>
              setData((oldData) => ({ ...oldData, email: value }))
            }
            leftIcon={<EmailIcon size={24} color={colors.helperText} />}
            placeholder="john@doe.com"
            value={data.email}
          />
          <View>
            <TestInput
              inputMode="text"
              value={data.password}
              onChange={(value) =>
                setData((oldData) => ({ ...oldData, password: value }))
              }
              placeholder="Enter password"
              label="Password"
              isPassword={true}
              leftIcon={<LockIcon size={24} color={colors.helperText} />}
              rightIcon={<EyeOnIcon size={24} color={colors.helperText} />}
              helperTextRight="Forgot password?"
              onPressHelperRight={() => navigation.navigate("ForgotPassword")}
            />
          </View>
        </View>
        <View style={{marginBottom: 20}}>
          <Button
            disabled={disabledSubmit}
            type="primary"
            text="Login"
            onPress={() => onLogin(data)}
            loading={isPending}
          />
          <Button
            type="text"
            text="Dont have an account?"
            onPress={() => navigation.navigate("Register")}
          />
        </View>
      </View>
    </View>
  );
};

export default LoginForm;

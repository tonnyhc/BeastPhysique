import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import Screen from "../../components/common/Screen";
import BackButton from "../../components/common/BackButton";
import { useTheme } from "../../contexts/ThemeContext";
import { useMutation } from "@tanstack/react-query";
import { useForgottenPassword } from "../../contexts/ForgottenPasswordContext";
import { emailValidator } from "../../utils/formValidators";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../../Stacks/AuthStack";
import TestInput from "../../components/common/TestInput";
import EmailIcon from "../../icons/EmailIcon";
import Button from "../../components/common/Button";

interface ForgotPasswordProps {
  navigation: StackNavigationProp<AuthStackParamList>;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ navigation }) => {
  const { email, setEmail, sentEmail } = useForgottenPassword();
  const { colors } = useTheme();
  const [error, setError] = useState<string>("");
  const [disabledBtn, setDisabledBtn] = useState<boolean>(true);

  useEffect(() => {
    const isEmailValid = emailValidator(email);
    setDisabledBtn(!isEmailValid);
  }, [email]);

  const { mutate, isPending } = useMutation({
    mutationFn: sentEmail,
    onSuccess: () => {
      setError("");
      navigation.navigate("ForgottenPasswordVerification");
    },
    onError: (error: string) => setError(error),
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "transparent" }}
    >
      <Screen closeKeyboardOnClick={true}>
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
            Forgot password
          </Text>
        </View>
        <Text
          style={{
            marginTop: 18,
            width: 250,
            fontSize: 16,
            color: colors.primaryText,
            fontFamily: "RobotoRegular",
          }}
        >
          Please enter the email associated with your account
        </Text>
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View style={{ marginTop: 47 }}>
            <TestInput
              value={email}
              inputMode="email"
              placeholder="beast@physique.com"
              onChange={(value: string) => setEmail(value)}
              label="Email"
              error={error}
              leftIcon={<EmailIcon size={24} color={colors.helperText} />}
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <Button
              disabled={disabledBtn}
              loading={isPending}
              text="Send"
              onPress={() => mutate()}
            />
          </View>
        </View>
      </Screen>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;

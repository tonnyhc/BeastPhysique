import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Screen from "../../components/common/Screen";
import BackButton from "../../components/common/BackButton";
import { useTheme } from "../../contexts/ThemeContext";
import ReusableInput from "../../components/common/ReusableInput";
import { AntDesign } from "@expo/vector-icons";
import SubmitButton from "../../components/common/Button";
import { useMutation } from "@tanstack/react-query";
import { useForgottenPassword } from "../../contexts/ForgottenPasswordContext";
import { emailValidator } from "../../utils/formValidators";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../../Stacks/AuthStack";

interface ForgotPasswordProps {
  navigation: StackNavigationProp<AuthStackParamList>
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  navigation
}) => {
  const { email, setEmail, sentEmail } = useForgottenPassword();
  const { theme, colors } = useTheme();
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
          Forgot password
        </Text>
        <Text style={{position: "absolute", right: 0}}>LOGO HERE</Text>
      </View>
      <Text
        style={{
          marginTop: 45,
          width: 250,
          fontSize: 16,
          color: colors.primaryText,
          fontFamily: "Acme",
        }}
      >
        Please enter the email associated with your account
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
      <View style={{ marginBottom: 65 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
            fontFamily: "Acme",
            lineHeight: 30,
            marginTop: 40,
          }}
        >
          Enter your email
        </Text>
        <ReusableInput
          value={email}
          placeholder="Enter email"
          onChange={(value: string) => setEmail(value)}
          leftIcon={
            <AntDesign
              name="mail"
              size={18}
              color={theme == "dark" ? "#DEE1E6FF" : "black"}
            />
          }
        />
      </View>
      <SubmitButton disabled={disabledBtn} loading={isPending} text="Send" onPress={() => mutate()} />
    </Screen>
  );
};

export default ForgotPassword;

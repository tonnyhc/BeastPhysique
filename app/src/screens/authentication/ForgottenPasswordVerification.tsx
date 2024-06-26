import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Screen from "../../components/common/Screen";
import BackButton from "../../components/common/BackButton";
import { useTheme } from "../../contexts/ThemeContext";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { useForgottenPassword } from "../../contexts/ForgottenPasswordContext";
import { useMutation } from "@tanstack/react-query";
import { ActivityIndicator } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../../Stacks/AuthStack";
import { useTranslation } from "react-i18next";

interface ForgottenPasswordVerificationProps {
  navigation: StackNavigationProp<AuthStackParamList>;
}

const ForgottenPasswordVerification: React.FC<
  ForgottenPasswordVerificationProps
> = ({ navigation }) => {
  const { colors } = useTheme();
  const {
    email,
    verificationCode,
    setVerificationCode,
    verifyCode,
    sentEmail,
  } = useForgottenPassword();
  const { t } = useTranslation();
  const [error, setError] = useState<string>("");
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(60);

  const { mutate: resendCode, isPending: isPendingResendCode } = useMutation({
    mutationFn: sentEmail,
    mutationKey: ["sentMail"],
  });

  const { mutate, isPending } = useMutation({
    mutationFn: verifyCode,
    onSuccess: () => navigation.navigate("ResetPassword"),
    onError: (error: string) => setError(error),
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);
    }

    if (timer === 0) {
      setIsTimerRunning(false);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isTimerRunning, timer]);

  const handleResentCode = () => {
    setTimer(60);
    setIsTimerRunning(true);
    resendCode();
  };

  return (
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
          {t("screens.forgotPass.verification")}
        </Text>
      </View>
      <View>
        <Text
          style={{
            marginTop: 18,
            width: 250,
            fontSize: 16,
            color: colors.primaryText,
            fontFamily: "RobotoRegular",
          }}
        >
          {t("screens.forgotPass.helperTextVerification")}
        </Text>
        <Text
          style={{
            color: colors.helperText,
            marginTop: 10,
          }}
        >
          {email}
        </Text>
      </View>
      <Text
        style={{
          alignSelf: "center",
          marginTop: 15,
          color: colors.error,
          fontSize: 16,
          fontFamily: "RobotoMedium",
        }}
      >
        {error}
      </Text>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <OTPInputView
          pinCount={5}
          code={verificationCode}
          onCodeChanged={(code) => {
            setVerificationCode(code);
          }}
          codeInputHighlightStyle={{
            borderBottomWidth: 1,
            borderBottomColor: colors.button,
          }}
          codeInputFieldStyle={{
            borderWidth: 0,
            color: colors.primaryText,
            borderBottomWidth: 1,
          }}
          onCodeFilled={() => mutate()}
          style={{
            width: "100%",
            height: 200,
            justifyContent: "center",
          }}
        />
      </View>

      {isPending ? (
        <ActivityIndicator />
      ) : (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 18, color: colors.helperText }}>
            {isTimerRunning
              ? `${t("screens.forgotPass.youCanSendAnotherCode")} ${timer}s`
              : t("screens.forgotPass.didNotGetCode")}
            {/* {isTimerRunning
              ? `You can send another code in ${timer}s`
              : } */}
          </Text>
          {!isTimerRunning && (
            <TouchableOpacity onPress={() => handleResentCode()}>
              <Text
                style={{
                  color: colors.button,
                  fontSize: 16,
                  fontFamily: "RobotoMedium",
                }}
              >
                {t('screens.forgotPass.resendCode')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </Screen>
  );
};

export default ForgottenPasswordVerification;

import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Screen from "../../components/common/Screen";
import BackButton from "../../components/common/BackButton";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../contexts/ThemeContext";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { useForgottenPassword } from "../../contexts/ForgottenPasswordContext";
import { useMutation } from "@tanstack/react-query";
import { ActivityIndicator } from "react-native-paper";

const ForgottenPasswordVerification: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const {
    email,
    verificationCode,
    setVerificationCode,
    verifyCode,
    sentEmail,
  } = useForgottenPassword();
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
          Verification
        </Text>
        <Text style={{ position: "absolute", right: 0 }}>LOGO HERE</Text>
      </View>
      <View style={{ marginTop: 100 }}>
        <Text
          style={{
            fontSize: 18,
            color: colors.primaryText,
            textAlign: "center",
          }}
        >
          Enter the verification code we sent to email:{" "}
        </Text>
        <Text
          style={{
            color: colors.secondaryText,
            textAlign: "center",
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
          fontWeight: "600",
        }}
      >
        {error}
      </Text>
      <View style={{ alignSelf: "center" }}>
        <OTPInputView
          pinCount={5}
          code={verificationCode}
          onCodeChanged={(code) => {
            setVerificationCode(code);
          }}
          codeInputFieldStyle={{
            borderWidth: 0,
            color: colors.primaryText,
            borderBottomWidth: 1,
          }}
          onCodeFilled={() => mutate()}
          style={{
            marginLeft: 25,
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
          <Text style={{ fontSize: 18, color: colors.secondaryText }}>
            {isTimerRunning
              ? `You can send another code in ${timer}s`
              : `Did not get the code? `}
          </Text>
          {!isTimerRunning && (
            <TouchableOpacity onPress={() => handleResentCode()}>
              <Text
                style={{
                  color: colors.blueText,
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                Resend code
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </Screen>
  );
};

export default ForgottenPasswordVerification;

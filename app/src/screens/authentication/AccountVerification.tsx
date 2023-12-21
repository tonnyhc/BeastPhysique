import { View, Text } from "react-native";
import Screen from "../../components/common/Screen";
import React, { useEffect, useState } from "react";
import UpperLogoWrapper from "../../components/common/UpperLogoWrapper";
import { useTheme } from "../../contexts/ThemeContext";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useAuth } from "../../contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { ActivityIndicator } from "react-native-paper";

const AccountVerification: React.FC = () => {
  const { colors } = useTheme();
  const [code, setCode] = useState<string>("");
  const { onConfirmAccount, email, onResendVerificationCode } = useAuth();
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(60);
  // TODO: when the user is not verified and logs in send a new code every time
  const mutation = async (confirmationCode: string): Promise<void> => {
    if (onConfirmAccount) {
      return await onConfirmAccount(confirmationCode);
    }
    return Promise.reject(
      new Error("onConfirmAccount function is not provided")
    );
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (code: string) => mutation(code),
    onError: (error) => console.log(error),
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
  useEffect(() => {
    if (onResendVerificationCode) {
      onResendVerificationCode();
    }
  }, []);
  const handleResentCode = () => {
    setTimer(60);
    setIsTimerRunning(true);
    if (onResendVerificationCode) {
      onResendVerificationCode();
    }
  };

  return (
    <Screen>
      <UpperLogoWrapper />
      <View style={{ flex: 1, marginTop: 100, alignItems: "center" }}>
        <View>
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
        <View>
          <OTPInputView
            pinCount={5}
            code={code}
            onCodeChanged={(code) => {
              setCode(code);
            }}
            codeInputFieldStyle={{
              borderWidth: 0,
              color: colors.primaryText,
              borderBottomWidth: 1,
            }}
            onCodeFilled={(code) => {
              mutate(code);
            }}
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
      </View>
    </Screen>
  );
};

export default AccountVerification;

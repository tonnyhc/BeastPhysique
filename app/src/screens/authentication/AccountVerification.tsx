import { View, Text, StyleSheet, Alert } from "react-native";
import Screen from "../../components/common/Screen";
import React, { useState } from "react";
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
  const { onConfirmAccount } = useAuth();

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
            smokercho56@gmail.com
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
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Text style={{ fontSize: 18, color: colors.secondaryText }}>
              Did not get the code?{" "}
            </Text>
            <TouchableOpacity>
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
          </View>
        )}
      </View>
    </Screen>
  );
};

export default AccountVerification;

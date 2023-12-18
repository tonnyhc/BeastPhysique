import { View, Text } from "react-native";
import React, { useState } from "react";
import Screen from "../../components/common/Screen";
import BackButton from "../../components/common/BackButton";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../contexts/ThemeContext";
import OTPInputView from "@twotalltotems/react-native-otp-input";

const ForgottenPasswordVerification: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [code, setCode] = useState<string>("");
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
          smokercho56@gmail.com
        </Text>
      </View>
      <View style={{alignSelf: "center"}}>
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
          onCodeFilled={() => navigation.navigate('ResetPassword')}
          style={{
            marginLeft: 25,
            width: "100%",
            height: 200,
            justifyContent: "center",
          }}
        />
      </View>
    </Screen>
  );
};

export default ForgottenPasswordVerification;

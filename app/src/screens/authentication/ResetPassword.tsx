import { View, Text } from "react-native";
import React from "react";
import Screen from "../../components/common/Screen";
import BackButton from "../../components/common/BackButton";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../contexts/ThemeContext";
import ReusableInput from "../../components/common/ReusableInput";
import { AntDesign, Feather } from "@expo/vector-icons";
import SubmitButton from "../../components/common/SubmitButton";

const ResetPassword: React.FC = () => {
  const navigation = useNavigation();
  const { colors, theme } = useTheme();
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
          Reset Password
        </Text>
      </View>
      <View>
        <Text
          style={{
            marginTop: 45,
            width: 300,
            fontSize: 16,
            color: colors.helperText,
            fontFamily: "Acme",
          }}
        >
          At least 8 characters at least, with uppercase letter, lowercase
          letter, number and special symbol
        </Text>
        <Text
          style={{
            color: colors.error,
            fontWeight: "600",
            textAlign: "center",
            paddingTop: 50,
          }}
        >
          "sasd"
        </Text>
      </View>
      <View style={{ gap: 20 }}>
        <ReusableInput
          value=""
          onChange={() => {}}
          placeholder="Password"
          label="New Password"
          isPassword={true}
          leftIcon={
            <AntDesign
              name="lock"
              size={18}
              color={theme == "dark" ? "#DEE1E6FF" : "black"}
            />
          }
          rightIcon={
            <Feather
              name="eye-off"
              size={18}
              color={theme == "dark" ? "#DEE1E6FF" : "black"}
            />
          }
        />
        <ReusableInput
          value=""
          onChange={() => {}}
          placeholder="Confirm password"
          label="Confirm Password"
          isPassword={true}
          leftIcon={
            <AntDesign
              name="lock"
              size={18}
              color={theme == "dark" ? "#DEE1E6FF" : "black"}
            />
          }
          rightIcon={
            <Feather
              name="eye-off"
              size={18}
              color={theme == "dark" ? "#DEE1E6FF" : "black"}
            />
          }
        />
      </View>
      <View style={{marginTop: 55}}>
        <SubmitButton text="Continue" onPress={() => {}} />
      </View>
    </Screen>
  );
};

export default ResetPassword;

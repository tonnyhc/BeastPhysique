import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import Screen from "../../components/common/Screen";
import ReusableInput from "../../components/common/ReusableInput";
import Button from "../../components/common/Button";
import { useTheme } from "../../contexts/ThemeContext";
import ChevronRight from "../../icons/ChevronRight";
import useKeyboard from "../../hooks/useKeyboard";
import useProfileSetup from "../../hooks/services/useProfileSetup";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ProfileSetupStackParamsList } from "../../Stacks/ProfileSetupStack";
import SetupScreenHeader from "../../components/profile/setup/SetupScreenHeader";
import SetupScreenFooterBtns from "../../components/profile/setup/SetupScreenFooterBtns";
import AuthStackHeader from "../../components/authentication/AuthStackHeader";
import TestInput from "../../components/common/TestInput";

const NameScreen: React.FC = () => {
  const navigation =
    useNavigation<StackNavigationProp<ProfileSetupStackParamsList>>();
  const { colors } = useTheme();
  const [fullName, setFullName] = useState<string>("");
  const keyboardVisible = useKeyboard();
  const styles = StyleSheet.create({
    wrapper: {
      marginTop: 20,
      justifyContent: "space-between",
      flex: 1,
    },
    inputWrapper: {
      marginTop: 30,
    },

  });

  const { mutate, isPending } = useProfileSetup({
    url: "profile/setup/full-name/",
    onSuccessFn: () => navigation.navigate("MeasuresScreen"),
  });

  return (
    <>
      <AuthStackHeader />
      <Screen closeKeyboardOnClick={true}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.wrapper}
        >
          <View>

          <SetupScreenHeader header="Set up your profile info" subheader="Tell us your name"/>
          <View style={styles.inputWrapper}>
            <TestInput
              value={fullName}
              onChange={(value: string) => setFullName(value)}
              placeholder="John Doe"
            />
          </View>
          </View>

          <SetupScreenFooterBtns
            submitFn={() => mutate(fullName)}
            pendingSubmit={isPending}
            disabledSubmit={fullName.length <= 1}
          />
        </KeyboardAvoidingView>
      </Screen>
    </>
  );
};

export default NameScreen;

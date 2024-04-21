import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Screen from "../../../components/common/Screen";
import { useTheme } from "../../../contexts/ThemeContext";
import TestInput from "../../../components/common/TestInput";
import Button from "../../../components/common/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useHeaderHeight } from "@react-navigation/elements";
import { passwordRegex } from "../../../utils/regexes";
import {
  samePasswordValidator,
  strenghtPasswordValidator,
} from "../../../utils/formValidators";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";

const ChangePasswordScreen = () => {
  const { changePassword } = useAuth();
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation();
  const { colors } = useTheme();

  const [passwords, setPasswords] = useState({
    password: "",
    new_password: "",
    re_new_password: "",
  });

  const [newPasswordError, setNewPasswordError] = useState<boolean>(false);
  const [repassError, setRePassError] = useState<boolean>(false);

  const { mutate, isPending, error, isError, data } = useMutation({
    mutationFn: () =>
      changePassword(passwords.password, passwords.new_password),
    mutationKey: ["change-password"],
    onSuccess: () => navigation.goBack(),
  });

  const checkFieldsForDisablingButton = () => {
    if (repassError || newPasswordError) {
      return true;
    }
    for (let key in passwords) {
      if (passwords[key] === "") {
        return true; // If any password is empty, return true
      }
    }
  };

  useEffect(() => {
    const new_password = passwords.new_password;
    const weakPassword = strenghtPasswordValidator(new_password);
    if (!weakPassword && new_password !== "") {
      setNewPasswordError(true);
    } else {
      setNewPasswordError(false);
    }
  }, [passwords.new_password]);
  useEffect(() => {
    const new_pass = passwords.new_password;
    const re_pass = passwords.re_new_password;
    const differentPassword = samePasswordValidator(new_pass, re_pass);
    if (differentPassword && re_pass !== "") {
      setRePassError(true);
    } else {
      setRePassError(false);
    }
  }, [passwords.re_new_password, passwords.new_password]);

  const styles = StyleSheet.create({
    helperText: {
      fontSize: 16,
      color: colors.secondaryText,
      fontFamily: "RobotoRegular",
    },
    form: {
      gap: 16,
      paddingVertical: 10,
    },
  });

  return (
    <Screen closeKeyboardOnClick>
      <KeyboardAvoidingView
        keyboardVerticalOffset={headerHeight - 30}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        // contentContainerStyle={{flex: 1}}
        style={{ paddingBottom: 30, flex: 1 }}
      >
        <Text style={styles.helperText}>
          Your password must be at least 6 characters and should include a
          combination of numbers, letters and special characters (!$@%).{" "}
        </Text>
        <View style={styles.form}>
          <TestInput
            error={isError ? (error as unknown as string) : undefined}
            keyboardType="ascii-capable"
            label="Current password"
            isPassword={true}
            value={passwords.password}
            onChange={(value: string) =>
              setPasswords((oldPass) => ({
                ...oldPass,
                password: value,
              }))
            }
            placeholder=""
          />
          <TestInput
            keyboardType="ascii-capable"
            error={
              newPasswordError ? "Choose a more securred password" : undefined
            }
            label="New password"
            isPassword={true}
            value={passwords.new_password}
            onChange={(value: string) =>
              setPasswords((oldPass) => ({
                ...oldPass,
                new_password: value,
              }))
            }
            placeholder=""
          />
          <TestInput
            keyboardType="ascii-capable"
            label="Re-type new password"
            error={repassError ? "New password does not match." : undefined}
            isPassword={true}
            value={passwords.re_new_password}
            onChange={(value: string) =>
              setPasswords((oldPass) => ({
                ...oldPass,
                re_new_password: value,
              }))
            }
            placeholder=""
          />
        </View>
        <View style={{ flex: 1, marginBottom: 30, justifyContent: "flex-end" }}>
          <Button
            loading={isPending}
            disabled={checkFieldsForDisablingButton()}
            text="Change password"
            onPress={() => mutate()}
          />
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default ChangePasswordScreen;

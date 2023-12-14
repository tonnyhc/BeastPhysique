// ActionButtons.tsx

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "../../contexts/ThemeContext";
import SubmitButton from "../common/SubmitButton";

interface ActionButtonsProps {
  onPrimaryAction: () => void;
  onSecondaryAction: () => void;
  primaryActionText: string;
  secondaryActionText: string;
  disabled: boolean;
  isLoading: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onPrimaryAction,
  onSecondaryAction,
  primaryActionText,
  secondaryActionText,
  disabled,
  isLoading,
}) => {
  const { theme, colors } = useTheme();

  const styles = StyleSheet.create({
    actionBtns: {
      marginTop: 28,
      justifyContent: "center",
      gap: 16,
    },
    helperText: {
      alignSelf: "center",
      fontSize: 12,
      fontWeight: "700",
      fontFamily: "Acme",
      color: colors.helperText,
    },
    iconsWrapper: {
      flexDirection: "row",
      alignSelf: "center",
      gap: 32,
    },
  });
  return (
    <View style={styles.actionBtns}>
      <SubmitButton
        text={primaryActionText}
        onPress={onPrimaryAction}
        disabled={disabled || isLoading}
        loading={isLoading}
      />
      <Text style={styles.helperText}>
        OR {primaryActionText.toUpperCase()} WITH
      </Text>
      <View style={styles.iconsWrapper}>
        <AntDesign
          name="google"
          size={24}
          color={theme == "dark" ? "#DEE1E6FF" : "black"}
        />
        <FontAwesome5
          name="facebook"
          size={24}
          color={theme == "dark" ? "#DEE1E6FF" : "black"}
        />
        <AntDesign
          name="apple-o"
          size={24}
          color={theme == "dark" ? "#DEE1E6FF" : "black"}
        />
      </View>
      <Text style={styles.helperText}>
        {primaryActionText.toLowerCase() === "sign up"
          ? "Already have an account? "
          : "Don't have an account? "}
        <TouchableOpacity onPress={onSecondaryAction}>
          <Text
            style={{
              color: theme == "dark" ? "#DEE1E6FF" : colors.blueText,
              fontWeight: "700",
            }}
          >
            {secondaryActionText}
          </Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

export default ActionButtons;

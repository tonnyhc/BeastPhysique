import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { ReactNode } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "../../contexts/ThemeContext";
import { Colors } from "../../utils/colors";

interface ButtonProps {
  onPress: () => void;
  text?: string;
  testId?: string;
  disabled?: boolean;
  icon?: ReactNode;
  type?: "primary" | "outlined" | "text";
  loading?: boolean;
}

const generateBackgroundStyles = (
  type: any,
  disabled: boolean,
  colors: Colors
) => {
  const bg = {
    primary: {
      backgroundColor: disabled ? colors.buttonDisabled : colors.button,
    },
    outlined: {
      backgroundColor: "transparent",
    },
    text: {
      backgroundColor: "transparent",
    },
  };
  return bg[type];
};

const generateTextColors = (
  type: string,
  disabled: boolean,
  colors: Colors
) => {
  const colorsMap = {
    primary: {
      color: disabled ? colors.helperText : colors.white,
    },
    outlined: {
      color: disabled ? colors.helperText : colors.outlinedButtonText,
    },
    text: {
      color: disabled ? colors.helperText : colors.button,
    },
  };
  return colorsMap[type];
};

const TestButton: React.FC<ButtonProps> = ({
  testId,
  disabled,
  text,
  icon,
  onPress,
  type = "primary",
  loading,
}) => {
  const { colors } = useTheme();

  const backgroundStyles = generateBackgroundStyles(
    type,
    disabled ? disabled : false,
    colors
  );
  const textColor = generateTextColors(
    type,
    disabled ? disabled : false,
    colors
  );
  const styles = StyleSheet.create({
    wrapper: {
      ...backgroundStyles,
      borderWidth: type === "text" ? 0 : 2,
      borderColor: disabled ? colors.buttonDisabled : colors.button,
      paddingVertical: 14,
      paddingLeft: 16,
      paddingRight: icon ? 8 : 16,
      borderRadius: 100,
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      ...textColor,
      fontFamily: "RobotoRegular",
      //   color: type === "primary" ? colors.white : colors.button,
      fontSize: 16,
    },
    textIconWrapper: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 8,
    },
  });

  return (
    <TouchableOpacity
      style={styles.wrapper}
      disabled={disabled}
      testID={testId}
      onPress={onPress}
    >
      {loading ? <ActivityIndicator testID="loadingIndicator" /> : null}
      <View style={styles.textIconWrapper}>
        <Text style={styles.text}>{text}</Text>
        {icon}
      </View>
    </TouchableOpacity>
  );
};

export default TestButton;

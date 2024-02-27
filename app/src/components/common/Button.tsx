import { View, Text, TouchableOpacity, Platform } from "react-native";
import React, { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { ActivityIndicator } from "react-native-paper";
import { Colors } from "../../utils/colors";

interface ButtonProps {
  text: string;
  onPress: () => any;
  disabled?: boolean;
  loading?: boolean;
  buttonStyles?: Record<string, number | string>;
  textStyles?: Record<string, number | string>;
  testId?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  type?: "outlined" | "primary" | "text" | "secondary";
}

const generateBackgroundStyles = (
  colors: Colors,
  type: "outlined" | "primary" | "text" | "secondary"
) => {
  const styles = {
    outlined: {
      backgroundColor: colors.bg,
      borderWidth: 1,
      borderColor: colors.btnPrimary,
    },
    text: {
      backgroundColor: "transparent",
      borderWidth: 0,
      borderColor: "transparent",
    },
    primary: {
      backgroundColor: colors.btnPrimary,
    },
    secondary: {
      backgroundColor: colors.btnSecondary,
    },
  };
  return styles[type];
};

const generateTextStyles = (
  colors: Colors,
  type: "outlined" | "primary" | "text" | "secondary" 
) => {
  const styles = {
    outlined: {
      color: colors.btnPrimary,
    },
    text: {
      color: colors.btnPrimary,
    },
    primary: {
      color: colors.white,
    },
    secondary: {
      color: colors.secondaryBtnText,
    },
  };
  return styles[type];
};

const generatePaddingStyles = (
  type: "outlined" | "primary" | "text" | "secondary",
  leftIcon?: ReactNode,
  rightIcon?: ReactNode
) => {
  let styles = {
    paddingLeft: 24,
    paddingRight: 24,
  };
  if (type === "text") {
    styles = {
      paddingLeft: 0,
      paddingRight: 0,
    };
  }
  if (leftIcon) {
    styles.paddingLeft = 16;
  }
  if (rightIcon) {
    styles.paddingLeft = 16;
  }

  return styles;
};

const Button: React.FC<ButtonProps> = ({
  text,
  onPress,
  disabled,
  loading,
  testId,
  buttonStyles,
  textStyles,
  leftIcon,
  rightIcon,
  type,
}) => {
  const { colors, shadows } = useTheme();

  const shadowStyle =
    type == "primary"
      ? Platform.select({
          ios: { ...shadows["24DP_Umbra"] },
          android: {
            elevation: 12,
          },
        })
      : "";

  const backgroundStyles = generateBackgroundStyles(
    colors,
    type ? type : "primary"
  );
  const textColor = generateTextStyles(colors, type ? type : "primary");
  const paddingStyles = generatePaddingStyles(
    type ? type : "primary",
    leftIcon,
    rightIcon
  );
  const styles = StyleSheet.create({
    submitBtn: {
      flexDirection: "row",
      gap: 8,
      // paddingLeft: leftIcon ? 16 : 24,
      // paddingRight: rightIcon ? 16 : 24,
      ...paddingStyles,
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
      // borderRadius: 24,
      borderRadius: 12,
      height: 40,
      opacity: disabled ? 0.5 : 1,
      ...backgroundStyles,
      ...shadowStyle,
      ...buttonStyles,
    },
    submitBtnText: {
      fontSize: 16,
      fontWeight: "normal",
      fontFamily: "RobotoBold",
      letterSpacing: 0.21,
      lineHeight: 21,
      ...textStyles,
      ...textColor,
    },
  });

  return (
    <TouchableOpacity
      testID={testId}
      disabled={disabled}
      onPress={onPress}
      style={styles.submitBtn}
    >
      {loading ? (
        <ActivityIndicator testID="loadingIndicator" />
      ) : leftIcon ? (
        leftIcon
      ) : null}

      <Text style={styles.submitBtnText}>{text}</Text>
      {rightIcon ? rightIcon : null}
    </TouchableOpacity>
  );
};

export default Button;

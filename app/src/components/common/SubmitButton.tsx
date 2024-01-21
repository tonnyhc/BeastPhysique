import { View, Text, TouchableOpacity, Platform } from "react-native";
import React, { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { ActivityIndicator } from "react-native-paper";
import { Colors } from "../../utils/colors";

interface SubmitButtonProps {
  text: string;
  onPress: () => any;
  disabled?: boolean;
  loading?: boolean;
  buttonStyles?: Record<string, number | string>;
  textStyles?: Record<string, number | string>;
  testId?: string;
  leftIcon?: ReactNode;
  type?: "outlined" | "fill" | "text";
}

const generateBackgroundStyles = (
  colors: Colors,
  type: "outlined" | "fill" | "text"
) => {
  const styles = {
    outlined: {
      backgroundColor: colors.bg,
      borderWidth: 1,
      borderColor: colors.submitBtn,
    },
    text: {
      backgroundColor: "transparent",
      borderWidth: 0,
      borderColor: "transparent",
    },
    fill: {
      backgroundColor: colors.submitBtn,
    },
  };
  return styles[type];
};

const SubmitButton: React.FC<SubmitButtonProps> = ({
  text,
  onPress,
  disabled,
  loading,
  testId,
  buttonStyles,
  textStyles,
  leftIcon,
  type,
}) => {
  const { colors, shadows } = useTheme();

  const shadowStyle =
    type == "fill"
      ? Platform.select({
          ios: { ...shadows["24DP_Umbra"] },
          android: {
            elevation: 12,
          },
        })
      : "";

  const backgroundStyles = generateBackgroundStyles(
    colors,
    type ? type : "fill"
  );
  const styles = StyleSheet.create({
    submitBtn: {
      flexDirection: "row",
      gap: 8,
      paddingLeft: leftIcon ? 16 : 24,
      paddingRight: 24,
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
      borderRadius: 24,
      height: 40,
      opacity: disabled ? 0.5 : 1,
      ...backgroundStyles,
      ...shadowStyle,
      ...buttonStyles,
    },
    submitBtnText: {
      color:
        type !== "outlined" && type !== "text"
          ? colors.white
          : colors.submitBtn,
      fontWeight: "normal",
      // fontFamily: "Acme",
      ...textStyles,
    },
  });
  return (
    <View>
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
      </TouchableOpacity>
    </View>
  );
};

export default SubmitButton;

import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { ReactNode, useEffect, useState } from "react";
import UserIcon from "../../icons/UserIcon";
import { useTheme } from "../../contexts/ThemeContext";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import EyeIcon from "../../icons/EyeIcon";
import { emailRegex } from "../../utils/regexes";

interface ReusableInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  rightIconOnPress?: () => void;
  isPassword?: boolean;
  helperTextLeft?: string;
  helperTextRight?: string;
  error?: boolean;

  onEndEditing?: () => void;
  inputMode?: "text" | "decimal" | "numeric" | "email" | "search";
}

const TestInput: React.FC<ReusableInputProps> = ({
  value,
  onChange,
  label,
  placeholder,
  leftIcon,
  rightIcon,
  rightIconOnPress,
  isPassword,
  error,
  onEndEditing,
  inputMode,
  helperTextLeft,
  helperTextRight,
}) => {
  const { colors } = useTheme();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(
    isPassword ? true : false
  );
  const [emailError, setEmailError] = useState<boolean>(false);

  useEffect(() => {
    if (value === ''){
      return setEmailError(false)
    }
    if (inputMode !== "email") {
      return;
    }
    const isValid = emailRegex.test(value);
    setEmailError(!isValid);
  }, [value]);

  const styles = StyleSheet.create({
    wrapper: {
      gap: 4,
    },
    label: {
      fontSize: 16,
      fontFamily: "RobotoRegular",
      color: error || emailError ? colors.error : colors.primaryText,
    },
    master: {
      gap: 8,
      minHeight: 48,
      borderWidth: 1,
      borderRadius: 4,
      borderColor: error || emailError ? colors.error : "#676767",
      paddingLeft: 16,
      paddingRight: 16,
      paddingVertical: 12,
      justifyContent: "center",
      flexDirection: "row",
    },
    icon_placeholder_wrapper: {
      justifyContent: "center",
    },
    input: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      // color: type == "underline" ? colors.white : colors.helperText,
      color: colors.helperText,
      fontWeight: "bold",
      fontFamily: "RobotoBold",
      // textAlignVertical: multiline ? "top" : "auto",
    },
    placeholderText: {
      fontSize: 16,
      fontFamily: "RobotoMedium",
    },
    helperRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 16,
    },
    helpText: {
      fontFamily: "RobotoRegular",
      fontSize: 12,
      color: error || emailError ? colors.error : colors.helperText,
    },
  });

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.master}>
        {/* left icon */}
        {leftIcon ? (
          <View style={styles.icon_placeholder_wrapper}>{leftIcon}</View>
        ) : null}

        {/* input */}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={"#8A8A8A"}
          value={value}
          secureTextEntry={passwordVisible}
          onChangeText={onChange}
          inputMode={inputMode}
        />
        {/* right icon */}
        {isPassword ? (
          <TouchableWithoutFeedback
            onPress={() => setPasswordVisible((oldPassword) => !oldPassword)}
          >
            <EyeIcon size={24} color={colors.helperText} />
          </TouchableWithoutFeedback>
        ) : (
          <TouchableWithoutFeedback onPress={() => rightIconOnPress()}>
            {rightIcon}
          </TouchableWithoutFeedback>
        )}
      </View>
      {helperTextLeft || helperTextRight || emailError ? (
        <View style={styles.helperRow}>
          <Text style={styles.helpText}>
            {emailError ? "Please enter a valid email!" : helperTextLeft}
          </Text>
          <Text style={styles.helpText}>{helperTextRight}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default TestInput;

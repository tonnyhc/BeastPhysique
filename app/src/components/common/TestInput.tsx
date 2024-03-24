import { StyleSheet, Text, TextInput, TextStyle, View } from "react-native";
import React, { ReactNode, useEffect, useState } from "react";
import UserIcon from "../../icons/UserIcon";
import { useTheme } from "../../contexts/ThemeContext";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { emailRegex } from "../../utils/regexes";
import EyeOnIcon from "../../icons/EyeOnIcon";

interface ReusableInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  labelStyles?: TextStyle;
  placeholder: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  rightIconOnPress?: () => void;
  isPassword?: boolean;
  helperTextLeft?: string;
  helperTextRight?: string;
  onPressHelperRight?: () => void;
  error?: string;

  multiline?: boolean
  onEndEditing?: () => void;
  inputMode?: "text" | "decimal" | "numeric" | "email" | "search";
}

const TestInput: React.FC<ReusableInputProps> = ({
  value,
  onChange,
  label,
  labelStyles,
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
  onPressHelperRight,
  multiline
}) => {
  const { colors } = useTheme();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(
    isPassword ? true : false
  );
  const [emailError, setEmailError] = useState<boolean>(false);

  useEffect(() => {
    if (value === "") {
      return setEmailError(false);
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
      fontFamily: "RobotoMedium",
      marginLeft: 8,
      marginBottom: 4,
      color: error || emailError ? colors.error : colors.primaryText,
      ...labelStyles
    },
    master: {
      gap: 8,
      minHeight: multiline ? 68 : 48,
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
      color: colors.helperText,
      fontFamily: "RobotoRegular",
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
      fontSize: 13,
      color: error || emailError ? colors.error : colors.helperText,
    },
  });

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{error ? error : label}</Text>
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
          multiline={multiline}
          numberOfLines={10}
        />
        {/* right icon */}
        {isPassword ? (
          <TouchableWithoutFeedback
            onPress={() => setPasswordVisible((oldPassword) => !oldPassword)}
          >
            <EyeOnIcon size={24} color={colors.helperText} />
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
          <TouchableWithoutFeedback onPress={onPressHelperRight}>
            <Text style={styles.helpText}>{helperTextRight}</Text>
          </TouchableWithoutFeedback>
        </View>
      ) : null}
    </View>
  );
};

export default TestInput;

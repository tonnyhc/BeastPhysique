import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import React, { ReactNode, useEffect, useState } from "react";
import UserIcon from "../../icons/UserIcon";
import { useTheme } from "../../contexts/ThemeContext";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { emailRegex } from "../../utils/regexes";
import EyeOnIcon from "../../icons/EyeOnIcon";
import EyeSlashIcon from "../../icons/EyeSlashIcon";
import { useTranslation } from "react-i18next";

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
  styles?: ViewStyle;
  multiline?: boolean;
  onEndEditing?: () => void;
  inputMode?: "text" | "decimal" | "numeric" | "email" | "search";
  defaultValue?: string;
  numberOfLines?: number;
  borderStyles?: ViewStyle;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
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
  multiline,
  styles,
  defaultValue,
  numberOfLines,
  borderStyles,
  keyboardType,
  maxLength,
}) => {
  const {t} = useTranslation()
  const { colors, theme } = useTheme();
  const [securedPassword, setSecuredPassword] = useState<boolean>(
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

  const stylesheet = StyleSheet.create({
    wrapper: {
      gap: 4,

      ...styles,
    },
    label: {
      fontSize: 16,
      fontFamily: "RobotoMedium",
      marginLeft: 8,
      marginBottom: 4,
      color: error || emailError ? colors.error : colors.primaryText,
      ...labelStyles,
    },
    master: {
      gap: 8,
      minHeight: multiline ? 68 : 42,
      borderWidth: 1,
      borderRadius: 4,
      borderColor: error || emailError ? colors.error : "#676767",
      paddingLeft: 16,
      paddingRight: 16,
      paddingVertical: 12,
      justifyContent: "center",
      flexDirection: "row",
      ...borderStyles,
    },
    icon_placeholder_wrapper: {
      justifyContent: "center",
    },
    input: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      color: colors.secondaryText,
      fontFamily: "RobotoRegular",
      fontSize: 16,
    },
    placeholderText: {
      fontSize: 18,
      fontFamily: "RobotoMedium",
    },
    helperRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 16,
    },
    helpText: {
      fontFamily: "RobotoRegular",
      fontSize: 14,
      color: error || emailError ? colors.error : colors.secondaryText,
    },
  });

  const renderPasswordVisibilityIcon = () => {
    if (securedPassword) {
      return <EyeOnIcon size={24} color={colors.secondaryText} />;
    }
    return <EyeSlashIcon size={24} color={colors.secondaryText} />;
  };

  return (
    <View style={stylesheet.wrapper}>
      {error || label ? (
        <Text style={stylesheet.label}>{error ? error : label}</Text>
      ) : null}
      <View style={stylesheet.master}>
        {/* left icon */}
        {leftIcon ? (
          <View style={stylesheet.icon_placeholder_wrapper}>{leftIcon}</View>
        ) : null}

        {/* input */}
        <TextInput
          maxLength={maxLength ? maxLength : undefined}
          keyboardType={keyboardType ? keyboardType : "default"}
          keyboardAppearance={theme === "dark" ? "dark" : "light"}
          defaultValue={defaultValue}
          style={stylesheet.input}
          placeholder={placeholder}
          placeholderTextColor={"#8A8A8A"}
          value={value}
          secureTextEntry={securedPassword}
          onChangeText={onChange}
          inputMode={inputMode}
          multiline={multiline}
          numberOfLines={numberOfLines ? numberOfLines : 10}
        />
        {/* right icon */}
        {isPassword ? (
          <TouchableWithoutFeedback
            onPress={() => setSecuredPassword((oldPassword) => !oldPassword)}
          >
            {renderPasswordVisibilityIcon()}
          </TouchableWithoutFeedback>
        ) : (
          <TouchableWithoutFeedback
            onPress={() => (rightIconOnPress ? rightIconOnPress() : null)}
          >
            {rightIcon}
          </TouchableWithoutFeedback>
        )}
      </View>
      {helperTextLeft || helperTextRight || emailError ? (
        <View style={stylesheet.helperRow}>
          <Text style={stylesheet.helpText}>
            {emailError ? t('common.enterValidEmail') : helperTextLeft}
          </Text>
          <TouchableWithoutFeedback onPress={onPressHelperRight}>
            <Text style={stylesheet.helpText}>{helperTextRight}</Text>
          </TouchableWithoutFeedback>
        </View>
      ) : null}
    </View>
  );
};

export default TestInput;

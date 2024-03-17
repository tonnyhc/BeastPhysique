import { ReactNode, useState } from "react";

import {
  Text,
  View,
  TextInput,
  Pressable,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

interface ReusableInputProps {
  value: string | number;
  onChange: (value: string) => void;
  multiline?: boolean;
  maxLenght?: number;
  numberOfLines?: number;
  label?: string;
  placeholder: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isPassword?: boolean;
  error?: string;
  onEndEditing?: () => void;
  inputMode?: "text" | "decimal" | "numeric" | "email" | "search";
  styles?: {
    wrapper: ViewStyle;
  };
  type?: "underline" | "fill";
}

const ReusableInput: React.FC<ReusableInputProps> = ({
  label,
  placeholder,
  leftIcon,
  rightIcon,
  isPassword,
  value,
  onChange,
  onEndEditing,
  error,
  inputMode = "text",
  styles,
  multiline,
  numberOfLines,
  maxLenght,
  type = "fill",
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { colors } = useTheme();

  const stlyes = StyleSheet.create({
    wrapper: {
      // minHeight: 80,
      minHeight: 48,
      height: multiline ? 150 : "auto",
      ...styles?.wrapper,
    },
    labelText: {
      fontSize: 12,
      // fontWeight: "700",
      fontFamily: "RobotoMedium",
      marginBottom: 12,
      color: colors.primaryText,
    },
    inputWrapper: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      // backgroundColor: type == "underline" ? "transparent" : colors.inputBg,
      // backgroundColor: '#8A8A8A',
      minHeight: 45,
      borderRadius: 4,
      paddingLeft: 16,
      paddingRight: 16,
      borderColor: error ? colors.error : colors.borderGrey,
      borderWidth: 1,
    },
    input: {
      flex: 1,
      marginLeft: 8,
      height: "90%",
      color: type == "underline" ? colors.white : colors.helperText,
      fontWeight: "bold",
      fontFamily: "RobotoBold",
      textAlignVertical: multiline ? "top" : "auto",
    },
  });
  return (
    <View style={stlyes.wrapper}>
      {error ? (
        <Text style={[stlyes.labelText, { color: colors.error }]}>
          {error}{" "}
        </Text>
      ) : label ? (
        <Text style={stlyes.labelText}>{label}</Text>
      ) : null}
      <View style={stlyes.inputWrapper}>
        {leftIcon && leftIcon}
        <TextInput
          multiline={multiline}
          numberOfLines={numberOfLines}
          onEndEditing={onEndEditing}
          style={stlyes.input}
          secureTextEntry={
            isPassword && passwordVisible == false ? true : false
          }
          placeholder={placeholder}
          // TODO: change this to primary text
          placeholderTextColor={type == 'underline' ? colors.white : colors.helperText}
          value={value}
          onChangeText={onChange}
          inputMode={inputMode}
          maxLength={maxLenght ? maxLenght : undefined}
        />

        {rightIcon && isPassword && (
          <Pressable
            onPress={() => setPasswordVisible((oldVisible) => !oldVisible)}
          >
            {rightIcon}
          </Pressable>
        )}
      </View>
    </View>
  );
};
export default ReusableInput;

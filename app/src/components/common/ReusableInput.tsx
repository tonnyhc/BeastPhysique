import { ReactNode, useState } from "react";

import { Text, View, TextInput, Pressable, StyleSheet, Platform } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

interface ReusableInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isPassword?: boolean;
  error?: string;
  onEndEditing?: () => void;
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
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { colors, shadows } = useTheme();
  // const shadowStyles = Platform.select({
  //   ios: {...shadows['12DP_Penumbra']},
  //   android: {
  //     elevation: 12,
  //     backgroundColor: "transparent"
  //   }
  // })
  const stlyes = StyleSheet.create({
    wrapper: {
      height: 80,
    },
    labelText: {
      fontSize: 12,
      fontWeight: "700",
      fontFamily: "Acme",
      marginBottom: 12,
      color: colors.primaryText,
    },
    inputWrapper: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.inputBg,
      height: 45,
      borderRadius: 24,
      paddingLeft: 16,
      paddingRight: 16,
      borderColor: error ? colors.error : "#CCC",
      borderWidth: 1,
      // ...shadowStyles
    },
    input: {
      flex: 1,
      marginLeft: 8,
      color: colors.helperText,
      fontWeight: "bold",
      fontFamily: "Acme",
    },
  });
  return (
    <View style={stlyes.wrapper}>
      {error ? (
        <Text style={[stlyes.labelText, { color: colors.error }]}>
          {error}{" "}
        </Text>
      ) : (
        <Text style={stlyes.labelText}>{label}</Text>
      )}
      <View style={stlyes.inputWrapper}>
        {leftIcon && leftIcon}
        <TextInput
          onEndEditing={onEndEditing}
          style={stlyes.input}
          secureTextEntry={
            isPassword && passwordVisible == false ? true : false
          }
          placeholder={placeholder}
          placeholderTextColor={colors.helperText}
          value={value}
          onChangeText={onChange}
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

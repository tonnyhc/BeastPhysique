import { ReactNode, useState } from "react";

import { Text, View, TextInput, Pressable, StyleSheet } from "react-native";
import { colors, lightColors } from "../../utils/colors";

interface ReusableInputProps {
  value: string;
  onChange: () => void;
  label: string;
  placeholder: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isPassword?: boolean;
}

const ReusableInput: React.FC<ReusableInputProps> = ({
  label,
  placeholder,
  leftIcon,
  rightIcon,
  isPassword,
  value,
  onChange,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={stlyes.wrapper}>
      <Text style={stlyes.labelText}>{label}</Text>
      <View style={stlyes.inputWrapper}>
        {leftIcon && leftIcon}
        <TextInput
          style={stlyes.input}
          secureTextEntry={
            isPassword && passwordVisible == false ? true : false
          }
          placeholder={placeholder}
          placeholderTextColor={colors.grayText}
          value={value}
          onChangeText={onChange}
        />

        {rightIcon && (
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

const stlyes = StyleSheet.create({
  wrapper: {
    height: 80,
  },
  labelText: {
    fontSize: 12,
    fontWeight: "700",
    fontFamily: "Acme",
    marginBottom: 12,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "center",
    backgroundColor: lightColors.inputBg,
    height: 45,
    borderRadius: 24,
    paddingLeft: 16,
    paddingRight: 16
  },
  input: {
    flex: 1,
    marginLeft: 8,
    color: colors.grayText,
    fontWeight: "bold",
    fontFamily: "Acme",
  },
});

{
  /* <View className=" h-20">
<Text className='text-sm font-extrabold font-acme mb-3 dark:text-white'>{label}</Text>
<View className="flex-1 flex-row items-center bg-light-inputBg h-11 rounded-3xl outline-none px-4 dark:bg-dark-inputBg">
  {leftIcon && leftIcon}
  <TextInput
  className='ml-2 text-grayText font-bold  flex-1 font-acme '
    secureTextEntry={
      isPassword && passwordVisible == false ? true : false
    }
    placeholder={placeholder}
    placeholderTextColor="#BCC1CAFF"
    value={value}
    onChangeText={text => onChange(text)}
  />

  {rightIcon && (
    <Pressable
      onPress={() => setPasswordVisible((oldVisible) => !oldVisible)}
    >
      {rightIcon}
    </Pressable>
  )}
</View>
</View> */
}

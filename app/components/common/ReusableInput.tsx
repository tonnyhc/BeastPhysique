import { ReactNode, useState } from "react";

import { Text, View, TextInput,  Pressable } from "react-native";

interface ReusableInputProps {
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
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View className=" h-20">
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

// const styles = StyleSheet.create({
//   inputWrapper: {
//     width: "100%",
//     flexDirection: "row",
//     alignItems: "center",
//     height: 45,
//     fontSize: 16,
//     backgroundColor: "#F3F4F6FF",
//     borderRadius: 22,
//     borderWidth: 0,
//     outline: 0,
//     paddingLeft: 18,
//     paddingRight: 18,
//   },
//   input: {
//     marginLeft: 10,
//     color: "#BCC1CAFF2",
//     fontWeight: "600",
//     flex: 1,
//     fontFamily: "Acme",
//   },
// });

import { ReactNode } from "react";
import { View, Text, Switch, TouchableOpacity } from "react-native";
import { AntDesign, Feather, FontAwesome5 } from "@expo/vector-icons";
import ReusableInput from "./common/ReusableInput";

type FormField = {
  label: string;
  leftIcon: ReactNode;
  rightIcon?: ReactNode;
  placeholder: string;
  isPassword?: boolean;
};

const formFields: FormField[] = [
  {
    label: "Username",
    leftIcon: <AntDesign name="mail" size={18} color="black" />,
    placeholder: "Enter username",
  },
  {
    label: "Email",
    leftIcon: <AntDesign name="user" size={18} color="black" />,
    placeholder: "Enter email",
  },
  {
    label: "Password",
    leftIcon: <AntDesign name="lock" size={18} color="black" />,
    rightIcon: <Feather name="eye-off" size={18} color="black" />,
    placeholder: "Enter password",
    isPassword: true,
  },
  {
    label: "Confirm password",
    leftIcon: <AntDesign name="lock" size={18} color="black" />,
    rightIcon: <Feather name="eye-off" size={18} color="black" />,
    placeholder: "Confirm password",
    isPassword: true,
  },
];

const RegisterForm: React.FC = () => {
  return (
    <View className="mt-6">
      {formFields.map((field) => (
        <View className="mb-3" key={field.label}>
          <ReusableInput
            placeholder={field.placeholder}
            label={field.label}
            leftIcon={field.leftIcon}
            rightIcon={field.rightIcon}
            isPassword={field.isPassword}
          />
        </View>
      ))}
      <View className="flex-row gap-2">
        <Switch value={true} />
        <Text className="flex-1">
          I agree with{" "}
          <Text className="text-blueText font-semibold">
            Terms & Conditions
          </Text>
        </Text>
      </View>

      <View className="mt-7 justify-center gap-3">
        <TouchableOpacity className="px-4 items-center rounded h-11 justify-center bg-light-submitBtn">
          <Text className="text-base text-white">Sign Up</Text>
        </TouchableOpacity>
        <Text className="self-center text-xs text-helperText">
          OR SIGN UP WITH
        </Text>
        <View className="flex-row self-center gap-8">
          <AntDesign
            className="fill-googleIcon"
            name="google"
            size={24}
            color="black"
          />
          <FontAwesome5
            className="fill-fbIcon"
            name="facebook"
            size={24}
            color="black"
          />
          <AntDesign
            className="fill-appleIcon"
            name="apple-o"
            size={24}
            color="black"
          />
        </View>
        <Text className="self-center text-xs text-helperText">
          Already have an account?{" "}
          <Text className="text-blueText font-bold">Sign in</Text>
        </Text>
      </View>
    </View>
  );
};
export default RegisterForm;

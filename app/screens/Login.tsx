import React from "react";
import { View, Text, TouchableOpacity, Switch, Button } from "react-native";
import { FormField } from "../ts/types";
import { useColorScheme } from "nativewind";
import ReusableInput from "../components/common/ReusableInput";
import { useNavigation } from "@react-navigation/native";
import LoginForm from "../components/LoginForm";
import { SafeAreaView } from "react-native-safe-area-context";

const Login: React.FC = () => {
  const { colorScheme } = useColorScheme();
  const navigation = useNavigation();


  return (
    <SafeAreaView className="flex-1 px-3 justify-around font-acme">
      <Text className="text-[32px] font-extrabold font-acme dark:text-white self-center">
        Welcome back 👋
      </Text>
    
      <LoginForm />

    </SafeAreaView>
  );
};

export default Login;

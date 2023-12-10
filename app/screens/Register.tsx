import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import RegisterForm from "../components/RegisterForm";

const Register: React.FC = () => {
  return (
    <SafeAreaView className='flex-1 px-3 justify-center'>
      <Text className='text-3xl font-extrabold text-light-primaryText mb-1 dark:text-white'>Welcome.</Text>
      <Text className='text-xl font-bold text-light-secondaryText'>Create an account</Text>

      {/* register form */}
      <RegisterForm />

    </SafeAreaView>
  );
};

export default Register;

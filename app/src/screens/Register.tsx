import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RegisterForm from "../components/authentication/RegisterForm";
import Screen from "../components/common/Screen";
import { useTheme } from "../contexts/ThemeContext";

const Register: React.FC = () => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      justifyContent: "center",
    },
    welcomeText: {
      fontSize: 30,
      fontWeight: "700",
      color: colors.primaryText,
      marginBottom: 4,
      fontFamily: "Acme",
    },
    secondaryWelcome: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.secondaryText,
      fontFamily: "Acme",
    },
  });
  return (
    <Screen>
      <View style={styles.wrapper}>
        <Text style={styles.welcomeText}>Welcome.</Text>
        <Text style={styles.secondaryWelcome}>Create an account</Text>

        {/* register form */}
        <RegisterForm />
      </View>
    </Screen>
  );
};
export default Register;

// <SafeAreaView className='flex-1 px-3 justify-center'>
// <Text className='text-3xl font-extrabold text-light-primaryText mb-1 dark:text-white'>Welcome.</Text>
// <Text className='text-xl font-bold text-light-secondaryText'>Create an account</Text>

// {/* register form */}
// <RegisterForm />

// </SafeAreaView>

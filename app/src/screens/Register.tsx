import React from "react";
import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import RegisterForm from "../components/RegisterForm";
import Section from "../components/common/Section";
import { lightColors } from "../utils/colors";

const Register: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Section>
        <View style={styles.wrapper}>
          <Text style={styles.welcomeText}>
            Welcome.
          </Text>
          <Text style={styles.secondaryWelcome}>
            Create an account
          </Text>

          {/* register form */}
          <RegisterForm />
        </View>
      </Section>
    </SafeAreaView>
  );
};
export default Register;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: "center"
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: '700',
    color: lightColors.primaryText,
    marginBottom: 4,
    fontFamily: "Acme"
  },
  secondaryWelcome: {
    fontSize: 20,
    fontWeight: "700",
    color: lightColors.secondaryText,
    fontFamily: "Acme"
  }
});

// <SafeAreaView className='flex-1 px-3 justify-center'>
// <Text className='text-3xl font-extrabold text-light-primaryText mb-1 dark:text-white'>Welcome.</Text>
// <Text className='text-xl font-bold text-light-secondaryText'>Create an account</Text>

// {/* register form */}
// <RegisterForm />

// </SafeAreaView>

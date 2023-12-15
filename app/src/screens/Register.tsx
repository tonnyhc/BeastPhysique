import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RegisterForm from "../components/authentication/RegisterForm";
import Screen from "../components/common/Screen";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { RegisterBody } from "../ts/types";

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

  const { onRegister } = useAuth();

  const mutationRegister = async (data: RegisterBody): Promise<any> => {
    try {
      if (onRegister) {
        await onRegister(data);
      } else {
        throw new Error("onLogin function is not provided");
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const { mutate, isPending } = useMutation({ mutationFn: mutationRegister });


  return (
    <Screen>
      <View style={styles.wrapper}>
        <Text style={styles.welcomeText}>Welcome.</Text>
        <Text style={styles.secondaryWelcome}>Create an account</Text>

        {/* register form */}
        <RegisterForm mutate={mutate} isPending={isPending} />
        {/* <RegisterForm /> */}
      </View>
    </Screen>
  );
};
export default Register;

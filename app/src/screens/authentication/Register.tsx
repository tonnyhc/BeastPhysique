import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RegisterForm from "../../components/authentication/RegisterForm";
import Screen from "../../components/common/Screen";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { RegisterBody } from "../../ts/types";
import UpperLogoWrapper from "../../components/common/UpperLogoWrapper";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../../Stacks/AuthStack";

interface RegisterProps {
  navigation: StackNavigationProp<AuthStackParamList>
}

const Register: React.FC<RegisterProps> = ({
  navigation
}) => {
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
    if (onRegister) {
      return await onRegister(data);
    } else {
      return Promise.reject();
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: mutationRegister,
    onSuccess: () => {
      navigation.navigate("OTPVerification");
    },
  });

  return (
    <Screen>
      <UpperLogoWrapper />
      <View style={styles.wrapper}>
        <Text style={styles.welcomeText}>Welcome.</Text>
        <Text style={styles.secondaryWelcome}>Create an account</Text>
        {/* register form */}
        <RegisterForm navigation={navigation} mutate={mutate} isPending={isPending} />
      </View>
    </Screen>
  );
};
export default Register;

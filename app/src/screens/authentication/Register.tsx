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
import LogoWithText from "../../components/common/LogoWithText";

interface RegisterProps {
  navigation: StackNavigationProp<AuthStackParamList>;
}

const Register: React.FC<RegisterProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
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
    mutationFn:  mutationRegister,
    onSuccess: () => {
      navigation.navigate("AccountVerification");
    },
  });

  return (
    <Screen>

      <View style={styles.wrapper}>
        <View style={{flex: 1}}>
          <LogoWithText width={300} height={300} />
        </View>
        {/* register form */}
        <View style={{flex: 2}}>
          <RegisterForm
            navigation={navigation}
            mutate={mutate}
            isPending={isPending}
          />
        </View>
      </View>
    </Screen>
  );
};
export default Register;

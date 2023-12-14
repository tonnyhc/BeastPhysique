import React, { useContext } from "react";
import { Text, StyleSheet, View } from "react-native";
import LoginForm from "../components/authentication/LoginForm";
import Screen from "../components/common/Screen";
import { useTheme } from "../contexts/ThemeContext";


const Login: React.FC = () => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    section: {
      flex: 1,
      justifyContent: "space-around",
      fontFamily: "Acme",
    },
    welcomeText: {
      fontSize: 32,
      fontWeight: "700",
      fontFamily: "Acme",
      alignSelf: "center",
      color: colors.primaryText,
    },
  });
  return (
    <Screen>
      <View style={styles.section}>
        <Text style={styles.welcomeText}>Welcome back 👋</Text>
        <LoginForm />
      </View>
    </Screen>
  );
};

export default Login;
{
  /* <SafeAreaView className="flex-1 px-3 justify-around font-acme">
<Text className="text-[32px] font-extrabold font-acme dark:text-white self-center">
Welcome back 👋
</Text>

<LoginForm />

</SafeAreaView> */
}

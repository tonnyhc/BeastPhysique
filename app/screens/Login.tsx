import React from "react";
import { SafeAreaView, Text, StyleSheet, View } from "react-native";
import LoginForm from "../components/LoginForm";
import Section from "../components/common/Section";
import { colors, lightColors } from "../assets/colors";

const Login: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Section>
        <View style={styles.section}>
          <Text style={styles.welcomeText}>Welcome back 👋</Text>

          <LoginForm />
        </View>
      </Section>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    
  },
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
    color: lightColors.primaryText
  },
});

export default Login;
{
  /* <SafeAreaView className="flex-1 px-3 justify-around font-acme">
<Text className="text-[32px] font-extrabold font-acme dark:text-white self-center">
Welcome back 👋
</Text>

<LoginForm />

</SafeAreaView> */
}

import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Screen from "../../components/common/Screen";
import SubmitButton from "../../components/common/SubmitButton";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../../Stacks/AuthStack";
import { useTheme } from "../../contexts/ThemeContext";
import LogoWithText from "../../components/common/LogoWithText";

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();
  const { theme, colors } = useTheme();

  const darkImage = require("../../../assets/splash-black.png");
  const whiteImage = require("../../../assets/splash.png");
  const styles = StyleSheet.create({
    text: {
      fontSize: 20,
      alignSelf: "center",
      fontFamily: "ArimaRegular",
      color: colors.primaryText
    },
    row: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    actionBtns: {
      gap: 18,
      marginTop: 30,
    },
    helperText:{
        fontSize: 15,
        color: colors.helperText,
        fontFamily: "RobotoRegular"
    }
  });
  return (
    <Screen>
      <View style={{ flex: 3.5 }}>
        <LogoWithText width={450} height={522}/>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.text}>Become the best version of yourself</Text>
        <View style={styles.actionBtns}>
          <SubmitButton
            text="JOIN US"
            onPress={() => navigation.navigate("Register")}
          />
          <View style={styles.row}>
            <Text style={styles.helperText}>Already have an account?</Text>
            <SubmitButton
              type="text"
              text="LOG IN"
              onPress={() => navigation.navigate("Login")}
            />
          </View>
        </View>
      </View>
    </Screen>
  );
};

export default WelcomeScreen;

import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Screen from "../../components/common/Screen";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../contexts/ThemeContext";
import SubmitButton from "../../components/common/SubmitButton";
import { useNavigation } from "@react-navigation/native";

const SuccessVerification: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    done: {
      width: 110,
      height: 110,
      backgroundColor: colors.submitBtn,
      borderRadius: 100,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: colors.submitBtn,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 30,
      shadowRadius: 15,
    },
    successText: {
      color: colors.submitBtn,
      fontSize: 30,
      marginTop: 30,
      fontWeight: "600",
    },
    helperMessage: {
      color: colors.helperText,
      fontSize: 18,
      textAlign: "center",
      marginTop: 20,
    },
  });

  return (
    <Screen>
      <View style={{ flex: 1, marginTop: 80 }}>
        <View style={{ alignItems: "center", marginBottom: 80 }}>
          <View style={styles.done}>
            <MaterialIcons name="done" size={80} color={colors.white} />
          </View>
          <Text style={styles.successText}>Verified</Text>
          <Text style={styles.helperMessage}>
            Your password have been reset successfully!
          </Text>
        </View>

        <SubmitButton
          text="Done"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </Screen>
  );
};

export default SuccessVerification;

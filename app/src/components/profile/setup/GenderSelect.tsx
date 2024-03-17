import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "../../../contexts/ThemeContext";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

interface GenderSelectProps {
  gender: "Man" | "Woman";
  onChange: (value: "Man" | "Woman") => void;
}

const GenderSelect: React.FC<GenderSelectProps> = ({ gender, onChange }) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    wrapper: {
      gap: 44,
      justifyContent: "center",
      alignItems: "center",
    },
    circle: {
      width: 140,
      height: 140,
      backgroundColor: colors.helperText,
      borderRadius: 100,
      justifyContent: "center",
      alignItems: "center",
      gap: 12,
    },
    selectedCircle: {
      backgroundColor: colors.button,
    },
    text: {
      fontFamily: "RobotoMedium",
      fontSize: 15,
      color: colors.white,
    },
    selectedText: {
      color: colors.white,
    },
  });

  return (
    <View style={styles.wrapper}>
      <TouchableWithoutFeedback
        onPress={() => onChange("Man")}
        style={[styles.circle, gender === "Man" ? styles.selectedCircle : null]}
      >
        <MaterialCommunityIcons
          name="gender-male"
          size={48}
          color={colors.white}
        />
        <Text
          style={[styles.text, gender === "Man" ? styles.selectedText : null]}
        >
          Male
        </Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => onChange("Woman")}
        style={[
          styles.circle,
          gender === "Woman" ? styles.selectedCircle : null,
        ]}
      >
        <MaterialCommunityIcons
          name="gender-female"
          size={48}
          color={colors.white}
        />
        <Text
          style={[styles.text, gender === "Woman" ? styles.selectedText : null]}
        >
          Female
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default GenderSelect;

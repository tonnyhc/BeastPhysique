import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "../../contexts/ThemeContext";

interface BackButtonProps {
    onPress: () => void
}

const BackButton: React.FC<BackButtonProps> = ({onPress}) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    button: {
      borderWidth: 2,
      borderRadius: 100,
      borderColor: colors.secondaryText,
      width: 36,
      height: 36,
      justifyContent: "center",
      alignItems: "center",
    },
  });
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <AntDesign name="arrowleft" size={18} color={colors.secondaryText} />
    </TouchableOpacity>
  );
};

export default BackButton;

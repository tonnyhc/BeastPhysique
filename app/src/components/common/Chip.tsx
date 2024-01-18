import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { TouchableOpacity } from "react-native-gesture-handler";

interface ChipProps {
  text: string;
  isActive: boolean;
  onPress: () => void;
}

const Chip: React.FC<ChipProps> = ({ text, isActive, onPress }) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    chip: {
      paddingHorizontal: 16,
      height: 32,
      borderRadius: 8,
      borderWidth: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: isActive ? 'black' : colors.inputBg,
      borderColor: colors.helperText,
    },
    text: {
      color: isActive ? "#fff" : colors.primaryText,
      textAlign: "center",
    },
  });
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.chip}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Chip;

import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { TouchableOpacity } from "react-native-gesture-handler";

interface CircleSelectProps {
  isSelected: boolean;
  onPress: () => void;
}

const CircleSelect: React.FC<CircleSelectProps> = ({ isSelected, onPress }) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    circle: {
      borderRadius: 100,
      borderWidth: 0.5,
      borderColor: colors.helperText,
      width: 24,
      height: 24,
      justifyContent: "center",
      alignItems: "center",
    },
    innerCircle: {
      backgroundColor: isSelected ? colors.submitBtn : "transparent",
      width: 17,
      height: 17,
      borderRadius: 100,
    },
  });
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.circle}>
        <View style={styles.innerCircle}></View>
      </View>
    </TouchableOpacity>
  );
};

export default CircleSelect;

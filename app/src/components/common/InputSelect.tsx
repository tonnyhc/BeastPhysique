import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import ChevronDown from "../../icons/ChevronDown";
import { TouchableOpacity } from "react-native-gesture-handler";

interface InputSelectProps {
  label: string;
  value: string;
  isDate: boolean;
}

const InputSelect: React.FC<InputSelectProps> = ({ label, value }) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    wrapper: {
      borderWidth: 2,
      borderColor: colors.helperText,
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row",
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 4,
    },
    text: {
      color: colors.helperText,
      fontSize: 16,
    },
    selectWrapper: {
      paddingVertical: 10,
      paddingHorizontal: 8,
      backgroundColor: colors.buttonDisabled,
      borderRadius: 5,
      width: 64,
    },
    rightWrapper: {
      flexDirection: "row",
      gap: 12,
      alignItems: "center",
    },
    selectText: {
      fontSize: 14,
      color: "#021C3D",
    },
  });

  return (
    <>
      <TouchableOpacity style={styles.wrapper}>
        <Text style={styles.text}>{label}</Text>
        <View style={styles.rightWrapper}>
          <View style={styles.selectWrapper}>
            <Text style={styles.selectText}>
              {value !== "" && value ? value : "Select"}
            </Text>
          </View>
          <ChevronDown size={24} color={colors.primaryText} />
        </View>
      </TouchableOpacity>
    </>
  );
};

export default InputSelect;

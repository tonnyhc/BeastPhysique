import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "../../../contexts/ThemeContext";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import CloseIcon from "../../../icons/CloseIcon";

interface SelectMuscleGroupChipProps {
  name: string;
  remove: () => void
}

const SelectMuscleGroupChip: React.FC<SelectMuscleGroupChipProps> = ({
  name,
  remove
}) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    muscleGroupChip: {
      paddingVertical: 8,
      paddingHorizontal: 14,
      backgroundColor: colors.helperText,
      borderRadius: 40,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      gap: 4
    },
    muscleGroupChipText: {
      fontFamily: "RobotoRegular",
      fontSize: 18,
      color: colors.white,
    },

  });

  return (
    <View style={styles.muscleGroupChip}>
      <Text style={styles.muscleGroupChipText}>{name}</Text>
      <TouchableWithoutFeedback onPress={() => remove(name)}>
        <CloseIcon size={18} color={colors.white} />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default SelectMuscleGroupChip;

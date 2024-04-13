import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import Button from "../common/Button";
import FAB from "../common/FAB";
import InfoIcon from "../../icons/InfoIcon";
import { Workout } from "../../ts/types";
import TickIcon from "../../icons/TickIcon";

interface WorkoutSessionSearchCardProps {
  workout: Workout;
  selectWorkout: (workout: Workout) => void;
  isSelected: boolean;
}

const WorkoutSessionSearchCard: React.FC<WorkoutSessionSearchCardProps> = ({
  workout,
  selectWorkout,
  isSelected,
}) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    card: {
      backgroundColor: isSelected ? colors.button : "transparent",
      borderRadius: 12,
      borderWidth: 2,
      borderColor: colors.helperText,
      padding: 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
    },
    content: {
      gap: 8,
    },
    title: {
      color: isSelected ? colors.white : colors.primaryText,
      fontFamily: "RobotoMedium",
      fontSize: 20,
    },
    subtitle: {
      fontFamily: "RobotoRegular",
      color: colors.helperText,
      fontSize: 17,
    },
  });

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => selectWorkout(workout)}
    >
      <View style={styles.content}>
        <Text style={styles.title}>{workout.name}</Text>
        <Text style={styles.subtitle}>{workout.total_exercises} Exercises</Text>
        <Text style={styles.subtitle}>{workout.total_sets} Total Sets</Text>
      </View>

      {isSelected ? (
        <TickIcon size={24} color={colors.white} />
      ) : (
        <Button
          type="text"
          onPress={() => {}}
          icon={
            <InfoIcon
              size={24}
              color={isSelected ? colors.white : colors.primaryText}
            />
          }
        />
      )}
    </TouchableOpacity>
  );
};

export default WorkoutSessionSearchCard;

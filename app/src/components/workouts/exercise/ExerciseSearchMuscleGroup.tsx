import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import ChevronDown from "../../../icons/ChevronDown";
import { useTheme } from "../../../contexts/ThemeContext";
import ChevronUp from "../../../icons/ChevronUp";
import { MuscleGroupWithExercises } from "../../../ts/types";
import ExerciseSearchCard from "./ExerciseSearchCard";

interface ExerciseSearchMuscleGroupProps {
  muscleGroupData: MuscleGroupWithExercises;
  onSelectExercise: (exercise: any) => void;
  selectedExercises: { id: number; name: string }[];
}

const ExerciseSearchMuscleGroup: React.FC<ExerciseSearchMuscleGroupProps> = ({
  muscleGroupData,
  onSelectExercise,
  selectedExercises,
}) => {
  const { colors } = useTheme();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const styles = StyleSheet.create({
    nameArrowWrapper: {
      flexDirection: "row",
      justifyContent: "space-between",
      flex: 1,
      alignItems: "center",
    },
    muscleName: {
      fontSize: 20,
      fontFamily: "RobotoRegular",
      color: colors.helperText,
    },
    exercisesWrapper: {
      gap: 14,
    },
  });

  return (
    <>
      <TouchableOpacity
        id="muscle-group"
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <View style={{ flex: 0.5 }} />
        <View style={styles.nameArrowWrapper}>
          <Text style={styles.muscleName}>{muscleGroupData.name}</Text>
          {!isExpanded ? (
            <ChevronDown size={26} color={colors.helperText} />
          ) : (
            <ChevronUp size={26} color={colors.helperText} />
          )}
        </View>
      </TouchableOpacity>
      {isExpanded ? (
        <View style={styles.exercisesWrapper}>
          {muscleGroupData.exercises.map((exercise) => (
            <ExerciseSearchCard
              isSelected={selectedExercises.includes(exercise)}
              exercise={exercise}
              onSelectExercise={onSelectExercise}
              exerciseOrder={selectedExercises.indexOf(exercise) + 1}
            />
          ))}
        </View>
      ) : null}
    </>
  );
};

export default ExerciseSearchMuscleGroup;

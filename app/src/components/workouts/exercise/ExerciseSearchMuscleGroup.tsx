import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import ChevronDown from "../../../icons/ChevronDown";
import { useTheme } from "../../../contexts/ThemeContext";
import ChevronUp from "../../../icons/ChevronUp";
import { MuscleGroupWithExercises } from "../../../ts/types";

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
    exercise: {
      flexDirection: "row",
      gap: 20,
      alignItems: "center",
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
            <TouchableOpacity
              key={exercise.id}
              onPress={() => onSelectExercise(exercise)}
              style={styles.exercise}
            >
              <View
                style={{
                  height: 36,
                  width: 36,
                  borderRadius: 100,
                  backgroundColor: selectedExercises.includes(exercise)
                    ? colors.button
                    : colors.helperText,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: "RobotoRegular",
                    color: colors.white,
                  }}
                >
                  {!selectedExercises.includes(exercise)
                    ? `${exercise.name[0]}`
                    : selectedExercises.indexOf(exercise) + 1}
                </Text>
              </View>

              <Text
                style={{
                  fontFamily: "RobotoRegular",
                  fontSize: 20,
                }}
              >
                {exercise.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : null}
    </>
  );
};

export default ExerciseSearchMuscleGroup;

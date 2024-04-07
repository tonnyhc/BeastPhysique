import { View, Text, StyleSheet, Image } from "react-native";

import { ExerciseFromSearch } from "../../../ts/types";
import { useTheme } from "../../../contexts/ThemeContext";
import { TouchableOpacity } from "react-native-gesture-handler";

interface ExerciseSearchCardProps {
  exercise: ExerciseFromSearch;
  onSelectExercise: (exercise: ExerciseFromSearch) => void;
  isSelected: boolean;
  exerciseOrder: number;
}

const ExerciseSearchCard: React.FC<ExerciseSearchCardProps> = ({
  exercise,
  onSelectExercise,
  isSelected,
  exerciseOrder,
}) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    exercise: {
      flexDirection: "row",
      gap: 20,
      alignItems: "center",
    },
    exerciseTitleCircle: {
      height: 36,
      width: 36,
      borderRadius: 100,
      backgroundColor: isSelected ? colors.button : colors.helperText,
      justifyContent: "center",
      alignItems: "center",
    },
    exerciseTitleCircleText: {
      fontSize: 20,
      fontFamily: "RobotoRegular",
      color: colors.white,
    },
    exerciseName: {
      fontFamily: "RobotoRegular",
      fontSize: 20,
    },
  });
  return (
    <TouchableOpacity
      key={exercise.id}
      onPress={() => onSelectExercise(exercise)}
      style={styles.exercise}
    >
      <View style={styles.exerciseTitleCircle}>
        <Text style={styles.exerciseTitleCircleText}>
          {isSelected ? exerciseOrder : `${exercise.name[0]}`}
        </Text>
      </View>

      <Text style={styles.exerciseName}>{exercise.name}</Text>
    </TouchableOpacity>
  );
};

export default ExerciseSearchCard;

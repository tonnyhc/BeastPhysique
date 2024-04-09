import { View, Text, StyleSheet, Image } from "react-native";

import { ExerciseFromSearch } from "../../../ts/types";
import { useTheme } from "../../../contexts/ThemeContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import InfoIcon from "../../../icons/InfoIcon";
import Button from "../../common/Button";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { WorkoutsStackParamList } from "../../../Stacks/WorkoutsStack";

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
  const navigation =
    useNavigation<StackNavigationProp<WorkoutsStackParamList>>();
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    exercise: {
      flexDirection: "row",
      gap: 20,
      alignItems: "center",
      // flex: 1,
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
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
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
      <View style={{ alignSelf: "flex-end" }}>
        <Button
          buttonStyles={{
            paddingVertical: 0,
          }}
          type="text"
          icon={<InfoIcon size={24} color={colors.helperText} />}
          onPress={() =>
            navigation.navigate("ExerciseDetails", {
              exerciseId: exercise.id,
            })
          }
        />
      </View>
    </View>
  );
};

export default ExerciseSearchCard;

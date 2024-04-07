import { ScrollView, View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Screen from "../../components/common/Screen";
import TestInput from "../../components/common/TestInput";
import { useTheme } from "../../contexts/ThemeContext";
import Button from "../../components/common/Button";
import { Exercise, Workout } from "../../ts/types";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CreateWorkoutStackParamsList } from "../../Stacks/CreateWorkoutStack";
import { useCreateWorkoutContext } from "../../contexts/CreateWorkoutContext";
import TestExerciseCreationCard from "../../components/workouts/exercise/TextExerciseCreationCard";

const CreateWorkoutScreen: React.FC = () => {
  const navigation =
    useNavigation<StackNavigationProp<CreateWorkoutStackParamsList>>();
  const { workout, changeWorkoutName } = useCreateWorkoutContext();
  const { colors } = useTheme();

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ gap: 35 }}>
        <TestInput
          leftIcon={
            <MaterialCommunityIcons
              name="strategy"
              size={18}
              color={colors.iconColor}
            />
          }
          onChange={(value: string) => changeWorkoutName(value)}
          value={workout.name}
          placeholder="Workout name"
        />
        <View>
          <View>
            {workout?.exercises.map((exercise: Exercise, index: number) => (
              <TestExerciseCreationCard
                key={index}
                exerciseIndex={index}
                exercise={exercise}
              />
            ))}
          </View>
        </View>
        <Button
          text="Add Exercises"
          onPress={() => navigation.navigate("ExerciseSearch")}
        />
      </ScrollView>
    </Screen>
  );
};

export default CreateWorkoutScreen;

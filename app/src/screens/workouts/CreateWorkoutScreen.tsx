import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import Screen from "../../components/common/Screen";
import TestInput from "../../components/common/TestInput";
import { useTheme } from "../../contexts/ThemeContext";
import Button from "../../components/common/Button";
import { Exercise, ExerciseSession, Workout } from "../../ts/types";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CreateWorkoutStackParamsList } from "../../Stacks/CreateWorkoutStack";
import { useCreateWorkoutContext } from "../../contexts/CreateWorkoutContext";
import ExerciseCreationCard from "../../components/workouts/exercise/exercise_session/ExerciseCreationCard";
import BoardIcon from "../../icons/BoardIcon";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const CreateWorkoutScreen: React.FC = () => {
  const navigation =
    useNavigation<StackNavigationProp<CreateWorkoutStackParamsList>>();
  const { workout, changeWorkoutName } = useCreateWorkoutContext();
  const { colors } = useTheme();
  return (
    <Screen>
      <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        style={{ flex: 1 }}
        contentContainerStyle={{ gap: 35, flexGrow: 1, paddingBottom: 250 }}
      >
        <TestInput
          leftIcon={<BoardIcon size={24} color={colors.helperText} />}
          onChange={(value: string) => changeWorkoutName(value)}
          value={workout.name}
          placeholder="Workout name"
        />

        <View>
          <View>
            {workout?.exercises.map(
              (exercise: ExerciseSession, index: number) => (
                <ExerciseCreationCard
                
                  key={exercise.id}
                  exerciseIndex={index}
                  exercise={exercise}
                />
              )
            )}
          </View>
        </View>
        <Button
          text="Add Exercises"
          onPress={() => navigation.navigate("ExerciseSearch")}
        />
      </KeyboardAwareScrollView>
    </Screen>
  );
};

export default CreateWorkoutScreen;

import { StyleSheet, View, ScrollView } from "react-native";
import React from "react";
import Screen from "../../components/common/Screen";
import ReusableInput from "../../components/common/ReusableInput";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useCustomWorkoutPlan } from "../../contexts/CustomWorkoutPlanContext";
import { useTheme } from "../../contexts/ThemeContext";
import Button from "../../components/common/Button";
import { StackNavigationProp } from "@react-navigation/stack";
import { WorkoutsStackParamList } from "../../Stacks/WorkoutsStack";
import { Exercise } from "../../ts/types";
import ExerciseCreationCard from "../../components/workouts/exercise/ExerciseCreationCard";

interface CreateCustomWorkoutProps {
  navigation: StackNavigationProp<WorkoutsStackParamList>;
  route: { params: { workoutIndex: number } };
}

const CreateCustomWorkout: React.FC<CreateCustomWorkoutProps> = ({
  navigation,
  route,
}) => {
  const { colors } = useTheme();
  const { workoutPlan, dispatch } = useCustomWorkoutPlan();

  const workoutIndex = route.params.workoutIndex;

  const currentWorkout = workoutPlan.workouts[workoutIndex];
  return (
    <Screen>
      <ScrollView contentContainerStyle={{ gap: 35 }}>
        <ReusableInput
          leftIcon={
            <MaterialCommunityIcons
              name="strategy"
              size={18}
              color={colors.iconColor}
            />
          }
          onChange={(value: string) =>
            dispatch({
              type: "changeWorkoutName",
              payload: {
                index: workoutIndex,
                name: value,
              },
            })
          }
          value={currentWorkout.name}
          //   value=""
          placeholder="Workout name"
        />
        <View>
          <View>
            {currentWorkout?.exercises.map(
              (exercise: Exercise, index: number) => (
                <ExerciseCreationCard
                  workoutIndex={workoutIndex as number}
                  exerciseIndex={index}
                  exercise={exercise}
                />
              )
            )}
          </View>
        </View>
        <Button
          text="Add Exercises"
          onPress={() =>
            navigation.navigate("ExerciseSearchModal", {
              workoutIndex: workoutIndex as number,
            })
          }
        />
      </ScrollView>
    </Screen>
  );
};

export default CreateCustomWorkout;

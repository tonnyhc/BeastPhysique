import { View, Text } from "react-native";
import React from "react";
import Screen from "../../components/common/Screen";
import ReusableInput from "../../components/common/ReusableInput";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../contexts/ThemeContext";
import SubmitButton from "../../components/common/SubmitButton";

import { AntDesign } from "@expo/vector-icons";
import { useCustomWorkoutPlan } from "../../contexts/CustomWorkoutPlanContext";
import ExerciseCreationCard from "../../components/workouts/ExerciseCreationCard";
import { FlatList } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

interface WorkoutCreationCardProps {
  route: any
}

const WorkoutCreationCard: React.FC<WorkoutCreationCardProps> = ({ route }) => {
  const { colors } = useTheme();
  const { dispatch } = useCustomWorkoutPlan();
  const { workout, workoutIndex } = route.params;
  return (
    <Screen>
      <View>
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
                name: value
              },
            })
          }
          value={workout.workoutName}
          placeholder="Workout name"
        />
        <FlatList
          style={{ marginTop: 14 }}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          data={workout.exercises}
          renderItem={() => <ExerciseCreationCard />}
        />

        <SubmitButton
          leftIcon={<AntDesign name="plus" size={16} color={colors.white} />}
          buttonStyles={{ alignSelf: "center", marginTop: 39 }}
          text="Exercise"
          onPress={() =>
            dispatch({ type: "addExerciseToWorkout", payload: workoutIndex })
          }
        />
      </View>
    </Screen>
  );
};

const CreateWorkoutsForPlan: React.FC = () => {
  const { workoutPlan, dispatch } = useCustomWorkoutPlan();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {workoutPlan.workouts.map((workout, index) => (
        <Stack.Screen
          key={String(index)}
          name={String(index)}
          component={WorkoutCreationCard}
          initialParams={{ workout, workoutIndex: index }}
        />
      ))}
    </Stack.Navigator>
  );
};

export default CreateWorkoutsForPlan;

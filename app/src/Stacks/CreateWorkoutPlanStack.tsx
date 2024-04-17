import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import TestCreateCustomWorkoutPlan from "../screens/workout-plans/TestCreateCustomWorkoutPlan";
import StackScreenHeader from "../components/common/StackScreenHeader";
import WorkoutSearch from "../screens/workouts/WorkoutSearch";
import Button from "../components/common/Button";
import { useCreateWorkoutPlanContext } from "../contexts/TestCreateWorkoutPlanContext";
import { useNavigation } from "@react-navigation/native";
import { WorkoutsStackParamList } from "./WorkoutsStack";
import { Workout } from "../ts/types";
import CloseButton from "../components/common/CloseButton";
import ChevronLeft from "../icons/ChevronLeft";
import CloseIcon from "../icons/CloseIcon";
import { useTheme } from "../contexts/ThemeContext";

export type CreateWorkoutPlanParamsList = {
  WorkoutPlan: undefined;
  WorkoutSearch: undefined;
};

const CreateWorkoutPlanStack =
  createStackNavigator<CreateWorkoutPlanParamsList>();

const CreateWorkoutPlanStackScreen: React.FC = () => {
  const navigation =
    useNavigation<StackNavigationProp<WorkoutsStackParamList>>();
  const { addWorkouts } = useCreateWorkoutPlanContext();
  const { colors } = useTheme();
  return (
    <CreateWorkoutPlanStack.Navigator>
      <CreateWorkoutPlanStack.Screen
        name="WorkoutPlan"
        options={({ navigation }) => ({
          header: () => (
            <StackScreenHeader
              leftButton={<CloseIcon size={24} color={colors.primaryText} />}
              leftButtonPress={() => navigation.replace("WorkoutPlans")}
              label="Create Workout Plan"
            />
          ),
        })}
        component={TestCreateCustomWorkoutPlan}
      />
      <CreateWorkoutPlanStack.Screen
        name="WorkoutSearch"
        options={() => ({
          header: () => (
            <StackScreenHeader
              label="Search workout"
              rightButton={
                <Button
                  type="text"
                  text="Create"
                  onPress={() =>
                    navigation.navigate("CreateCustomWorkout", {
                      callbackFn: (workout: Workout[]) => addWorkouts(workout),
                    })
                  }
                />
              }
            />
          ),
        })}
        component={WorkoutSearch}
      />
    </CreateWorkoutPlanStack.Navigator>
  );
};

export default CreateWorkoutPlanStackScreen;

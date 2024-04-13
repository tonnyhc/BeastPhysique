import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TestCreateCustomWorkoutPlan from "../screens/workout-plans/TestCreateCustomWorkoutPlan";
import StackScreenHeader from "../components/common/StackScreenHeader";
import WorkoutSearch from "../screens/workouts/WorkoutSearch";
import Button from "../components/common/Button";
import CreateWorkoutPlanProvider from "../contexts/TestCreateWorkoutPlanContext";

export type CreateWorkoutPlanParamsList = {
  WorkoutPlan: undefined;
  WorkoutSearch: undefined;
};

const CreateWorkoutPlanStack =
  createStackNavigator<CreateWorkoutPlanParamsList>();

const CreateWorkoutPlanStackScreen: React.FC = () => {
  return (
    <CreateWorkoutPlanProvider>
      <CreateWorkoutPlanStack.Navigator>
        <CreateWorkoutPlanStack.Screen
          name="WorkoutPlan"
          options={({ navigation }) => ({
            header: () => <StackScreenHeader label="Create Workout Plan" />,
          })}
          component={TestCreateCustomWorkoutPlan}
        />
        <CreateWorkoutPlanStack.Screen
          name="WorkoutSearch"
          options={({ navigation }) => ({
            header: () => (
              <StackScreenHeader
                label="Search workout"
                rightButton={
                  <Button
                    type="text"
                    text="Create"
                    onPress={() => navigation.navigate("CreateCustomWorkout")}
                  />
                }
              />
            ),
          })}
          component={WorkoutSearch}
        />
      </CreateWorkoutPlanStack.Navigator>
    </CreateWorkoutPlanProvider>
  );
};

export default CreateWorkoutPlanStackScreen;

const styles = StyleSheet.create({});

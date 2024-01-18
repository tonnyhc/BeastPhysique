import React from "react";

import { AntDesign } from "@expo/vector-icons";
import SubmitButton from "../../components/common/SubmitButton";
import { FontAwesome } from "@expo/vector-icons";

import { useCustomWorkoutPlan } from "../../contexts/CustomWorkoutPlanContext";
import { createStackNavigator } from "@react-navigation/stack";
import WorkoutCreationCard from "./WorkoutCreationCard";
import { useTheme } from "../../contexts/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";

const Stack = createStackNavigator();

const CreateWorkoutsForPlan: React.FC = () => {
  const { workoutPlan, dispatch, createWorkoutPlan } = useCustomWorkoutPlan();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const addWorkoutAndNavigateToIt = async (currentIndex: number) => {
    dispatch({ type: "addWorkout" });
  };

  const renderHeaderRight = (currentWorkoutIndex: number) => {
    if (
      workoutPlan.workouts.length <= 1 ||
      workoutPlan.workouts.length <= currentWorkoutIndex + 1
    ) {
      return (
        <View style={{ flexDirection: "row", gap: 6 }}>
          <SubmitButton onPress={createWorkoutPlan} type="fill" text="Submit" />
          <SubmitButton
            type="text"
            text="Workout"
            onPress={() => addWorkoutAndNavigateToIt(currentWorkoutIndex)}
            leftIcon={<AntDesign name="plus" size={12} color={colors.submitBtn} />}
          />
        </View>
      );
    }
    if (
      workoutPlan.workouts.length > 1 &&
      workoutPlan.workouts.length > currentWorkoutIndex
    ) {
      return (
        <SubmitButton
          text=""
          buttonStyles={{
            paddingLeft: 0,
            paddingRight: 0,
            gap: 0,
            width: 30,
            height: 30,
          }}
          onPress={() =>
            navigation.navigate(`Workout${currentWorkoutIndex + 1}`)
          }
          leftIcon={
            <FontAwesome name="chevron-right" size={12} color={colors.white} />
          }
        />
      );
    }
  };

  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      {workoutPlan.workouts.map((workout, index) => (
        <Stack.Screen
          options={({ route, navigation }) => ({
            title: `Workout ${index + 1}`,
            headerShadowVisibl: false,
            headerStyle: {
              borderWidth: 0,
              elevation: 0,
              shadowOpacity: 0,
            },
            headerRight: () => renderHeaderRight(index),
            headerRightContainerStyle: { paddingRight: 12 },
          })}
          key={String(index)}
          name={`Workout${String(index)}`}
          component={WorkoutCreationCard}
          initialParams={{ workout, workoutIndex: index }}
        />
      ))}
    </Stack.Navigator>
  );
};

export default CreateWorkoutsForPlan;

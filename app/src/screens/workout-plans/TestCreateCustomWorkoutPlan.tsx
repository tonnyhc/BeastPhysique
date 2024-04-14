import { View, Text } from "react-native";
import React from "react";
import Screen from "../../components/common/Screen";

import { useTheme } from "../../contexts/ThemeContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { ScrollView } from "react-native-gesture-handler";
import Button from "../../components/common/Button";
import TestInput from "../../components/common/TestInput";
import BoardIcon from "../../icons/BoardIcon";
import { useCreateWorkoutPlanContext } from "../../contexts/TestCreateWorkoutPlanContext";
import { CreateWorkoutPlanParamsList } from "../../Stacks/CreateWorkoutPlanStack";
import CreateCustomWorkoutPlanWorkoutCard from "../../components/workout_plan/CreateCustomWorkoutPlanWorkoutCard";

interface CreateCustomWorkoutPlanProps {
  navigation: StackNavigationProp<CreateWorkoutPlanParamsList>;
}

const TestCreateCustomWorkoutPlan: React.FC<CreateCustomWorkoutPlanProps> = ({
  navigation,
}) => {
  const { colors } = useTheme();
  const { workoutPlan, changePlanName } = useCreateWorkoutPlanContext();
  // const { mutate, isPending, error } = useMutation({
  //   mutationFn: () => createWorkoutPlan(),
  //   onSuccess: () => navigation.navigate("WorkoutPlans"),
  // });
  return (
    <Screen>
      <ScrollView
        style={{ flexGrow: 1, paddingTop: 20 }}
        contentContainerStyle={{ paddingHorizontal: 4 }}
      >
        {/* Workout plan name */}
        <View>
          <TestInput
            value={workoutPlan.planName}
            onChange={(value: string) => changePlanName(value)}
            placeholder="Workout plan name"
            leftIcon={<BoardIcon size={24} color={colors.helperText} />}
          />
        </View>

        <Text
          style={{
            textAlign: "center",
            marginTop: 15,
            fontFamily: "RobotoMedium",
            color: colors.error,
          }}
        >
          {/* {error} */}
        </Text>
        <View
          style={{
            gap: 10,
            marginTop: workoutPlan.workouts.length > 0 ? 30 : 0,
          }}
        >
          {workoutPlan.workouts.map((workout, index) => (
            <CreateCustomWorkoutPlanWorkoutCard
              workoutIndex={index}
              workout={workout}
              key={`workout.id+${index}`}
            />
          ))}
        </View>

        <Button
          buttonStyles={{ alignSelf: "center", marginTop: 35 }}
          text="Add workout"
          type="text"
          onPress={() => navigation.navigate("WorkoutSearch")}
        />
      </ScrollView>
      <View style={{ position: "absolute", bottom: 30, left: 100, right: 100 }}>
        <Button text="Submit" onPress={() => {}} />
      </View>
    </Screen>
  );
};

export default TestCreateCustomWorkoutPlan;

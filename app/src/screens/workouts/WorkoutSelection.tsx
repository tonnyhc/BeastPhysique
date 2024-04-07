import { View, Text } from "react-native";
import React from "react";
import Screen from "../../components/common/Screen";
import ReusableInput from "../../components/common/ReusableInput";
import { useTheme } from "../../contexts/ThemeContext";
import SearchIcon from "../../icons/SearchIcon";
import { StackNavigationProp } from "@react-navigation/stack";
import { WorkoutsStackParamList } from "../../Stacks/WorkoutsStack";
import { useCustomWorkoutPlan } from "../../contexts/CustomWorkoutPlanContext";
import Button from "../../components/common/Button";

interface WorkoutSelectionProps {
  navigation: StackNavigationProp<WorkoutsStackParamList>;
}

const WorkoutSelection: React.FC<WorkoutSelectionProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const { workoutPlan, dispatch } = useCustomWorkoutPlan();
  const onCreateCustomWorkout = () => {
    dispatch({
      type: "addWorkout",
    });
    const workoutsLen = workoutPlan.workouts.length;
    const workoutIndex = workoutsLen;
    navigation.navigate("CreateCustomWorkout", {
      workoutIndex,
    });
  };

  return (
    <Screen>
      <View>
        <ReusableInput
          value=""
          onChange={() => {}}
          placeholder="Workout name"
          leftIcon={<SearchIcon size={24} color={colors.helperText} />}
        />
      </View>
      <View style={{ alignSelf: "center", marginTop: 20, gap: 10 }}>
        <Text
          style={{
            fontSize: 20,
            color: colors.helperText,
            alignSelf: "center",
          }}
        >
          or
        </Text>
        <View
          style={{
            height: 1,
            width: "auto",
            borderWidth: 0.5,
            borderColor: colors.helperText,
          }}
        />
          <View style={{ marginTop: 10 }}>
            <Button
              onPress={() => onCreateCustomWorkout()}
              type="outlined"
              text="Create a custom workout"
            />
        </View>
      </View>
    </Screen>
  );
};

export default WorkoutSelection;

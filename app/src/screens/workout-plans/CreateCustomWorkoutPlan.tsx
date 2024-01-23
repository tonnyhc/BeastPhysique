import { View, Text } from "react-native";
import React from "react";
import Screen from "../../components/common/Screen";
import ReusableInput from "../../components/common/ReusableInput";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../contexts/ThemeContext";
import SubmitButton from "../../components/common/SubmitButton";
import { useCustomWorkoutPlan } from "../../contexts/CustomWorkoutPlanContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { WorkoutsStackParamList } from "../../Stacks/WorkoutsStack";

interface CreateCustomWorkoutPlanProps {
  navigation: StackNavigationProp<WorkoutsStackParamList>;
}

const CreateCustomWorkoutPlan: React.FC<CreateCustomWorkoutPlanProps> = ({
  navigation,
}) => {
  const { colors } = useTheme();
  const { workoutPlan, dispatch } = useCustomWorkoutPlan();
  return (
    <Screen>
      <View style={{ flex: 1, marginTop: 150 }}>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 32,
              letterSpacing: 0.25,
              color: colors.primaryText,
            }}
          >
            Create workout plan
          </Text>
        </View>
        <View style={{ marginTop: 35 }}>
          <ReusableInput
            value={workoutPlan.planName}
            onChange={(value: string) =>
              dispatch({
                type: "changePlanName",
                payload: value,
              })
            }
            placeholder="Workout plan name"
            leftIcon={
              <MaterialCommunityIcons
                name="strategy"
                size={18}
                color={colors.iconColor}
              />
            }
          />
        </View>
        <View style={{ gap: 12 }}>
          <SubmitButton
            buttonStyles={{ alignSelf: "center", marginTop: 35 }}
            text="Select workouts"
            onPress={() => navigation.navigate("WorkoutSearch")}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 100,
            }}
          >
            <View
              style={{
                height: 0.5,
                flex: 1,
                backgroundColor: colors.helperText,
              }}
            ></View>
            <Text
              style={{
                alignSelf: "center",
                color: colors.helperText,
                fontSize: 16,
                marginHorizontal: 10,
              }}
            >
              Or
            </Text>
            <View
              style={{
                height: 0.5,
                flex: 1,
                backgroundColor: colors.helperText,
              }}
            ></View>
          </View>
          <SubmitButton
            buttonStyles={{
              alignSelf: "center",
            }}
            onPress={() => navigation.navigate("CreateWorkoutsForPlan")}
            type="outlined"
            text="Create custom workouts"
          />
        </View>
      </View>
    </Screen>
  );
};

export default CreateCustomWorkoutPlan;

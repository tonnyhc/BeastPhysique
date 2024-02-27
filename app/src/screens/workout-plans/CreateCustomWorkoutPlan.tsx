import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Screen from "../../components/common/Screen";
import ReusableInput from "../../components/common/ReusableInput";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../contexts/ThemeContext";
import SubmitButton from "../../components/common/Button";
import { useCustomWorkoutPlan } from "../../contexts/CustomWorkoutPlanContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { WorkoutsStackParamList } from "../../Stacks/WorkoutsStack";
import { ScrollView } from "react-native-gesture-handler";
import { Workout } from "../../ts/types";
import { useNavigation } from "@react-navigation/native";

interface CreateCustomWorkoutPlanProps {
  navigation: StackNavigationProp<WorkoutsStackParamList>;
}

interface CreateCustomWorkoutPlanWorkoutCardProps {
  workout: Workout;
  workoutIndex: number;
}

const CreateCustomWorkoutPlanWorkoutCard: React.FC<
  CreateCustomWorkoutPlanWorkoutCardProps
> = ({ workout, workoutIndex }) => {
  const navigation =
    useNavigation<StackNavigationProp<WorkoutsStackParamList>>();
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    card: {
      backgroundColor: colors.porcelain,
      borderRadius: 12,
      shadowColor: "#000000",
      shadowOffset: {
        width: -1,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 6,
      elevation: 2,
      paddingHorizontal: 12,
      gap: 10,
      borderWidth: 1,
      borderColor: colors.mercury,
    },
    workoutName: {
      fontSize: 22,
      fontFamily: "RobotoMedium",
    },
    exerciseNameWrapper: {
      flex: 1,
      paddingVertical: 10,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    exerciseName: {
      fontFamily: "RobotoMedium",
      fontSize: 18,
      color: colors.helperText,
    },
    exerciseSetsCount: {
      fontFamily: "RobotoMedium",
      fontSize: 16,
      color: colors.orangeText,
    },
  });
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("CreateCustomWorkout", {
        workoutIndex: workoutIndex,
      })}
      style={styles.card}
    >
      <Text style={styles.workoutName}>{workout.name}</Text>
      <View>
        {workout.exercises.length === 0 ? <Text>Add exercises</Text> : null}
        {workout.exercises.map((item, index) => (
          <View style={styles.exerciseNameWrapper}>
            <Text style={styles.exerciseName}>{item.name}</Text>
            <Text style={styles.exerciseSetsCount}>
              {item.sets?.length} sets
            </Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
};

const CreateCustomWorkoutPlan: React.FC<CreateCustomWorkoutPlanProps> = ({
  navigation,
}) => {
  const { colors } = useTheme();
  const { workoutPlan, dispatch } = useCustomWorkoutPlan();
  return (
    <Screen>
      <ScrollView
        style={{ flexGrow: 1 }}
        contentContainerStyle={{ paddingHorizontal: 4 }}
      >
        <View>
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
        <View style={{ gap: 10, marginTop: 30 }}>
          {workoutPlan.workouts.map((workout, index) => (
            <CreateCustomWorkoutPlanWorkoutCard
              workoutIndex={index}
              workout={workout}
            />
          ))}
        </View>
        <View style={{ gap: 12 }}>
          <SubmitButton
            buttonStyles={{ alignSelf: "center", marginTop: 35 }}
            text="Add workout"
            onPress={() => navigation.navigate("WorkoutSearch")}
          />
        </View>
      </ScrollView>
    </Screen>
  );
};

export default CreateCustomWorkoutPlan;

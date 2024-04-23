import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useState } from "react";
import Screen from "../../components/common/Screen";
import ReusableInput from "../../components/common/ReusableInput";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../contexts/ThemeContext";
import SubmitButton from "../../components/common/Button";
import { useCustomWorkoutPlan } from "../../contexts/CustomWorkoutPlanContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { WorkoutsStackParamList } from "../../Stacks/WorkoutsStack";
import {
  ScrollView,
  Swipeable,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { Workout } from "../../ts/types";
import { useNavigation } from "@react-navigation/native";
import Button from "../../components/common/Button";
import { useMutation } from "@tanstack/react-query";

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
  const { dispatch } = useCustomWorkoutPlan();

  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const styles = StyleSheet.create({
    card: {
      backgroundColor: colors.cardBackground,
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
      borderColor: colors.secondaryText,
      paddingVertical: 10,
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
      color: colors.button,
    },
  });
  const renderRightActions = () => {
    return (
      <TouchableOpacity
        style={{
          height: "100%",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
        onPress={() => setDeleteModal(true)}
      >
        <Animated.View
          style={{
            backgroundColor: colors.error,
            justifyContent: "center",
            height: "100%",
            flex: 1,
            alignItems: "center",
            marginBottom: 16,
            paddingHorizontal: 48,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: "RobotoRegular",
              color: colors.white,
            }}
          >
            Delete
          </Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Swipeable
        friction={1}
        renderRightActions={renderRightActions}
        overshootRight={true}
        onSwipeableWillOpen={() => setDeleteModal(true)}
      >
        <TouchableWithoutFeedback
          onPress={() =>
            navigation.navigate("CreateCustomWorkout", {
              workoutIndex: workoutIndex,
            })
          }
          style={styles.card}
        >
          <Text style={styles.workoutName}>
            {workout.name ? workout.name : `Workout ${workoutIndex + 1}`}
          </Text>
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
        </TouchableWithoutFeedback>
      </Swipeable>
    </>
  );
};

const CreateCustomWorkoutPlan: React.FC<CreateCustomWorkoutPlanProps> = ({
  navigation,
}) => {
  const { colors } = useTheme();
  const { workoutPlan, dispatch, createWorkoutPlan } = useCustomWorkoutPlan();
  const { mutate, isPending, error } = useMutation({
    mutationFn: () => createWorkoutPlan(),
    onSuccess: () => navigation.navigate("WorkoutPlans"),
  });
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

        <Text
          style={{
            textAlign: "center",
            marginTop: 15,
            fontFamily: "RobotoMedium",
            color: colors.error,
          }}
        >
          {error}
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
              key={index}
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
      <View style={{ position: "absolute", bottom: 30, left: 0, right: 0 }}>
        <Button text="Submit" onPress={() => mutate()} />
      </View>
    </Screen>
  );
};

export default CreateCustomWorkoutPlan;

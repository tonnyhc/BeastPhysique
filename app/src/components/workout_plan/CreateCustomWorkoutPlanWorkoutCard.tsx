import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Exercise, ExerciseSession, Workout } from "../../ts/types";
import { useTheme } from "../../contexts/ThemeContext";

import { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Animated,
  Text,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import ReusableModal from "../common/Modal";
import Button from "../common/Button";
import { Swipeable } from "react-native-gesture-handler";
import { useCreateWorkoutPlanContext } from "../../contexts/TestCreateWorkoutPlanContext";
import { WorkoutsStackParamList } from "../../Stacks/WorkoutsStack";
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
  const { deleteWorkout } = useCreateWorkoutPlanContext();

  const [deleteModal, setDeleteModal] = useState<boolean>(false);

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
      color: colors.orangeText,
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
      <ReusableModal
        closeFn={() => setDeleteModal(false)}
        visible={deleteModal}
        title="Delete Workout"
      >
        <Text
          style={{
            fontFamily: "RobotoRegular",
            textAlign: "center",
            color: colors.helperText,
            marginTop: 15,
          }}
        >
          Are you sure you want to delete{" "}
          {workout.name ? workout.name : "this workout"}.
        </Text>
        <View
          style={{
            flexDirection: "row",
            gap: 20,
            marginTop: 20,
            justifyContent: "center",
          }}
        >
          <Button onPress={() => deleteWorkout(workoutIndex)} text="Delete" />
          <Button
            onPress={() => setDeleteModal(false)}
            type="outlined"
            text="Cancel"
          />
        </View>
      </ReusableModal>
      <Swipeable
        friction={1}
        renderRightActions={renderRightActions}
        overshootRight={true}
        onSwipeableWillOpen={() => setDeleteModal(true)}
      >
        <TouchableWithoutFeedback
          onPress={() =>
            navigation.navigate("CreateCustomWorkout", { workoutIndex })
          }
        >
          <View style={styles.card}>
            <Text style={styles.workoutName}>
              {workout.name ? workout.name : `Workout ${workoutIndex + 1}`}
            </Text>
            <View>
              {workout.exercises.length === 0 ? (
                <Text>Add exercises</Text>
              ) : null}
              {workout.exercises.map((item: ExerciseSession, index: number) => (
                <View style={styles.exerciseNameWrapper}>
                  <Text style={styles.exerciseName}>{item.exercise.name}</Text>
                  <Text style={styles.exerciseSetsCount}>
                    {item.sets.length} sets
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Swipeable>
    </>
  );
};

export default CreateCustomWorkoutPlanWorkoutCard;

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import React from "react";

import useWorkoutService from "../../hooks/services/useWorkoutService";
import { ExerciseSession, Workout, WorkoutSession } from "../../ts/types";
import WorkoutDetailsExerciseCard from "./WorkoutDetailsExerciseCard";
import useRefreshControl from "../../hooks/useRefreshControl";
import Screen from "../../components/common/Screen";

interface WorkoutDetailsProps {
  route: { params: { workoutSessionId: number } };
}
const WorkoutDetails: React.FC<WorkoutDetailsProps> = ({ route }) => {
  const { workoutSessionDetails } = useWorkoutService();
  const workoutId = route.params.workoutSessionId;

  const { data, refetch, isLoading, isError } =
    workoutSessionDetails(workoutId);
  const { onRefresh, refreshing } = useRefreshControl({
    isLoading,
    refreshFn: refetch,
  });
  const workoutData = data as WorkoutSession;
  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
    },
    workoutName: {
      fontSize: 24,
      fontWeight: "500",
      alignSelf: "center",
      marginBottom: 10,
    },
    exercisesWrapper: {
      flexGrow: 1,
      backgroundColor: "#DCDCDC",
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      gap: 10,
      padding: 10,
    },
  });
  return (
    <Screen>

    <View style={styles.wrapper}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
      >
        <Text style={styles.workoutName}>{workoutData.name}</Text>
        <ScrollView style={styles.exercisesWrapper}>
          {workoutData.exercises.map((exercise, index) => (
            <WorkoutDetailsExerciseCard
              key={exercise.id}
              index={index}
              session={exercise}
            />
          ))}
        </ScrollView>
      </ScrollView>
    </View>
    </Screen>

  );
};

export default WorkoutDetails;

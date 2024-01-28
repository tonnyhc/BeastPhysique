import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";

import useWorkoutService from "../../hooks/useWorkoutService";
import { ExerciseSession, Workout, WorkoutSession } from "../../ts/types";
import WorkoutDetailsExerciseCard from "./WorkoutDetailsExerciseCard";

interface WorkoutDetailsProps {
  route: { params: { workoutSessionId: number } };
}
const WorkoutDetails: React.FC<WorkoutDetailsProps> = ({ route }) => {
  const { workoutSessionDetails } = useWorkoutService();
  const workoutId = route.params.workoutSessionId;
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

  const { data, isLoading, isError } = workoutSessionDetails(workoutId);
  const workoutData = data as WorkoutSession;
  console.log(workoutData);

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
  );
};

export default WorkoutDetails;

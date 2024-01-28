import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { Workout } from "../../ts/types";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { WorkoutsStackParamList } from "../../Stacks/WorkoutsStack";

interface WorkoutPlanDetailsWorkoutCardProps {
  workout: Workout;
}

const WorkoutPlanDetailsWorkoutCard: React.FC<
  WorkoutPlanDetailsWorkoutCardProps
> = ({ workout }) => {
    const navigation = useNavigation<StackNavigationProp<WorkoutsStackParamList>>()
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    card: {
      paddingVertical: 10,
      paddingHorizontal: 10,
      gap: 10,
      backgroundColor: "#cecece",
      borderRadius: 4,
    },
    cardHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    cardBody: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    cardTitle: {
      fontSize: 18,
      padding: 10,
      fontWeight: "500",
      fontStyle: "italic",
    },
    cardSubtitle: {
      fontSize: 16,
      fontWeight: "500",
      color: colors.helperText,
      fontStyle: "italic",
      padding: 10,
    },
    exercisesWrapper: {
      gap: 12,
    },
    exerciseName: {
      fontSize: 16,
      fontWeight: "500",
    },
    textSmall: {
      fontSize: 12,
      color: colors.helperText,
      fontWeight: "500",
      letterSpacing: 0.25,
    },
  });

  return (
    <TouchableOpacity onPress={() => navigation.push('WorkoutDetails', {workoutSessionId: workout.id})} style={styles.card}>
      {/* workout name and exc count */}
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{workout.name}</Text>
        <Text style={styles.cardSubtitle}>
          Exercises: <Text>{workout.exercises.length}</Text>
        </Text>
      </View>
      {/* exercises and total volumes wrapper */}
      <View style={styles.cardBody}>
        {/* exerciseWrapper */}
        <View style={styles.exercisesWrapper}>
          {/* ExerciseCard */}
          {workout.exercises.map((exercise, index) => (
            <View key={exercise.id}>
              <Text style={styles.exerciseName}>
                <Text>{index + 1}. </Text>
                <Text>{exercise.name}</Text>
              </Text>
            </View>
          ))}
        </View>
        {/* total volume wrapper */}
        <View>
          <View>
            <Text style={styles.textSmall}>
              Total sets: <Text>20</Text>
            </Text>
          </View>
          <View>
            <Text style={styles.textSmall}>
              Total weight volume: <Text>1000kg</Text>
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default WorkoutPlanDetailsWorkoutCard;

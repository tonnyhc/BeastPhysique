import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { Suspense, useDeferredValue, useState } from "react";
import Screen from "../../components/common/Screen";
import TestInput from "../../components/common/TestInput";
import SearchIcon from "../../icons/SearchIcon";
import { useTheme } from "../../contexts/ThemeContext";
import { useQuery } from "@tanstack/react-query";
import useWorkoutService from "../../hooks/services/useWorkoutService";
import { Workout } from "../../ts/types";
import WorkoutSessionSearchCard from "../../components/workouts/WorkoutSessionSearchCard";
import Button from "../../components/common/Button";
import { useCreateWorkoutPlanContext } from "../../contexts/TestCreateWorkoutPlanContext";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CreateWorkoutPlanParamsList } from "../../Stacks/CreateWorkoutPlanStack";

const WorkoutSearch: React.FC = () => {
  const { colors } = useTheme();
  const [search, setSearch] = useState<string>("");
  const [selectedWorkouts, setSelectedWorkouts] = useState<Workout[]>([]);
  const navigation =
    useNavigation<StackNavigationProp<CreateWorkoutPlanParamsList>>();
  const defferedSearch = useDeferredValue(search);
  const { searchWorkoutSession } = useWorkoutService();
  const { data, isLoading, error } = useQuery({
    queryFn: () => searchWorkoutSession(search),
    queryKey: [`search-workout-session-${defferedSearch}`],
    initialData: {
      workouts: [],
      workouts_by_user: [],
    },
  });

  const { addWorkouts } = useCreateWorkoutPlanContext();

  const selectWorkout = (workout: Workout) => {
    const workoutIds = selectedWorkouts.map((item) => item.id);
    if (workoutIds.includes(workout.id)) {
      const newWorkouts = selectedWorkouts.filter(
        (item) => item.id !== workout.id
      );
      setSelectedWorkouts(newWorkouts);
    } else {
      setSelectedWorkouts([...selectedWorkouts, workout]);
    }
  };
  const styles = StyleSheet.create({
    button: {
      position: "absolute",
      bottom: 30,
      left: 100,
      right: 100,
    },
  });

  return (
    <Screen closeKeyboardOnClick>
      {isLoading && <ActivityIndicator />}
      <TestInput
        value={search}
        onChange={(value: string) => setSearch(value)}
        placeholder="Workout name"
        leftIcon={<SearchIcon size={24} color={colors.helperText} />}
      />

      <Suspense fallback={<ActivityIndicator />}>
        <ScrollView
          contentContainerStyle={{ gap: 20 }}
          style={{ marginTop: 30 }}
        >
          {data.workouts.map((item: Workout) => (
            <>
              <WorkoutSessionSearchCard
                workout={item}
                selectWorkout={selectWorkout}
                isSelected={selectedWorkouts
                  .map((workout) => workout.id)
                  .includes(item.id)}
              />
            </>
          ))}
        </ScrollView>
      </Suspense>

      <View style={styles.button}>
        <Button
          text={`Select ${selectedWorkouts.length}`}
          onPress={() => {
            addWorkouts(selectedWorkouts);
            navigation.navigate("CreateWorkoutPlan");
          }}
        />
      </View>
    </Screen>
  );
};

export default WorkoutSearch;

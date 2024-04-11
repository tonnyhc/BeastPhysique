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

const WorkoutSearch: React.FC = () => {
  const { colors } = useTheme();
  const [search, setSearch] = useState<string>("");
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
  console.log(data["workouts"]);
  const styles = StyleSheet.create({
    button: {
      position: "absolute",
      bottom: 30,
      left: 100,
      right: 100,
    },
  });

  return (
    <Screen>
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
                name={item.name}
                total_sets_count={item.total_sets}
                exercises_count={item.exercises.length}
              />
              <WorkoutSessionSearchCard
                name={item.name}
                total_sets_count={item.total_sets}
                exercises_count={item.exercises.length}
              />
              <WorkoutSessionSearchCard
                name={item.name}
                total_sets_count={item.total_sets}
                exercises_count={item.exercises.length}
              />
            </>
          ))}
        </ScrollView>
      </Suspense>

      <View style={styles.button}>
        <Button text={`Select 0`} onPress={() => {}} />
      </View>
    </Screen>
  );
};

export default WorkoutSearch;

import { FlatList, RefreshControl } from "react-native";
import Screen from "../../components/common/Screen";

import WorkoutPlanCard from "../../components/workouts/WorkoutPlanCard";
import useFetchWorkoutPlans from "../../hooks/useFetchWorkoutPlans";
import { StackNavigationProp } from "@react-navigation/stack";
import { WorkoutsStackParamList } from "../../Stacks/WorkoutsStack";
import { useCallback, useEffect, useState } from "react";
import useRefreshControl from "../../hooks/useRefreshControl";

interface WorkoutsProps {
  navigation: StackNavigationProp<WorkoutsStackParamList>;
}

const Workouts: React.FC<WorkoutsProps> = ({ navigation }) => {
  // TODO: Add data type
  const { data, refetch, isLoading } = useFetchWorkoutPlans();
  // TODO: Add a skeleton

  const {refreshing, onRefresh} = useRefreshControl({refreshFn: refetch, isLoading: isLoading})

  return (
    <Screen>
      {/* Workout card */}

      <FlatList
        style={{ paddingTop: 15, paddingLeft: 5, paddingRight: 5, flex: 1 }}
        data={data}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item, index }) => (
          <WorkoutPlanCard key={index} navigation={navigation} plan={item} />
        )}
      />
    </Screen>
  );
};

export default Workouts;

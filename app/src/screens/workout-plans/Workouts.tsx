import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Screen from "../../components/common/Screen";
import { useQuery } from "@tanstack/react-query";
import { useWorkoutPlanServices } from "../../hooks/useWorkoutPlanServices";
import WorkoutPlanCard from "../../components/workouts/WorkoutPlanCard";

const Workouts: React.FC = () => {
  const { getWorkoutPlansByUser } = useWorkoutPlanServices();
  const { data, refetch, isLoading, isError, error } = useQuery({
    queryKey: ["workout-splits"],
    queryFn: getWorkoutPlansByUser,
  });
  // TODO: Add a skeleton 

  return (
    <Screen>
      {/* Workout card */}

      <FlatList
        style={{ paddingTop: 15, paddingLeft: 5, paddingRight: 5, flex: 1 }}
        data={data}
        renderItem={({item, index}) => (
          <WorkoutPlanCard plan={item}/>
        )}
      />
    </Screen>
  );
};

export default Workouts;

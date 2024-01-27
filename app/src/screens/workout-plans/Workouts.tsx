import { FlatList } from "react-native";
import Screen from "../../components/common/Screen";

import WorkoutPlanCard from "../../components/workouts/WorkoutPlanCard";
import useFetchWorkoutPlans from "../../hooks/useFetchWorkoutPlans";
import { StackNavigationProp } from "@react-navigation/stack";
import { WorkoutsStackParamList } from "../../Stacks/WorkoutsStack";

interface WorkoutsProps {
  navigation: StackNavigationProp<WorkoutsStackParamList>;
}

const Workouts: React.FC<WorkoutsProps> = ({ navigation }) => {
  // TODO: Add data type
  const { data } = useFetchWorkoutPlans();
  // TODO: Add a skeleton

  return (
    <Screen>
      {/* Workout card */}

      <FlatList
        style={{ paddingTop: 15, paddingLeft: 5, paddingRight: 5, flex: 1 }}
        data={data}
        renderItem={({ item, index }) => (
          <WorkoutPlanCard key={index} navigation={navigation} plan={item} />
        )}
      />
    </Screen>
  );
};

export default Workouts;

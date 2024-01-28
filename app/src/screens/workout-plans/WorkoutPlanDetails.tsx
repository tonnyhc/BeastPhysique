import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Screen from "../../components/common/Screen";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "../../contexts/ThemeContext";
import useFetchWorkoutPlanDetails from "../../hooks/useFetchWorkoutPlanDetails";
import { WorkoutPlan } from "../../ts/types";
import WorkoutPlanDetailsWorkoutCard from "./WorkoutPlanDetailsWorkoutCard";

interface WorkoutPlanDetailsProps {
  route: { params: { planId: string } };
}

const WorkoutPlanDetails: React.FC<WorkoutPlanDetailsProps> = ({ route }) => {
  const { colors } = useTheme();
  const planId = route.params.planId;
  const { data, isLoading, isError } = useFetchWorkoutPlanDetails(planId);
  const planData = data as WorkoutPlan;
  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      gap: 10,
    },
    heading: {
      alignSelf: "center",
      fontSize: 24,
      fontWeight: "600",
      fontStyle: "italic",
      color: colors.primaryText,
    },
    body: {},
    scrollView: {
      gap: 10,
    },
  });
  return (
    <Screen>
      <View style={styles.wrapper}>
        <Text style={styles.heading}>{planData?.name}</Text>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          style={styles.body}
        >
          {planData?.workouts.map((workout) => (
            <WorkoutPlanDetailsWorkoutCard workout={workout} />
          ))}
        </ScrollView>
      </View>
    </Screen>
  );
};

export default WorkoutPlanDetails;

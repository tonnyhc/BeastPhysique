import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { WorkoutPlan } from "../../ts/types";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StackNavigationProp } from "@react-navigation/stack";
import { WorkoutsStackParamList } from "../../Stacks/WorkoutsStack";

interface WorkoutPlanCardProps {
  plan: WorkoutPlan;
  navigation: StackNavigationProp<WorkoutsStackParamList>;
}

const WorkoutPlanCard: React.FC<WorkoutPlanCardProps> = ({
  plan,
  navigation,
}) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    cardWrapper: {
      paddingTop: 6,
      marginBottom: 12,
      height: 85,
      backgroundColor: colors.cardBg,
      borderRadius: 4,
      shadowColor: "#171a1f",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      justifyContent: "center",
      alignContent: "center",
    },
    contentWrapper: {
      paddingLeft: 50,
      paddingRight: 50,
    },
    heading: {
      fontSize: 18,
      fontFamily: "Acme",
      fontWeight: "700",
      color: colors.primaryText,
      marginBottom: 6,
    },
    dateRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      color: colors.primaryText,
      fontSize: 16,
    },
    creator: {
      alignSelf: "flex-end",
      fontSize: 12,
      fontWeight: "600",
      color: colors.secondaryText,
    },
  });
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("WorkoutPlanDetails", { planId: plan.id })
      }
      style={styles.cardWrapper}
    >
      <View style={styles.contentWrapper}>
        <Text style={styles.heading}>{plan.name}</Text>
        <View style={styles.dateRow}>
          <Text style={{ color: colors.primaryText }}>
            Workouts: {plan.total_workouts}
          </Text>
          <Text style={{ color: colors.primaryText }}>{plan.created_at}</Text>
        </View>
        <Text style={styles.creator}>{plan.created_by.full_name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default WorkoutPlanCard;

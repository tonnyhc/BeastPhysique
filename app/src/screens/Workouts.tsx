import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Screen from "../components/common/Screen";
import { useTheme } from "../contexts/ThemeContext";
import { useQuery } from "@tanstack/react-query";
import {
  getWorkoutPlansByUser,
  useWorkoutPlan,
} from "../api/services/workoutServices";

const Workouts: React.FC = () => {
  const { colors } = useTheme();
  const { getWorkoutPlansByUser } = useWorkoutPlan();
  const { data, refetch, isLoading, isError, error } = useQuery({
    queryKey: ["workout-splits"],
    queryFn: getWorkoutPlansByUser,
  });

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
    <Screen>
      {/* Workout card */}

      <FlatList
        style={{ paddingTop: 15, paddingLeft: 5, paddingRight: 5, flex: 1 }}
        data={data}
        renderItem={(item) => (
          <View style={styles.cardWrapper}>
            <View style={styles.contentWrapper}>
              <Text style={styles.heading}>{item.item.name}</Text>
              <View style={styles.dateRow}>
                <Text style={{ color: colors.primaryText }}>
                  Workouts: {item.item.total_workouts}
                </Text>
                <Text style={{ color: colors.primaryText }}>
                  {item.item.created_at}
                </Text>
              </View>
              <Text style={styles.creator}>
                {item.item.created_by.full_name}
              </Text>
            </View>
          </View>
        )}
      />
    </Screen>
  );
};

export default Workouts;

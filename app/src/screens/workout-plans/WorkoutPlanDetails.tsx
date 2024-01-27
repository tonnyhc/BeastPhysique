import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Screen from "../../components/common/Screen";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "../../contexts/ThemeContext";

interface WorkoutPlanDetailsProps {
  route: { params: { planId: string } };
}

const WorkoutPlanDetails: React.FC<WorkoutPlanDetailsProps> = ({ route }) => {
  const { colors } = useTheme();
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
      color: colors.primaryText
    },
    body: {},

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
    <Screen>
      <View style={styles.wrapper}>
        <Text style={styles.heading}>Upper/Lower x PPL</Text>
        <Text>Workout plan id: {route.params.planId}</Text>

        <ScrollView style={styles.body}>
          {/* Workout card */}
          <View style={styles.card}>
            {/* workout name and exc count */}
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Upper</Text>
              <Text style={styles.cardSubtitle}>
                Exercises: <Text>6</Text>
              </Text>
            </View>
            {/* exercises and total volumes wrapper */}
            <View style={styles.cardBody}>
              {/* exerciseWrapper */}
              <View style={styles.exercisesWrapper}>
                {/* ExerciseCard */}
                <View>
                  <Text style={styles.exerciseName}>
                    1. Barbell Bench press
                  </Text>
                </View>
                <View>
                  <Text style={styles.exerciseName}>2. Underhand pulldown</Text>
                </View>
                <View>
                  <Text style={styles.exerciseName}>
                    3. Incline DB Bench press
                  </Text>
                </View>
                <View>
                  <Text style={styles.exerciseName}>4. Bent over BB Row</Text>
                </View>
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
          </View>
        </ScrollView>
      </View>
    </Screen>
  );
};

export default WorkoutPlanDetails;

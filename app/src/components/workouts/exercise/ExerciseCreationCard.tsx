import {
  KeyboardAvoidingView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useCustomWorkoutPlan } from "../../../contexts/CustomWorkoutPlanContext";
import { useTheme } from "../../../contexts/ThemeContext";
import { Exercise } from "../../../ts/types";
import ReusableInput from "../../common/ReusableInput";
import Button from "../../common/Button";
import { Swipeable } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";

interface ExerciseCreationCardProps {
  exercise: Exercise;
  workoutIndex: number;
  exerciseIndex: number;
}

const ExerciseCreationCard: React.FC<ExerciseCreationCardProps> = ({
  workoutIndex,
  exerciseIndex,
  exercise,
}) => {
  const { dispatch } = useCustomWorkoutPlan();
  const { colors } = useTheme();

  const renderRightSetActions = (setIndex: number) => {
    return (
      <TouchableOpacity
        style={{ height: "100%", justifyContent: "flex-end" }}
        onPress={() => handleDeleteSet(setIndex)}
      >
        <Animated.View
          style={{
            backgroundColor: colors.error,
            justifyContent: "center",
            height: "50%",
            alignItems: "center",
            marginBottom: 16,
            paddingHorizontal: 48,
            marginLeft: 24,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: "RobotoRegular",
              color: colors.white,
            }}
          >
            Delete
          </Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };
  const handleDeleteSet = (setIndex: number) => {
    dispatch({
      type: "removeSetFromExercise",
      payload: {
        exerciseIndex,
        setIndex,
        workoutIndex,
      },
    });
  };

  const renderRightExerciseActions = () => {
    return (
      <TouchableOpacity
        style={{ height: "100%", justifyContent: "flex-end" }}
        onPress={() => handleDeleteExercise()}
      >
        <Animated.View
          style={{
            backgroundColor: colors.error,
            justifyContent: "center",
            height: "100%",
            alignItems: "center",
            marginBottom: 16,
            paddingHorizontal: 48,
            marginLeft: 24,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: "RobotoRegular",
              color: colors.white,
            }}
          >
            Delete
          </Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };
  const handleDeleteExercise = () => {
    dispatch({
      type: "removeExerciseFromWorkout",
      payload: {
        workoutIndex,
        exerciseIndex,
      },
    });
  };

  const styles = StyleSheet.create({
    card: {
      paddingTop: 20,
      paddingBottom: 25,
      gap: 20,
      backgroundColor: colors.bg,
      borderBottomWidth: 0.5,
      borderColor: colors.helperText,
    },
    headingRow: {
      flexDirection: "row",
      gap: 15,
    },
    exerciseIndex: {
      fontSize: 20,
      fontFamily: "RobotoMedium",
      color: colors.helperText,
    },
    exerciseName: {
      fontSize: 20,
      fontFamily: "RobotoMedium",
    },
    setsWrapper: {
      gap: 20,
      flexGrow: 1,
    },
    setCard: {
      justifyContent: "space-between",
      flexDirection: "row",
    },
    setProperty: {
      gap: 6,
    },
    proprtyText: {
      fontSize: 16,
      fontFamily: "RobotoMedium",
      color: colors.helperText,
      alignSelf: "center",
    },
  });
  return (
    <Swipeable renderRightActions={renderRightExerciseActions} overshootRight={true} onSwipeableWillOpen={handleDeleteExercise} friction={1}>
      <View style={styles.card}>
        <View style={styles.headingRow}>
          <Text style={styles.exerciseIndex}>1</Text>
          <Text style={styles.exerciseName}>Arnold Press</Text>
        </View>
        <View style={styles.setsWrapper}>
          {exercise.sets?.map((item, index) => (
            <Swipeable
              renderRightActions={() => renderRightSetActions(index)}
              overshootRight={true}
              onSwipeableWillOpen={() => handleDeleteSet(index)}
              friction={1}
            >
              <View style={styles.setCard}>
                <View style={styles.setProperty}>
                  <Text style={[styles.proprtyText, { flex: 1 }]}>Set</Text>
                  <Text style={[styles.proprtyText, { flex: 1 }]}>
                    {index + 1}
                  </Text>
                </View>
                <View style={styles.setProperty}>
                  <Text style={styles.proprtyText}>Reps</Text>
                  <ReusableInput
                    styles={{
                      wrapper: {
                        minHeight: 48,
                        height: 48,
                        width: 80,
                      },
                    }}
                    placeholder=""
                    onChange={(value: string) =>
                      dispatch({
                        type: "changeSetReps",
                        payload: {
                          workoutIndex,
                          exerciseIndex,
                          setIndex: index,
                        },
                      })
                    }
                    value={item.reps}
                  />
                </View>
                <View style={styles.setProperty}>
                  <Text style={styles.proprtyText}>Weight (kg)</Text>
                  <ReusableInput
                    styles={{
                      wrapper: {
                        minHeight: 48,
                        height: 48,
                        width: 80,
                      },
                    }}
                    placeholder=""
                    onChange={(value: string) =>
                      dispatch({
                        type: "changeSetWeight",
                        payload: {
                          workoutIndex,
                          exerciseIndex,
                          setIndex: index,
                        },
                      })
                    }
                    value={item.weight}
                  />
                </View>
                <View style={styles.setProperty}>
                  <Text style={[styles.proprtyText, { flex: 1 }]}>
                    Rep Range
                  </Text>
                  <Text style={[styles.proprtyText, { flex: 1 }]}>8 - 12</Text>
                </View>
                <View
                  style={[styles.setProperty, { justifyContent: "center" }]}
                >
                  <Text style={styles.proprtyText}>. . .</Text>
                </View>
              </View>
            </Swipeable>
          ))}

          <View>
            <Button
              text="Add set"
              type="text"
              onPress={() =>
                dispatch({
                  type: "addSetToExercise",
                  payload: {
                    workoutIndex,
                    exerciseIndex,
                  },
                })
              }
            />
            <Button text="Notes" type="text" onPress={() => {}} />
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

export default ExerciseCreationCard;

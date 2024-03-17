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
import { Exercise, ExerciseSet } from "../../../ts/types";
import ReusableInput from "../../common/ReusableInput";
import Button from "../../common/Button";
import { Swipeable } from "react-native-gesture-handler";
import ReusableModal from "../../common/Modal";
import { useEffect, useState } from "react";

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
  const { workoutPlan, dispatch } = useCustomWorkoutPlan();
  const [isRepRangeModalVisible, setIsRepRangeModalVisible] =
    useState<boolean>(false);
  const [repRangeModalSet, setRepRangeModalSet] = useState<ExerciseSet | null>(
    null
  );
  const [repRangeModalSetIndex, setRepRangeModalSetIndex] = useState<
    number | null
  >(null);
  const { colors } = useTheme();
  useEffect(() => {
    const newState =
      workoutPlan.workouts[workoutIndex].exercises[exerciseIndex].sets[
        repRangeModalSetIndex
      ];
    setRepRangeModalSet(newState);
    console.log(exercise);
  }, [workoutPlan]);

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
  const openRepRangeModal = (set: ExerciseSet, index: number) => {
    setRepRangeModalSet(set);
    setRepRangeModalSetIndex(index);
    setIsRepRangeModalVisible(true);
  };
  const closeRepRangeModal = () => {
    setRepRangeModalSet(null);
    setRepRangeModalSetIndex(null);
    setIsRepRangeModalVisible(false);
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
    <Swipeable
      renderRightActions={renderRightExerciseActions}
      overshootRight={true}
      onSwipeableWillOpen={handleDeleteExercise}
      friction={1}
    >
      <ReusableModal
        closeFn={() => closeRepRangeModal()}
        visible={isRepRangeModalVisible}
        title="Exercise rep range"
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
            marginTop: 22,
          }}
        >
          <View>
            <Text
              style={{
                fontFamily: "RobotoRegular",
                fontSize: 16,
                color: colors.helperText,
              }}
            >
              Min reps
            </Text>
            <ReusableInput
              // value={"10"}
              inputMode="numeric"
              value={repRangeModalSet?.minReps as string}
              onChange={(value: string) =>
                dispatch({
                  type: "changeSetMinReps",
                  payload: {
                    exerciseIndex,
                    workoutIndex,
                    setIndex: repRangeModalSetIndex,
                    minReps: value,
                  },
                })
              }
              placeholder=""
            />
          </View>
          <View>
            <Text
              style={{
                fontFamily: "RobotoRegular",
                fontSize: 26,
                color: colors.helperText,
              }}
            >
              ---
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontFamily: "RobotoRegular",
                fontSize: 16,
                color: colors.helperText,
              }}
            >
              Max reps
            </Text>
            <ReusableInput
              value={repRangeModalSet?.maxReps as string}
              inputMode="numeric"
              onChange={(value: string) => {
                dispatch({
                  type: "changeSetMaxReps",
                  payload: {
                    workoutIndex,
                    exerciseIndex,
                    setIndex: repRangeModalSetIndex,
                    maxReps: value,
                  },
                });
              }}
              placeholder=""
            />
          </View>
        </View>
      </ReusableModal>
      <View style={styles.card}>
        <View style={styles.headingRow}>
          <Text style={styles.exerciseIndex}>{exerciseIndex + 1}</Text>
          <Text style={styles.exerciseName}>{exercise.name}</Text>
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
                  inputMode="numeric"
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
                          reps: value,
                        },
                      })
                    }
                    value={item.reps}
                  />
                </View>
                <View style={styles.setProperty}>
                  <Text style={styles.proprtyText}>Weight (kg)</Text>
                  <ReusableInput
                  inputMode="decimal"
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
                          weight: value,
                        },
                      })
                    }
                    value={item.weight}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => openRepRangeModal(item, index)}
                  style={styles.setProperty}
                >
                  <Text style={[styles.proprtyText, { flex: 1 }]}>
                    Rep Range
                  </Text>
                  <Text style={[styles.proprtyText, { flex: 1 }]}>
                    {item.minReps || 0} - {item.maxReps || 99}
                  </Text>
                </TouchableOpacity>
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

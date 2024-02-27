import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Switch,
} from "react-native";
import React from "react";
import ReusableInput from "../../common/ReusableInput";
import { ExerciseSet } from "../../../ts/types";
import { useTheme } from "../../../contexts/ThemeContext";
import { useCustomWorkoutPlan } from "../../../contexts/CustomWorkoutPlanContext";
import { Swipeable } from "react-native-gesture-handler";

interface SetSwipeableCardProps {
  set: ExerciseSet;
  setIndex: number;
  exerciseIndex: number;
  workoutIndex: number;
}

const SetSwipeableCard: React.FC<SetSwipeableCardProps> = ({
  set,
  exerciseIndex,
  workoutIndex,
  setIndex,
}) => {
  const { colors } = useTheme();
  const { dispatch } = useCustomWorkoutPlan();
  const styles = StyleSheet.create({
    setWrapper: {
      flexDirection: "row",
      gap: 10,
      borderBottomWidth: 0.5,
      borderColor: colors.helperText,
      paddingBottom: 10,
      alignItems: "flex-end",
    },
    inputWrapper: {
      flex: 1,
      justifyContent: "flex-end",
      gap: -20,
    },
    inputHelperText: {
      textAlign: "center",
      fontSize: 14,
      color: colors.helperText,
    },
    switchWrapper: {
      justifyContent: "center",
      alignItems: "center",
    },
    switchText: {
      color: colors.helperText,
    },
  });




  return (
    <Swipeable
      renderRightActions={renderRightActions}
      overshootRight={true}
      onSwipeableWillOpen={handleDelete}
      friction={2}
    >
      <View style={styles.setWrapper}>
        <View>
          {!set.bodyweight ? (
            <View style={styles.inputWrapper}>
              <Text style={styles.inputHelperText}>Weight</Text>
              <ReusableInput
                inputMode={"decimal"}
                value={set.weight}
                onChange={(value) =>
                  dispatch({
                    type: "changeSetWeight",
                    payload: {
                      exerciseIndex,
                      workoutIndex,
                      setIndex,
                      weight: value,
                    },
                  })
                }
                placeholder=""
              />
            </View>
          ) : null}
          <View style={styles.switchWrapper}>
            <Text style={styles.switchText}>Bodyweight</Text>
            <Text>{set.bodyweight}</Text>
            <Switch
              value={set.bodyweight}
              onChange={(value) =>
                dispatch({
                  type: "changeSetToBodyweight",
                  payload: {
                    workoutIndex,
                    setIndex,
                    exerciseIndex,
                    value,
                  },
                })
              }
            />
          </View>
        </View>
        {/*  */}
        <View style={{ flex: 1 }}>
          {/* Input rapper */}
          <View style={{ flexDirection: "row", gap: 10, flex: 1 }}>
            {!set.failure ? (
              <>
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputHelperText}>Reps</Text>
                  <ReusableInput
                    inputMode="numeric"
                    value={set.reps}
                    onChange={(value) =>
                      dispatch({
                        type: "changeSetReps",
                        payload: {
                          exerciseIndex,
                          workoutIndex,
                          setIndex,
                          reps: value,
                        },
                      })
                    }
                    placeholder=""
                  />
                </View>
                {/*  */}
                {/* Input rapper */}
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputHelperText}>Min reps</Text>
                  <ReusableInput
                    inputMode="numeric"
                    value={set.minReps}
                    onChange={(value) =>
                      dispatch({
                        type: "changeSetMinReps",
                        payload: {
                          workoutIndex,
                          exerciseIndex,
                          setIndex,
                          minReps: value,
                        },
                      })
                    }
                    placeholder=""
                  />
                </View>

                {/*  */}
                {/* Input rapper */}
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputHelperText}>Max reps</Text>
                  <ReusableInput
                    inputMode="numeric"
                    value={set.maxReps}
                    onChange={(value) =>
                      dispatch({
                        type: "changeSetMaxReps",
                        payload: {
                          workoutIndex,
                          exerciseIndex,
                          setIndex,
                          maxReps: value,
                        },
                      })
                    }
                    placeholder=""
                  />
                </View>
              </>
            ) : null}
          </View>
          <View style={styles.switchWrapper}>
            <Text style={styles.switchText}>To failure</Text>
            <Switch
              value={set.failure}
              onChange={(value) =>
                dispatch({
                  type: "changeSetToFailure",
                  payload: { exerciseIndex, workoutIndex, setIndex, value },
                })
              }
            />
          </View>
        </View>

        {/*  */}
      </View>
    </Swipeable>
  );
};

export default SetSwipeableCard;

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useTheme } from "../../../contexts/ThemeContext";
import { Exercise } from "../../../ts/types";
import Button from "../../common/Button";
import { Swipeable } from "react-native-gesture-handler";
import { useState } from "react";
import { useCreateWorkoutContext } from "../../../contexts/CreateWorkoutContext";
import TestInput from "../../common/TestInput";
import MoreDotsIcon from "../../../icons/MoreDotsIcon";
import ExerciseSessionMoreModal from "./ExerciseSessionMoreModal";
import ExerciseSessionRepRangeModal from "./ExerciseSessionRepRangeModal";

interface ExerciseCreationCardProps {
  exercise: Exercise;
  exerciseIndex: number;
}

const ExerciseCreationCard: React.FC<ExerciseCreationCardProps> = ({
  exerciseIndex,
  exercise,
}) => {
  const { colors } = useTheme();
  const {
    workout,
    addSetToExercise,
    deleteSetFromExercise,
    editSetProperty,
    deleteExercise,
  } = useCreateWorkoutContext();

  const [isMoreModalOpen, setIsMoreModalOpen] = useState<boolean>(false);
  const [isRepRangeModalOpen, setIsRepRangeModalOpen] =
    useState<boolean>(false);
  const [setIndex, setSetIndex] = useState<number | null>(null);

  const renderRightSetActions = (setIndex: number) => {
    return (
      <TouchableOpacity
        style={{ height: "100%", justifyContent: "flex-end" }}
        onPress={() => deleteSetFromExercise(exerciseIndex, setIndex)}
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
  const renderRightExerciseActions = () => {
    return (
      <TouchableOpacity
        style={{ height: "100%", justifyContent: "flex-end" }}
        onPress={() => deleteExercise(exerciseIndex)}
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
  const openRepRangeModal = (setIndex: number) => {
    setIsRepRangeModalOpen(true);
    setSetIndex(setIndex);
  };
  const closeRepRangeModal = () => {
    setIsRepRangeModalOpen(false);
    setSetIndex(null);
  };

  const openMoreModal = (setIndex: number) => {
    setIsMoreModalOpen(true);
    setSetIndex(setIndex);
  };

  const closeMoreModal = () => {
    setIsMoreModalOpen(false);
    setSetIndex(null);
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
      backgroundColor: colors.bg,
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
    <>
      <ExerciseSessionMoreModal
        visible={isMoreModalOpen}
        closeModal={() => closeMoreModal()}
        setIndex={setIndex as number | 0}
        exerciseIndex={exerciseIndex}
        exercise={exercise}
      />
      <ExerciseSessionRepRangeModal
        exerciseIndex={exerciseIndex}
        setIndex={setIndex as number}
        visible={isRepRangeModalOpen}
        closeModal={closeRepRangeModal}
      />
      <Swipeable
        containerStyle={{
          backgroundColor: colors.bg,
        }}
        renderRightActions={renderRightExerciseActions}
        overshootRight={true}
        onSwipeableWillOpen={() => deleteExercise(exerciseIndex)}
        friction={1}
      >
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
                onSwipeableWillOpen={() =>
                  deleteSetFromExercise(exerciseIndex, index)
                }
                friction={1}
              >
                <View style={styles.setCard}>
                  <View style={styles.setProperty}>
                    <Text style={[styles.proprtyText, { flex: 1 }]}>Set</Text>
                    <Text style={[styles.proprtyText, { flex: 1 }]}>
                      {index + 1}
                    </Text>
                  </View>
                  {/* Reps */}
                  <View style={styles.setProperty}>
                    <Text style={styles.proprtyText}>Reps</Text>
                    {item.failure.toString() === "false" ? (
                      <TestInput
                        inputMode="numeric"
                        styles={{
                          width: 80,
                        }}
                        placeholder=""
                        onChange={(value: string) =>
                          editSetProperty(exerciseIndex, index, "reps", value)
                        }
                        value={item.reps}
                      />
                    ) : (
                      <Text
                        style={{
                          fontSize: 14,
                          color: colors.primaryText,
                          fontFamily: "RobotoMedium",
                        }}
                      >
                        FAILURE
                      </Text>
                    )}
                  </View>
                  {/* Weight */}
                  <View style={styles.setProperty}>
                    <Text style={styles.proprtyText}>Weight (kg)</Text>
                    {!item.bodyweight ? (
                      <TestInput
                        inputMode="decimal"
                        styles={{
                          minHeight: 48,
                          width: 80,
                        }}
                        placeholder=""
                        onChange={(value: string) =>
                          editSetProperty(exerciseIndex, index, "weight", value)
                        }
                        value={item.weight}
                      />
                    ) : (
                      <Text
                        style={{
                          fontSize: 14,
                          color: colors.primaryText,
                          fontFamily: "RobotoMedium",
                        }}
                      >
                        BODYWEIGHT
                      </Text>
                    )}
                  </View>
                  {/* Min Max Reps */}
                  <TouchableOpacity
                    onPress={() => openRepRangeModal(index)}
                    style={styles.setProperty}
                  >
                    <Text
                      style={[
                        styles.proprtyText,
                        { flex: item.failure.toString() === "true" ? 0 : 1 },
                      ]}
                    >
                      Rep Range
                    </Text>
                    {item.failure.toString() === "false" ? (
                      <>
                        <Text style={[styles.proprtyText, { flex: 1 }]}>
                          {item.minReps || 0} - {item.maxReps || 99}
                        </Text>
                      </>
                    ) : (
                      <Text
                        style={{
                          fontSize: 14,
                          color: colors.primaryText,
                          fontFamily: "RobotoMedium",
                        }}
                      >
                        FAILURE
                      </Text>
                    )}
                  </TouchableOpacity>
                  <View
                    style={[
                      styles.setProperty,
                      { justifyContent: "center", alignItems: "center" },
                    ]}
                  >
                    <Button
                      type="text"
                      onPress={() => openMoreModal(index)}
                      icon={
                        <MoreDotsIcon
                          fill={colors.helperText}
                          size={24}
                          color={colors.helperText}
                        />
                      }
                    />
                  </View>
                </View>
              </Swipeable>
            ))}

            <View>
              <Button
                text="Add set"
                type="text"
                onPress={() => addSetToExercise(exerciseIndex)}
              />
              <Button text="Notes" type="text" onPress={() => {}} />
            </View>
          </View>
        </View>
      </Swipeable>
    </>
  );
};

export default ExerciseCreationCard;

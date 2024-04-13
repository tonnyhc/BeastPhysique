import { StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import React from "react";
import TestInput from "../../common/TestInput";
import { useCreateWorkoutContext } from "../../../contexts/CreateWorkoutContext";
import { useTheme } from "../../../contexts/ThemeContext";

interface ExerciseSessionRepRangeModalProps {
  visible: boolean;
  closeModal: () => void;

  setIndex: number;
  exerciseIndex: number;
}

const ExerciseSessionRepRangeModal: React.FC<
  ExerciseSessionRepRangeModalProps
> = ({ visible, closeModal, exerciseIndex, setIndex }) => {
  const { colors } = useTheme();

  const { workout, editSetProperty } = useCreateWorkoutContext();
  const currentExercise = workout.exercises[exerciseIndex];
  const currentSet = currentExercise.sets[setIndex];

  const styles = StyleSheet.create({
    modal: {
      zIndex: 1000,
    },
    content: {
      padding: 25,
      borderRadius: 20,
      backgroundColor: colors.bg,
      justifyContent: 'center',
      alignItems: 'center'
    },
    formWrapper: {
      gap: 10,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
        fontSize: 22,
        color: colors.primaryText,
        fontFamily: "RobotoMedium",
        marginBottom: 18
    }
  });

  return (
    <Modal
      onBackdropPress={closeModal}
      propagateSwipe={true}
      swipeDirection="down"
      isVisible={visible}
      animationIn="slideInUp"
      style={styles.modal}
      onSwipeComplete={closeModal}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Edit Rep range</Text>
        <View style={styles.formWrapper}>
          <View>
            <TestInput
              label="Min Reps"
              inputMode="numeric"
              value={currentSet?.minReps.toString()}
              onChange={(value: string) =>
                editSetProperty(
                  exerciseIndex,
                  setIndex as number,
                  "minReps",
                  value
                )
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
            <TestInput
              label="Max Reps"
              value={currentSet?.maxReps.toString()}
              inputMode="numeric"
              onChange={(value: string) =>
                editSetProperty(
                  exerciseIndex,
                  setIndex as number,
                  "maxReps",
                  value
                )
              }
              placeholder=""
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ExerciseSessionRepRangeModal;

import { StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import React from "react";
import { useTheme } from "../../../contexts/ThemeContext";
import Button from "../../common/Button";
import { useCreateWorkoutContext } from "../../../contexts/CreateWorkoutContext";
import { Exercise, ExerciseSession } from "../../../ts/types";
import BouncyCheckbox from "react-native-bouncy-checkbox";

interface ExerciseSessionMoreModalProps {
  visible: boolean;
  exerciseIndex: number;
  exercise: ExerciseSession;
  closeModal: () => void;
  setIndex: number;
}

const ExerciseSessionMoreModal: React.FC<ExerciseSessionMoreModalProps> = ({
  visible,
  exerciseIndex,
  exercise,
  closeModal,
  setIndex,
}) => {
  const { colors } = useTheme();
  const { editSetProperty, deleteSetFromExercise } = useCreateWorkoutContext();
  const currentSet = exercise.sets[setIndex];
  const styles = StyleSheet.create({
    modal: {
      justifyContent: "flex-end",
      zIndex: 1000,
    },
    content: {
      backgroundColor: "white",
      zIndex: 100,
      flex: 0.7,
      borderTopRightRadius: 15,
      borderTopLeftRadius: 15,
    },
    separator: {
      borderBottomWidth: 0.5,
      borderBottomColor: colors.helperText,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 15,
    },
  });

  return (
    <Modal
      onBackdropPress={closeModal}
      useNativeDriver={true}
      propagateSwipe={true}
      swipeDirection="down"
      isVisible={visible}
      animationIn="slideInUp"
      style={styles.modal}
      onSwipeComplete={closeModal}
    >
      <View style={styles.content}>
        <View style={styles.separator}>
          <BouncyCheckbox
            isChecked={
              currentSet && currentSet.to_failure.toString() === "true"
                ? true
                : false
            }
            style={{
              flexDirection: "row-reverse",
              gap: 18,
            }}
            textStyle={{
              fontSize: 24,
              color: colors.primaryText,
              textDecorationLine: "none",
            }}
            text="To failure"
            onPress={(value) => {
              editSetProperty(
                exerciseIndex,
                setIndex,
                "to_failure",
                value.toString()
              );
            }}
          />
        </View>

        <View style={styles.separator}>
          <BouncyCheckbox
            isChecked={
              currentSet && currentSet.bodyweight.toString() === "true"
                ? true
                : false
            }
            style={{
              flexDirection: "row-reverse",
              gap: 18,
            }}
            textStyle={{
              fontSize: 24,
              color: colors.primaryText,
              textDecorationLine: "none",
            }}
            text="Bodyweight"
            onPress={(value) =>
              editSetProperty(exerciseIndex, setIndex, "bodyweight", value)
            }
          />
        </View>
        <View style={[styles.separator, { paddingVertical: 0 }]}>
          <Button
            textStyles={{ color: colors.error, fontSize: 24 }}
            type="text"
            text="Delete"
            onPress={() => {
              deleteSetFromExercise(exerciseIndex, setIndex);
              closeModal();
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ExerciseSessionMoreModal;

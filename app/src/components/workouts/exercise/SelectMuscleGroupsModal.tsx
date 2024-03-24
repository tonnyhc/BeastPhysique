import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useTheme } from "../../../contexts/ThemeContext";
import useMuscleGroupsService from "../../../hooks/services/useMuscleGroupsService";

import { Entypo } from "@expo/vector-icons";
import { MuscleGroup } from "../../../Stacks/CreateExerciseStack";

interface SelectMuscleGroupsModalProps {
  isVisible: boolean;
  closeModal: () => void;
  addMuscleGroup: (muscleGroup: MuscleGroup) => void;
  exerciseMuscleGroups: MuscleGroup[];
}

const SelectMuscleGroupsModal: React.FC<SelectMuscleGroupsModalProps> = ({
  isVisible,
  closeModal,
  addMuscleGroup,
  exerciseMuscleGroups,
}) => {
  const { listQuery } = useMuscleGroupsService();
  const muscleGroups = listQuery.data;
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    modal: {
      justifyContent: "flex-end",
      margin: 0,
    },
    modalWrapper: {
      backgroundColor: "white",
      flex: 0.7,
      borderTopRightRadius: 15,
      borderTopLeftRadius: 15,
    },
    modalHeader: {},
    modalBody: {
      paddingHorizontal: 18,
      marginBottom: 50,
      flexGrow: 1,
      flex: 1,
    },
    muscleGroupTouchCard: {
      flexDirection: "row-reverse",
      justifyContent: "space-between",
      paddingVertical: 6,
      borderBottomWidth: 0.5,
      borderColor: colors.helperText,
      alignItems: "center",
    },
    muscleGroupName: {
      color: colors.primaryText,
      fontFamily: "RobotoMedium",
      fontSize: 18,
      textDecorationLine: "none",
    },
  });
  //   TODO: Create the add muscle group

  return (
    <Modal
      propagateSwipe={true}
      swipeDirection="down"
      isVisible={isVisible}
      animationIn="slideInUp"
      style={styles.modal}
      onSwipeComplete={closeModal}
    >
      <View style={styles.modalWrapper}>
        {/* modal header */}
        <View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Entypo name="chevron-down" size={32} color={colors.helperText} />
          </View>
        </View>
        {/* modal body */}
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, gap: 15 }}
          style={styles.modalBody}
        >
          {/* MuscleGroup Card */}
          {muscleGroups.map((item, index) => (
            <BouncyCheckbox
              key={index}
              text={item.name}
              fillColor={colors.button}
              isChecked={exerciseMuscleGroups.includes(item)}
              onPress={() => addMuscleGroup(item)}
              style={styles.muscleGroupTouchCard}
              textStyle={styles.muscleGroupName}
              useNativeDriver={true}
            />
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default SelectMuscleGroupsModal;

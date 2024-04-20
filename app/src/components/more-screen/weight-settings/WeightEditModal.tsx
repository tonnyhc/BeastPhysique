import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";

import Modal from "react-native-modal";
import { useTheme } from "../../../contexts/ThemeContext";
import TickIcon from "../../../icons/TickIcon";
import CloseIcon from "../../../icons/CloseIcon";
import WeightCard from "./WeightCard";
import { TextInput } from "react-native-gesture-handler";
import { useMutation } from "@tanstack/react-query";
import useMeasuresServices from "../../../hooks/services/useMeasureServices";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MoreStackParamsList } from "../../../Stacks/MoreStack";

interface WeightEditModalProps {
  isVisible: boolean;
  closeModal: () => void;
  weight: string;
}

const WeightEditModal: React.FC<WeightEditModalProps> = ({
  isVisible,
  closeModal,
  weight,
}) => {
  const { colors } = useTheme();
  const { updateMeasures } = useMeasuresServices();
  const navigation = useNavigation<StackNavigationProp<MoreStackParamsList>>();
  const [inputWeight, setInputWeight] = useState<string>("");
  useEffect(() => {
    setInputWeight(weight);
  }, [weight]);

  const { mutate, isPending } = useMutation({
    mutationFn: () => updateMeasures({ weight: Number(inputWeight) }),
    mutationKey: ["update-weight"],
    onSuccess: () => {
      closeModal();
      navigation.replace("WeightSettings");
    },
  });

  const onChangeWeight = (value: string) => {
    if (!inputWeight.toString().includes(".")) {
      value = value.replace(",", ".");
    } else {
      value = value.replace(",", "");
    }
    setInputWeight(value);
  };
  const styles = StyleSheet.create({
    modal: {
      justifyContent: "flex-end",
      margin: 0,
    },
    modalWrapper: {
      flex: 0.7,
      borderTopRightRadius: 15,
      borderTopLeftRadius: 15,
      backgroundColor: colors.bg,
    },
    modalHeader: {
      zIndex: 1000,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 24,
      paddingVertical: 14,
    },
    title: {
      fontSize: 20,
      fontFamily: "RobotoMedium",
      color: colors.primaryText,
    },
    modalBody: {
      paddingHorizontal: 18,
      marginBottom: 50,
      flexGrow: 1,
      flex: 1,
    },
  });

  return (
    <Modal
      propagateSwipe={true}
      swipeDirection="down"
      isVisible={isVisible}
      animationIn="slideInUp"
      style={styles.modal}
      onSwipeComplete={() => closeModal()}
      avoidKeyboard
      onBackdropPress={() => closeModal()}
    >
      <View style={styles.modalWrapper}>
        <View style={styles.modalHeader}>
          <TouchableOpacity
            style={{ width: 32, height: 32 }}
            onPress={() => closeModal()}
          >
            <CloseIcon scale={1.3} size={32} color={colors.primaryText} />
          </TouchableOpacity>
          <Text style={styles.title}>Edit weight</Text>
          <TouchableOpacity onPress={() => mutate()}>
            <TickIcon scale={1.3} size={32} color={colors.primaryText} />
          </TouchableOpacity>
        </View>
        <View style={styles.modalBody}>
          <WeightCard
            onChangeWeight={onChangeWeight}
            helper_text="Weigh in"
            weight={inputWeight}
          />
        </View>
      </View>
    </Modal>
  );
};

export default WeightEditModal;

const styles = StyleSheet.create({});

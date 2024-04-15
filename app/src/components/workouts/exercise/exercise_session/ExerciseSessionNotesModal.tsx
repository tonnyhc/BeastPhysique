import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import { useTheme } from "../../../../contexts/ThemeContext";
import TestInput from "../../../common/TestInput";
import { ScrollView } from "react-native-gesture-handler";

interface ExerciseSessionNotesModalProps {
  visible: boolean;
  closeModal: () => void;
  data: string;
  setData: (value: string) => void
}

const ExerciseSessionNotesModal: React.FC<ExerciseSessionNotesModalProps> = ({
  visible,
  closeModal,
  data,
  setData
}) => {
//   const [data, setData] = useState<string>("");
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    modal: {
      justifyContent: "flex-end",
      zIndex: 1000,
      margin: 0,
    },
    content: {
      backgroundColor: "white",
      zIndex: 100,
      flex: 0.6,
      borderTopRightRadius: 15,
      borderTopLeftRadius: 15,
      paddingTop: 20,
    },
    separator: {
      borderBottomWidth: 0.5,
      borderBottomColor: colors.helperText,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 15,
    },
    heading: {
      fontSize: 18,
      textAlign: "center",
      fontFamily: "RobotoMedium",
      color: colors.primaryText,
    },
    textArea: {
      marginTop: 30,
    },
  });

  return (
    <Modal
      onBackdropPress={() => closeModal()}
      avoidKeyboard={true}
      // useNativeDriver={true}
      propagateSwipe={true}
      swipeDirection="down"
      isVisible={visible}
      animationIn="slideInUp"
      style={styles.modal}
      onSwipeComplete={() => closeModal()}
    >
      <View style={styles.content}>
        <ScrollView>
          <View>
            <Text style={styles.heading}>
              Exercise notes (Barbell Bench Press)
            </Text>
          </View>
          <View style={styles.textArea}>
            <TestInput
              borderStyles={{ borderWidth: 0, borderBottomWidth: 1 }}
              placeholder="I need to focus on ..."
              value={data}
              helperTextRight="0/200"
              onChange={(value: string) => setData(value)}
              multiline={true}
              numberOfLines={50}
            />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default ExerciseSessionNotesModal;

const styles = StyleSheet.create({});

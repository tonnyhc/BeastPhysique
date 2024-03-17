import { StyleSheet, Text, View, Modal, Pressable, Alert } from "react-native";
import React, { ReactNode, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import ReusableInput from "./ReusableInput";

interface ReusableModalProps {
  visible: boolean;
  closeFn: () => void;
  children: ReactNode;
  title?: string;
}

const ReusableModal: React.FC<ReusableModalProps> = ({
  visible,
  closeFn,
  children,
  title,
}) => {
  const styles = StyleSheet.create({
    centeredView: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 15,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
    },

    title: {
      fontFamily: "RobotoMedium",
      fontSize: 22,
    },
    modalBody: {},
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.15)", // semi-transparent black background
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.8, // adjust the opacity as needed
      shadowRadius: 10, // adjust the radius as needed
      elevation: 10, // for Android
    },
  });
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          closeFn();
        }}
      >
        <Pressable onPress={() => closeFn()} style={styles.overlay}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {title ? <Text style={styles.title}>{title}</Text> : null}
              <View style={styles.modalBody}>{children}</View>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default ReusableModal;

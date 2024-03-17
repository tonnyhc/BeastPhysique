import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "../../contexts/ThemeContext";
import CloseIcon from "../../icons/CloseIcon";

interface CloseButtonProps {
    onPress: () => void
}

const CloseButton: React.FC<CloseButtonProps> = ({onPress}) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    button: {
      // borderWidth: 2,
      borderRadius: 100,
      borderColor: colors.secondaryText,
      // width: 36,
      // height: 36,
      justifyContent: "center",
      alignItems: "center",
    },
  });
  return (
    <TouchableOpacity testID="backButton" style={styles.button} onPress={onPress}>
      <CloseIcon size={22} color={colors.helperText}/>
    </TouchableOpacity>
  );
};

export default CloseButton;

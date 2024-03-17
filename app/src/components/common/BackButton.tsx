import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "../../contexts/ThemeContext";
import { Entypo } from '@expo/vector-icons';

interface BackButtonProps {
    onPress: () => void
}

const BackButton: React.FC<BackButtonProps> = ({onPress}) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    button: {
      borderWidth: 1,
      borderRadius: 100,
      backgroundColor: "#2C2C2E",
      width: 32,
      height: 32,
      justifyContent: "center",
      alignItems: "center",
    },
  });
  return (
    <TouchableOpacity testID="backButton" style={styles.button} onPress={onPress}>
      <Entypo name="chevron-left" size={24} color={colors.white}/>
    </TouchableOpacity>
  );
};

// const BackButton: React.FC<BackButtonProps> = ({onPress}) => {
//   const { colors } = useTheme();
//   const styles = StyleSheet.create({
//     button: {
//       // borderWidth: 2,
//       borderRadius: 100,
//       borderColor: colors.secondaryText,
//       // width: 36,
//       // height: 36,
//       justifyContent: "center",
//       alignItems: "center",
//     },
//   });
//   return (
//     <TouchableOpacity testID="backButton" style={styles.button} onPress={onPress}>
//       <AntDesign name="arrowleft" size={22} color="#666666" />
//     </TouchableOpacity>
//   );
// };

export default BackButton;

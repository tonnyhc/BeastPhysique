import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { ReactNode } from "react";
import ChevronLeft from "../../icons/ChevronLeft";
import { useTheme } from "../../contexts/ThemeContext";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

interface StackScreenHeaderProps {
  label: string;
  rightButton?: ReactNode;
  leftButton?: ReactNode;
  leftButtonPress?: () => void;
}

const StackScreenHeader: React.FC<StackScreenHeaderProps> = ({
  label,
  rightButton,
  leftButton,
  leftButtonPress
}) => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    wrapper: {
      paddingHorizontal: 12,
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: colors.bg,
    },
    header: {
      flexDirection: "row",
      gap: 16,
      alignItems: "center",
    },
    headerText: {
      fontSize: 20,
      fontFamily: "RobotoMedium",
      color: colors.primaryText,
    },
  });

  return (
    <SafeAreaView style={{ backgroundColor: colors.bg }}>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <TouchableWithoutFeedback onPress={() => leftButtonPress ? leftButtonPress() : navigation.goBack()}>
            {leftButton ? (
              leftButton
            ) : (
              <ChevronLeft size={28} color={colors.primaryText} />
            )}
          </TouchableWithoutFeedback>
          <Text style={styles.headerText}>{label}</Text>
        </View>
        {rightButton ? rightButton : null}
      </View>
    </SafeAreaView>
  );
};

export default StackScreenHeader;

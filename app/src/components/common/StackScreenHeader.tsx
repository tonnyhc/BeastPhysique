import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import ChevronLeft from "../../icons/ChevronLeft";
import { useTheme } from "../../contexts/ThemeContext";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

interface StackScreenHeaderProps {
  label: string;
}

const StackScreenHeader: React.FC<StackScreenHeaderProps> = ({ label }) => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    wrapper: {
      paddingHorizontal: 12,
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
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <ChevronLeft size={28} color={colors.primaryText} />
          </TouchableWithoutFeedback>
          <Text style={styles.headerText}>{label}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default StackScreenHeader;

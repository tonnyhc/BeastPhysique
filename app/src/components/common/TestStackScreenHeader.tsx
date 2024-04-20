import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import React, { ReactNode } from "react";
import { useTheme } from "../../contexts/ThemeContext";

import { HeaderBackButtonProps } from "@react-navigation/elements";

interface TestStackScreenHeaderProps {
  headerLeft?: ReactNode;
  headerTitle: string;
  headerRight?: ReactNode;
}

const TestStackScreenHeader: React.FC<TestStackScreenHeaderProps> = ({
  headerLeft,
  headerTitle,
  headerRight,
}) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    safeArea: {
      backgroundColor: colors.bg,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
      minHeight: 50,
    },
    headerTitle: {
      fontSize: 20,
      fontFamily: "RobotoMedium",
      color: colors.primaryText,
      textAlign: "center",
    },
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        {headerLeft ? headerLeft : <View style={{ minWidth: 24 }} />}
        <Text style={styles.headerTitle}>{headerTitle}</Text>
        <View style={{ minWidth: 24 }}>{headerRight}</View>
      </View>
    </SafeAreaView>
  );
};

export default TestStackScreenHeader;

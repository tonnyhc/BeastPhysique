import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { ReactNode } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import SettingsNavigationCard from "../navigation/SettingsNavigationCard";

export type SettingsNavigationCardProps = {
  title: string;
  icon: ReactNode;
  action: ReactNode;
  navigate: () => void;
};

export interface SettingsFrameWrapperProps {
  categoryName: string;
  properties: SettingsNavigationCardProps[];
}

const SettingsFrameWrapper: React.FC<SettingsFrameWrapperProps> = ({
  categoryName,
  properties,
}) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    frame: {
      gap: 16,
      paddingBottom: 24,
      borderBottomWidth: 1,
      borderBottomColor: colors.secondaryText,

      paddingTop: 10,
    },
    title: {
      fontSize: 18,
      color: colors.primaryText,
      fontFamily: "RobotoMedium",
    },
    properties: {
      gap: 18,
    },
  });

  return (
    <View style={styles.frame}>
      <Text style={styles.title}>{categoryName}</Text>
      <View style={styles.properties}>
        {properties.map((prop) => (
          <SettingsNavigationCard
            key={prop.title}
            icon={prop.icon}
            title={prop.title}
            action={prop.action}
            navigate={prop.navigate}
          />
        ))}
      </View>
    </View>
  );
};

export default SettingsFrameWrapper;

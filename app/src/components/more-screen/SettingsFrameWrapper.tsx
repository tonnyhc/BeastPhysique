import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { ReactNode } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import BarbellIcon from "../../icons/BarbellIcon";
import ChevronRight from "../../icons/ChevronRight";

export type Property = {
  title: string;
  icon: ReactNode;
  action: ReactNode;
};

export interface SettingsFrameWrapperProps {
  categoryName: string;
  properties: Property[];
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
      borderBottomColor: colors.helperText,

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
    property: {
      backgroundColor: "#E7EFF1",
      borderRadius: 12,
      gap: 8,
      paddingVertical: 12,
      paddingHorizontal: 12,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    icon_and_text: {
      flexDirection: "row",
      gap: 12,
      alignItems: "center",
      // width: "100%",
    },
    propertyTitle: {
      fontSize: 18,
      fontFamily: "Roboto",
      // color: colors.primaryText,
      color: "#292D32",
    },
    propertyAction: {
      alignSelf: "flex-end",
    },
  });

  return (
    <View style={styles.frame}>
      <Text style={styles.title}>{categoryName}</Text>
      <View style={styles.properties}>
        {properties.map((prop) => (
          <TouchableOpacity style={styles.property}>
            {/* Icon */}
            <View style={styles.icon_and_text}>
              {prop.icon}
              <Text style={styles.propertyTitle}>{prop.title}</Text>
            </View>
            <View style={styles.propertyAction}>{prop.action}</View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default SettingsFrameWrapper;

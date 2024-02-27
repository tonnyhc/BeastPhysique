import { StyleSheet, Text, View } from "react-native";
import React, { ReactNode } from "react";

import { useTheme } from "../../contexts/ThemeContext";
import { TouchableOpacity } from "react-native-gesture-handler";

interface ProfilePropertyCardProps {
  icon: ReactNode;
  heading: string;
  description: string;
}

const ProfilePropertyCard: React.FC<ProfilePropertyCardProps> = ({
    icon,heading,description
}) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    card: {
      flexDirection: "row",
      gap: 16,
    },
    iconWrapper: {
      backgroundColor: colors.btnSecondary,
      padding: 12,
      borderRadius: 8,
    },
    primaryText: {
      fontSize: 18,
      fontFamily: "RobotoMedium",
      lineHeight: 24,
    },
    secondaryText: {
      fontSize: 15,
      fontFamily: "RobotoRegular",
      lineHeight: 21,
      color: colors.helperText,
    },
  });

  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.iconWrapper}>
        
        {icon}
      </View>
      <View>
        <Text style={styles.primaryText}>{heading}</Text>
        <Text style={styles.secondaryText}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProfilePropertyCard;

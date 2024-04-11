import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import Button from "../common/Button";
import FAB from "../common/FAB";
import InfoIcon from "../../icons/InfoIcon";

interface WorkoutSessionSearchCardProps {
  name: string;
  exercises_count: number;
  total_sets_count: number;
}

const WorkoutSessionSearchCard: React.FC<WorkoutSessionSearchCardProps> = ({
  name,
  exercises_count,
  total_sets_count,
}) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    card: {
      borderRadius: 12,
      borderWidth: 0.5,
      borderColor: colors.helperText,
      padding: 12,
      flexDirection: "row",
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12
    },
    content: {
        gap: 8,
    },
    title: {
      color: colors.primaryText,
      fontFamily: "RobotoMedium",
      fontSize: 20,
      
    },
    subtitle: {
      fontFamily: "RobotoRegular",
      color: colors.helperText,
      fontSize: 17,
    },
  });

  return (
    <TouchableOpacity style={styles.card}>
      <TouchableOpacity style={styles.content}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.subtitle}>{exercises_count} Exercises</Text>
        <Text style={styles.subtitle}>{total_sets_count} Total Sets</Text>
      </TouchableOpacity>

      <Button type="text" onPress={() => {}} icon={<InfoIcon size={24} color={colors.primaryText}/>}/>
    </TouchableOpacity>
  );
};

export default WorkoutSessionSearchCard;

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "../../../contexts/ThemeContext";

interface WeightLogsProps {
  logs: {
    weight: number;
    date: string;
  }[];
}

const WeightLogs: React.FC<WeightLogsProps> = ({ logs }) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    header: {
      fontSize: 18,
      fontFamily: "RobotoMedium",
      color: colors.primaryText,
      marginBottom: 10,
    },
    log: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottomWidth: 0.5,
      borderBottomColor: colors.secondaryText,
      padding: 10,
    },
    logDate: {
      fontFamily: "RobotoMedium",
      fontSize: 16,
      color: colors.secondaryText,
    },
    logValue: {
      fontSize: 16,
      fontFamily: "RobotoMedium",
      color: colors.primaryText,
    },
  });

  return (
    <View>
      <Text style={styles.header}>Logs</Text>
      {logs.map((log) => (
        <View style={styles.log}>
          <Text style={styles.logDate}>{log.date}</Text>
          <View>
            <Text style={styles.logValue}>{log.weight} kg</Text>
            <View style={{width: 24 * 3}}/>
          </View>
        </View>
      ))}
    </View>
  );
};

export default WeightLogs;

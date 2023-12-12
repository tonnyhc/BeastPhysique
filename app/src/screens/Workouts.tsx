import { StyleSheet, Text, View } from "react-native";
import Screen from "../components/common/Screen";
import { useTheme } from "../contexts/ThemeContext";

const Workouts: React.FC = () => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    cardWrapper: {
      paddingTop: 6,
      height: 85,
      backgroundColor: colors.cardBg,
      borderRadius: 4,
      shadowColor: "#171a1f",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      justifyContent: "center",
      alignContent: "center",
    },
    contentWrapper: {
      paddingLeft: 50,
      paddingRight: 50,
    },
    heading: {
      fontSize: 18,
      fontFamily: "Acme",
      fontWeight: "700",
      color: colors.primaryText,
      marginBottom: 6,
    },
    dateRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      color: colors.primaryText,
      fontSize: 16,
    },
    creator: {
      alignSelf: "flex-end",
      fontSize: 12,
      fontWeight: "600",
      color: colors.secondaryText,
    },
  });

  return (
    <Screen>
      {/* Workout card */}
      <View style={styles.cardWrapper}>
        <View style={styles.contentWrapper}>
          <Text style={styles.heading}>Workout split name</Text>
          <View style={styles.dateRow}>
            <Text style={{color: colors.primaryText}}>Workouts: 4</Text>
            <Text style={{color: colors.primaryText}}>27 Nov 2023</Text>
          </View>
          <Text style={styles.creator}>Toni Petrov</Text>
        </View>
      </View>
    </Screen>
  );
};

export default Workouts;

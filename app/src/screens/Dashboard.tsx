import {
  SafeAreaView,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { Ionicons, Entypo } from "@expo/vector-icons";

import Screen from "../components/common/Screen";
import { useTheme } from "../contexts/ThemeContext";
// import { colors, lightColors } from "../utils/colors";

const Dashboard: React.FC = () => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    helperText: {
      color: colors.helperText,
      fontWeight: "900",
    },
    rowActionBtns: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    section: {
      marginTop: 12,
    },
    primaryHeading: {
      fontFamily: "Acme",
      fontSize: 32,
      fontWeight: "700",
      color: colors.primaryText,
    },
    secondaryHeading: {
      fontFamily: "Acme",
      fontSize: 20,
      fontWeight: "700",
      color: colors.primaryText,
    },
    btn: {
      height: 32,
      paddingLeft: 8,
      paddingRight: 8,
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Acme",
      fontSize: 12,

      backgroundColor: "transparent",
      borderRadius: 16,
      borderWidth: 1,
      borderColor: "#00BDD7FF",
      borderStyle: "solid",
      gap: 4,
    },
    btnText: { color: colors.blueText },
    viewMoreBtn: {
      fontSize: 11,
      fontWeight: "600",
      color: "#424955FF",
    },
  });
  return (
    <Screen>
      {/* Pictures + Date */}
      <View style={{ gap: 22 }}>
        <View style={styles.rowActionBtns}>
          <Image
            style={{
              resizeMode: "cover",
              width: 44,
              height: 44,
              borderRadius: 100,
            }}
            source={require("../../assets/pngtree-flat-barbell-png-image_6015194.jpg")}
          />
          <Image
            style={{
              resizeMode: "cover",
              width: 44,
              height: 44,
              borderRadius: 100,
              overflow: "hidden",
            }}
            source={{
              uri: "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?size=626&ext=jpg&ga=GA1.1.1222169770.1702252800&semt=ais",
            }}
          />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <Ionicons name="sunny" size={24} color={colors.helperText} />
          <Text style={styles.helperText}>Tues 11 Jul</Text>
        </View>
      </View>
      {/* Overview */}
      <View style={styles.section}>
        <View style={styles.rowActionBtns}>
          <Text style={styles.primaryHeading}>Overview</Text>
          <TouchableOpacity style={[styles.btn, styles.rowActionBtns]}>
            <Ionicons name="rocket-outline" size={20} color={colors.blueText} />
            <Text style={styles.btnText}>All data</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Health */}
      <View style={styles.section}>
        <View style={styles.rowActionBtns}>
          <Text style={styles.secondaryHeading}>Health</Text>
          <TouchableOpacity style={styles.rowActionBtns}>
            <Text style={styles.viewMoreBtn}>View more </Text>
            <Entypo
              name="chevron-small-right"
              size={20}
              color={colors.helperText}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
};
export default Dashboard;

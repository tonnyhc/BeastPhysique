import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Screen from "../../components/common/Screen";
import { Picker } from "@react-native-picker/picker";
import { useTheme } from "../../contexts/ThemeContext";
import Button from "../../components/common/Button";
import ChevronRight from "../../icons/ChevronRight";
import { StackNavigationProp } from "@react-navigation/stack";
import { ProfileSetupStackParamsList } from "../../Stacks/ProfileSetupStack";
import { useAuth } from "../../contexts/AuthContext";
import useProfileSetup from "../../hooks/services/useProfileSetup";
import AuthStackHeader from "../../components/authentication/AuthStackHeader";
import SetupScreenHeader from "../../components/profile/setup/SetupScreenHeader";
import SetupScreenFooterBtns from "../../components/profile/setup/SetupScreenFooterBtns";
const activityMap = [
  {
    label: "Sedentary",
    value: "Sedentary",
    helperText: "(little or no exercise)",
  },
  {
    label: "Lightly active",
    value: "Light",
    helperText: "(light exercise/sports 1-3 days/week",
  },
  {
    label: "Moderate active",
    value: "Moderate",
    helperText: "(moderate exercise/sports 3-5 days/week)",
  },
  {
    label: "Very active",
    value: "Very",
    helperText: "(hard exercise/sports 6-7 days/week)",
  },
  {
    label: "Extreme active",
    value: "Extreme",
    helperText: "(very hard exercise/sports & physical job)",
  },
];

interface ActivitySetupProps {
  navigation: StackNavigationProp<ProfileSetupStackParamsList>;
}
const ActivitySetup: React.FC<ActivitySetupProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const [data, setData] = useState<string>("");
  const { mutate, isPending } = useProfileSetup({
    url: "health/fitness/activity/edit/",
    onSuccessFn: () => navigation.navigate("PhysiqueGoalSetup"),
  });
  const styles = StyleSheet.create({
    activityCard: {
      backgroundColor: "transparent",
      gap: 8,
      paddingHorizontal: 8,
      paddingVertical: 8,
      width: 160,
      height: 100,
      borderRadius: 20,

      borderColor: colors.helperText,
      borderWidth: 2,
      padding: 20,
    },
    activityCardTitle: {
      fontFamily: "RobotoSlabBold",
      fontSize: 16,
      color: colors.primaryText,
    },
    activityCardtext: {
      fontFamily: "RobotoRegular",
      color: colors.helperText,
    },
    activeCard: {
      backgroundColor: colors.button,
    },
  });

  return (
    <>
      <AuthStackHeader />
      <Screen>
        <SetupScreenHeader
          header="How active are you?"
          subheader="Based on your activity level we can calculate your base calorie needs."
        />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
            marginTop: 50,
          }}
        >
          {activityMap.map((item) => (
            <TouchableOpacity
              onPress={() => setData(item.value)}
              style={[
                styles.activityCard,
                item.value === data ? styles.activeCard : null,
              ]}
            >
              <Text
                style={[
                  styles.activityCardTitle,
                  item.value === data ? { color: colors.white } : null,
                ]}
              >
                {" "}
                {item.label}
              </Text>
              <Text style={styles.activityCardtext}>{item.helperText}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flex: 1 }}>
          <SetupScreenFooterBtns
            disabledSubmit={data === ""}
            submitFn={() => mutate(data)}
            pendingSubmit={isPending}
          />
        </View>
      </Screen>
    </>
  );
};

export default ActivitySetup;

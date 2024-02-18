import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Screen from "../../components/common/Screen";
import { Picker } from "@react-native-picker/picker";
import { useTheme } from "../../contexts/ThemeContext";
import Button from "../../components/common/Button";
import ChevronRight from "../../icons/ChevronRight";
import { StackNavigationProp } from "@react-navigation/stack";
import { ProfileSetupStackParamsList } from "../../Stacks/ProfileSetupStack";
import { useAuth } from "../../contexts/AuthContext";
const activityMap = [
  {
    label: "Sedentary",
    value: "sedentary",
    helperText: "(little or no exercise)",
  },
  {
    label: "Lightly active",
    value: "lightly",
    helperText: "(light exercise/sports 1-3 days/week",
  },
  {
    label: "Moderate active",
    value: "moderate",
    helperText: "(moderate exercise/sports 3-5 days/week)",
  },
  {
    label: "Very active",
    value: "very",
    helperText: "(hard exercise/sports 6-7 days/week)",
  },
  {
    label: "Extreme active",
    value: "super",
    helperText: "(very hard exercise/sports & physical job)",
  },
];

interface ActivitySetupProps {
  navigation: StackNavigationProp<ProfileSetupStackParamsList>;
}
const ActivitySetup: React.FC<ActivitySetupProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const {skipSetupProfile} = useAuth()
  const styles = StyleSheet.create({
    headingText: {
      fontSize: 20,
      textAlign: "center",
      color: colors.primaryText,
    },
    wrapper: {
      flex: 1,
      paddingHorizontal: 20,
    },
    formWrapper: { flex: 1 },
  });

  return (
    <Screen>
      <View style={styles.wrapper}>
        <Text style={styles.headingText}>
          This helps us calculate your calorie intake, and provide personalized
          recommendations
        </Text>
        <View style={styles.formWrapper}>
          <Picker
            selectedValue={"java"}
            onValueChange={(itemValue, itemIndex) => ({})}
            numberOfLines={2}
          >
            {activityMap.map((item, index) => (
              <Picker.Item
                style={{ flexWrap: "wrap", flex: 1 }}
                key={index}
                label={item.label + " " + item.helperText}
                value={item.value}
              />
            ))}
          </Picker>
        </View>

        <View>
          <Button
            buttonStyles={{ width: "100%" }}
            text="Continue"
            rightIcon={<ChevronRight color={colors.white} size={18} />}
            onPress={() => navigation.navigate("PhysiqueGoalSetup")}
          />
          <Button
            text="SET UP LATER IN PROFILE"
            type="text"
            onPress={() => (skipSetupProfile ? skipSetupProfile() : null)}
          />
        </View>
      </View>
    </Screen>
  );
};

export default ActivitySetup;

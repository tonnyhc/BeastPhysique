import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import Screen from "../../components/common/Screen";
import { useTheme } from "../../contexts/ThemeContext";
import Button from "../../components/common/Button";
import PhysiqueGoalCard from "../../components/profile/setup/PhysiqueGoalCard";
import { useAuth } from "../../contexts/AuthContext";
import useProfileSetup from "../../hooks/useProfileSetup";

const goalsMap = [
  {
    heading: "Bulk",
    helperText: "Build muscle and strength",
  },
  { heading: "Cut", helperText: "Loose fat and get lean" },
  { heading: "Maintain", helperText: "Maintain current physique" },
];

const PhysiqueGoalSetup: React.FC = () => {
  const { colors } = useTheme();
  const { skipSetupProfile } = useAuth();
  const [data, setData] = useState<{goal: string}>({goal: ""});
  const {mutate, isPending} = useProfileSetup({
    url: "health/fitness/goal/edit/",
    onSuccessFn: () => (skipSetupProfile ? skipSetupProfile() : null)
  })
  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      paddingHorizontal: 20,
    },
    headingText: {
      fontSize: 20,
      textAlign: "center",
      color: colors.primaryText,
      fontWeight: "500",
      fontFamily: "RobotoBold",
    },
    body: {
      flex: 1,
    },
    formWrapper: {
      flex: 1,
      gap: 20,
      marginTop: 20,
    },
  });

  const selectGoal = (name: string) => {
    setData({goal: name});
  };

  return (
    <Screen>
      <View style={styles.wrapper}>
        <Text style={styles.headingText}>What is your current goal?</Text>
        <View style={styles.body}>
          <View style={styles.formWrapper}>
            {goalsMap.map((item, index) => (
              <PhysiqueGoalCard
                onPress={selectGoal}
                key={index}
                heading={item.heading}
                helperText={item.helperText}
                isActive={data.goal === item.heading}
              />
            ))}
          </View>
        </View>
        <View>
          <Button
            onPress={() => mutate(data)}
            text="Done"
            buttonStyles={{ width: "100%" }}
            loading={isPending}

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

export default PhysiqueGoalSetup;

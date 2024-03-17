import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import Screen from "../../components/common/Screen";
import PhysiqueGoalCard from "../../components/profile/setup/PhysiqueGoalCard";
import useProfileSetup from "../../hooks/useProfileSetup";
import AuthStackHeader from "../../components/authentication/AuthStackHeader";
import SetupScreenHeader from "../../components/profile/setup/SetupScreenHeader";
import SetupScreenFooterBtns from "../../components/profile/setup/SetupScreenFooterBtns";
import { useAuth } from "../../contexts/AuthContext";

const goalsMap = [
  { heading: "Maintain", helperText: "Maintain current physique" },

  {
    heading: "Bulk",
    helperText: "Build muscle and strength",
  },
  { heading: "Cut", helperText: "Loose fat and get lean" },
];

const PhysiqueGoalSetup: React.FC = () => {
  const [data, setData] = useState<string>("");
  const { skipSetupProfile } = useAuth();

  const { mutate, isPending } = useProfileSetup({
    url: "health/fitness/goal/edit/",
    onSuccessFn: () => (skipSetupProfile ? skipSetupProfile() : null),
  });
  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      paddingHorizontal: 20,
    },

    formWrapper: {
      flex: 2,
      gap: 20,
      marginTop: 30,
    },
  });

  const selectGoal = (name: string) => {
    setData(name);
  };

  return (
    <>
      <AuthStackHeader />
      <Screen>
        <View>
          <SetupScreenHeader
            header="What is your current goal?"
            subheader="We ask this so we can calculate your needed calorie intake."
          />
        </View>

        <View style={styles.formWrapper}>
          {goalsMap.map((item, index) => (
            <PhysiqueGoalCard
              onPress={selectGoal}
              key={index}
              heading={item.heading}
              helperText={item.helperText}
              isActive={data === item.heading}
            />
          ))}
        </View>
        <View style={{ flex: 1 }}>
          <SetupScreenFooterBtns
            submitFn={() => mutate(data)}
            pendingSubmit={isPending}
            disabledSubmit={data === ""}
          />
        </View>
      </Screen>
    </>
  );
};

export default PhysiqueGoalSetup;

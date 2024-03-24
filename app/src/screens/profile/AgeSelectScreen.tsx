import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Screen from "../../components/common/Screen";
import SetupScreenHeader from "../../components/profile/setup/SetupScreenHeader";
import SetupScreenFooterBtns from "../../components/profile/setup/SetupScreenFooterBtns";
import AuthStackHeader from "../../components/authentication/AuthStackHeader";
import useProfileSetup from "../../hooks/services/useProfileSetup";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ProfileSetupStackParamsList } from "../../Stacks/ProfileSetupStack";
import DateInput from "../../components/common/DateInput";

const AgeSelectScreen: React.FC = () => {
  const [birthDate, setBirthDate] = useState<Date>(new Date());
  const navigation =
    useNavigation<StackNavigationProp<ProfileSetupStackParamsList>>();
  const { mutate, isPending } = useProfileSetup({
    url: "profile/setup/birthday/",
    onSuccessFn: () => navigation.navigate("ActivitySetup"),
  });
  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      marginTop: 20,
    },
  });

  return (
    <>
      <AuthStackHeader />
      <Screen>
        <View style={styles.wrapper}>
          <SetupScreenHeader
            header="What is your birthdate ?"
            subheader="By providing your age, we can calculate your needed macros."
          />
        </View>
        <View
          style={{ flex: 1, justifyContent: "center",  }}
        >
          <DateInput value={birthDate} onChange={(value: Date) => setBirthDate(value)} label="Birthday" />
        </View>
        <View style={{ flex: 1 }}>
          <SetupScreenFooterBtns
            submitFn={() => mutate(birthDate)}
            pendingSubmit={false}
          />
        </View>
      </Screen>
    </>
  );
};

export default AgeSelectScreen;

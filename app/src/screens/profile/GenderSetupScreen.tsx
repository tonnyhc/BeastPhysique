import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import GenderSelect from "../../components/profile/setup/GenderSelect";
import Screen from "../../components/common/Screen";
import useProfileSetup from "../../hooks/useProfileSetup";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ProfileSetupStackParamsList } from "../../Stacks/ProfileSetupStack";
import SetupScreenHeader from "../../components/profile/setup/SetupScreenHeader";
import SetupScreenFooterBtns from "../../components/profile/setup/SetupScreenFooterBtns";
import AuthStackHeader from "../../components/authentication/AuthStackHeader";

const GenderSetupScreen: React.FC = () => {
  const navigation =
    useNavigation<StackNavigationProp<ProfileSetupStackParamsList>>();
  const [gender, setGender] = useState<"Man" | "Woman">("Man");
  const { mutate, isPending } = useProfileSetup({
    url: "profile/setup/gender/",
    onSuccessFn: () => navigation.navigate("AgeSelectScreen"),
  });
  const styles = StyleSheet.create({
    wrapper: {
      marginTop: 20,
      flex: 1,
    },
  });

  return (
    <>
      <AuthStackHeader />
      <Screen>
        <View style={styles.wrapper}>
          <View style={{ flex: 1 }}>
            <SetupScreenHeader
              header="What is your gender?"
              subheader="We ask for your gender so we can calculate your needed macros, and give you the best workouts for you."
            />
          </View>

          <View style={{ flex: 1, justifyContent: 'center' }}>
            <GenderSelect
              gender={gender}
              onChange={(value: "Man" | "Woman") => setGender(value)}
            />
          </View>
          <View style={{ flex: 1 }}>
            <SetupScreenFooterBtns
              pendingSubmit={isPending}
              submitFn={() => mutate(gender)}
            />
          </View>
        </View>
      </Screen>
    </>
  );
};

export default GenderSetupScreen;

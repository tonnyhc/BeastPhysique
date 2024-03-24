import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import AuthStackHeader from "../../components/authentication/AuthStackHeader";
import Screen from "../../components/common/Screen";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ProfileSetupStackParamsList } from "../../Stacks/ProfileSetupStack";
import useProfileSetup from "../../hooks/services/useProfileSetup";
import SetupScreenHeader from "../../components/profile/setup/SetupScreenHeader";
import SetupScreenFooterBtns from "../../components/profile/setup/SetupScreenFooterBtns";

import PickerSelect from "../../components/common/PickerSelect";
import {
  checkForEmptyValuesInObject,
  generateHeightArray,
  generateWeightArray,
} from "../../utils/helperFunctions";

const MeasuresSetup: React.FC = () => {
  const navigation =
    useNavigation<StackNavigationProp<ProfileSetupStackParamsList>>();
  const [data, setData] = useState<{ height: string; weight: string }>({
    height: "",
    weight: "",
  });

  const { mutate, isPending } = useProfileSetup({
    url: "health/measures/edit/",
    onSuccessFn: () => navigation.navigate("GenderSelectScreen"),
  });

  const emptyFields = checkForEmptyValuesInObject(data);

  const heights = generateHeightArray();
  const pickerHeightItems = heights.map((height) => ({
    value: String(height.centimeters),
    label: `${String(height.centimeters)} cm`,
  }));

  const weights = generateWeightArray();
  const pickerWeightItems = weights.map((weight) => ({
    value: String(weight.kilograms),
    label: `${String(weight.kilograms)} kg`,
  }));

  return (
    <>
      <AuthStackHeader />

      <Screen>
        <SetupScreenHeader
          header="Profile info"
          subheader="Your profile info helps us calculate your needed macro nutrients and give you the best workouts. To choose who see this info, go to setting in your Account > Social & Sharing > Privacy. "
        />

        <View style={{ gap: 16, marginTop: 50 }}>
          <PickerSelect
            value={data.height ? `${data.height}cm` : ""}
            onChange={(value: string) =>
              setData((oldData) => ({
                ...oldData,
                height: value,
              }))
            }
            label="Height"
            items={pickerHeightItems}
          />
          <PickerSelect
            value={data.weight ? `${data.weight}kg` : ""}
            onChange={(value: string) =>
              setData((oldData) => ({
                ...oldData,
                weight: value,
              }))
            }
            label="Weight"
            items={pickerWeightItems}
          />
        </View>

        <SetupScreenFooterBtns
          disabledSubmit={emptyFields}
          pendingSubmit={isPending}
          submitFn={() => mutate(data)}
        />
      </Screen>
    </>
  );
};

export default MeasuresSetup;

const styles = StyleSheet.create({});

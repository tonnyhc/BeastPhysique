import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import React, { useEffect, useState } from "react";
import Screen from "../../components/common/Screen";
import ReusableInput from "../../components/common/ReusableInput";
import Button from "../../components/common/Button";
import ChevronRight from "../../icons/ChevronRight";
import { useTheme } from "../../contexts/ThemeContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { ProfileSetupStackParamsList } from "../../Stacks/ProfileSetupStack";
import PickerSelect from "../../components/common/PickerSelect";
import {
  checkForEmptyValuesInObject,
  generateHeightArray,
  generateWeightArray,
} from "../../utils/helperFunctions";
import { useAuth } from "../../contexts/AuthContext";
import useMeasuresSetup from "../../hooks/useMeasuresSetup";
import useProfileSetup from "../../hooks/useProfileSetup";

interface MeasuresSetupProps {
  navigation: StackNavigationProp<ProfileSetupStackParamsList>;
}

const MeasuresSetup: React.FC<MeasuresSetupProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const { skipSetupProfile } = useAuth();
  const [data, setData] = useState<{ height: string; weight: string }>({
    height: "",
    weight: "",
  });

  const {mutate, isPending} = useProfileSetup({
    url: "health/measures/edit/",
    onSuccessFn: () => navigation.navigate("ActivitySetup"),
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

  const styles = StyleSheet.create({
    wrapper: {
      paddingHorizontal: 20,
      flex: 1,
    },
    formWrapper: {
      flex: 1,
      gap: 10,
    },
  });
  return (
    <Screen>
      <View style={styles.wrapper}>
        <View style={styles.formWrapper}>
          <PickerSelect
            items={pickerHeightItems}
            label="Height"
            placeholder="Select height"
            onChange={(value: string) =>
              setData((oldData) => ({
                ...oldData,
                height: value,
              }))
            }
          />
          <PickerSelect
            items={pickerWeightItems}
            label="Weight"
            placeholder="Select weight"
            onChange={(value: string) =>
              setData((oldData) => ({
                ...oldData,
                weight: value,
              }))
            }
          />
        </View>
        <View>
          <Button
            buttonStyles={{ width: "100%" }}
            text="Continue"
            rightIcon={<ChevronRight color={colors.white} size={18} />}
            onPress={() => mutate(data)}
            disabled={emptyFields}
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

export default MeasuresSetup;

import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import React from "react";
import Screen from "../../components/common/Screen";
import ReusableInput from "../../components/common/ReusableInput";
import Button from "../../components/common/Button";
import ChevronRight from "../../icons/ChevronRight";
import { useTheme } from "../../contexts/ThemeContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { ProfileSetupStackParamsList } from "../../Stacks/ProfileSetupStack";
import PickerSelect from "../../components/common/PickerSelect";
import {
  generateHeightArray,
  generateWeightArray,
} from "../../utils/helperFunctions";

interface MeasuresSetupProps {
  navigation: StackNavigationProp<ProfileSetupStackParamsList>;
}

const MeasuresSetup: React.FC<MeasuresSetupProps> = ({ navigation }) => {
  const { colors } = useTheme();

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
          />
          <PickerSelect
            items={pickerWeightItems}
            label="Weight"
            placeholder="Select weight"
          />
        </View>
        <View>
          <Button
            buttonStyles={{ width: "100%" }}
            text="Continue"
            rightIcon={<ChevronRight color={colors.white} size={18} />}
            onPress={() => navigation.navigate("ActivitySetup")}
          />
          <Button
            text="SET UP LATER IN PROFILE"
            type="text"
            onPress={() => {}}
          />
        </View>
      </View>
    </Screen>
  );
};

export default MeasuresSetup;

import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import React from "react";
import Screen from "../../components/common/Screen";
import { useTheme } from "../../contexts/ThemeContext";
import Button from "../../components/common/Button";
import ReusableInput from "../../components/common/ReusableInput";
import RNDateTimePicker from "@react-native-community/datetimepicker";

import { StackNavigationProp } from "@react-navigation/stack";
import { ProfileSetupStackParamsList } from "../../Stacks/ProfileSetupStack";
import ChevronRight from "../../icons/ChevronRight";
import PickerSelect from "../../components/common/PickerSelect";
import { gendersForPicker } from "../../utils/mapData";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

interface NameBirthdaySetupProps {
  navigation: StackNavigationProp<ProfileSetupStackParamsList>;
}

const NameBirthdaySetup: React.FC<NameBirthdaySetupProps> = ({
  navigation,
}) => {
  const { sizes, colors } = useTheme();
  const styles = StyleSheet.create({
    wrapper: {
      paddingHorizontal: 20,
      // flex: 1,
      height: '100%',
      justifyContent: "space-between",
      gap: 50
    },

    formWrapper: {
      gap: 10,
    },
  });

  return (
    <Screen>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "height" : "height"}
        style={styles.wrapper}
      >
        <View style={styles.formWrapper}>
          <ReusableInput
            label="Full name"
            placeholder="Enter your full name"
            value=""
            onChange={() => {}}
          />

          <View style={{ gap: 10, justifyContent: "center" }}>
            <Text>Date of birth</Text>
            <RNDateTimePicker
              style={{ alignSelf: "flex-start" }}
              value={new Date()}
              mode={"date"}
              onChange={(event, value) => console.log(value)}
            />
          </View>
          <PickerSelect
            items={gendersForPicker}
            label="Gender"
            placeholder="Select gender..."
          />
        </View>
        <View style={{ gap: 10 }}>
          <Button
            buttonStyles={{ width: "100%" }}
            text="Continue"
            rightIcon={<ChevronRight color={colors.white} size={18} />}
            onPress={() => navigation.navigate("MeasuresSetup")}
          />
          <Button
            text="SET UP LATER IN PROFILE"
            type="text"
            onPress={() => {}}
          />
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default NameBirthdaySetup;

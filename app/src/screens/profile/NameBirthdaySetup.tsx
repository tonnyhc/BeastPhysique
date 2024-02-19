import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
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
import { useAuth } from "../../contexts/AuthContext";
import {
  checkForEmptyValuesInObject,
  removeTimeFromDate,
} from "../../utils/helperFunctions";
import { ProfileDataForSetup } from "../../ts/types";
import useSetupProfileData from "../../hooks/useSetupProfileData";
import useProfileSetup from "../../hooks/useProfileSetup";

interface NameBirthdaySetupProps {
  navigation: StackNavigationProp<ProfileSetupStackParamsList>;
}

const NameBirthdaySetup: React.FC<NameBirthdaySetupProps> = ({
  navigation,
}) => {
  const { skipSetupProfile } = useAuth();
  const { sizes, colors } = useTheme();
  const [data, setData] = useState<ProfileDataForSetup>({
    full_name: "",
    birthday: new Date(),
    gender: "",
  });
  const emptyFields = checkForEmptyValuesInObject(data);

  const { mutate, isPending} = useProfileSetup({
    url: "profile/edit/",
    onSuccessFn: () => navigation.navigate("MeasuresSetup"),
  });
  const styles = StyleSheet.create({
    wrapper: {
      paddingHorizontal: 20,
      // flex: 1,
      height: "100%",
      justifyContent: "space-between",
      gap: 50,
    },

    formWrapper: {
      gap: 10,
    },
  });

  const onSubmit = () => {
    const body: any = { ...data };
    const dateWithoutTime = removeTimeFromDate(body.birthday);
    body.birthday = dateWithoutTime;

    mutate(body);
  };

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
            value={data.full_name}
            onChange={(value: string) =>
              setData((oldData) => ({
                ...oldData,
                full_name: value,
              }))
            }
          />

          <View style={{ gap: 10, justifyContent: "center" }}>
            <Text>Date of birth</Text>
            <RNDateTimePicker
              style={{ alignSelf: "flex-start" }}
              value={data.birthday}
              mode={"date"}
              maximumDate={new Date()}
              onChange={(_: any, date?: Date) =>
                setData((oldData) => ({
                  ...oldData,
                  birthday: date as Date,
                }))
              }
            />
          </View>
          <PickerSelect
            items={gendersForPicker}
            label="Gender"
            placeholder="Select gender..."
            onChange={(value: string) =>
              setData((oldData) => ({
                ...oldData,
                gender: value,
              }))
            }
          />
        </View>
        <View style={{ gap: 10 }}>
          <Button
            buttonStyles={{ width: "100%" }}
            text="Continue"
            rightIcon={<ChevronRight color={colors.white} size={18} />}
            onPress={() => onSubmit()}
            disabled={emptyFields}
            loading={isPending}
          />
          <Button
            text="SET UP LATER IN PROFILE"
            type="text"
            onPress={() => (skipSetupProfile ? skipSetupProfile() : null)}
          />
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default NameBirthdaySetup;

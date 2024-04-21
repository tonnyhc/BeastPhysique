import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Screen from "../../../components/common/Screen";
import DateInput from "../../../components/common/DateInput";
import Button from "../../../components/common/Button";
import useProfileServices from "../../../hooks/services/useProfileServices";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MoreStackParamsList } from "../../../Stacks/MoreStack";

const BirthdayAccountSettingsScreen: React.FC = () => {
  const { fetchBirthday, updateBirthday } = useProfileServices();
  const navigation = useNavigation<StackNavigationProp<MoreStackParamsList>>();
  const [birthday, setBirthday] = useState<Date>(new Date());
  const { data: queryData, isLoading } = useQuery({
    queryFn: fetchBirthday,
    queryKey: ["profile-birthday"],
    initialData: { birthday: new Date() },
  });
  const {
    mutate,
    data: mutateData,
    isPending,
  } = useMutation({
    mutationFn: () => {
      const year = birthday.getFullYear();
      const month = birthday.getMonth() + 1;
      const day = birthday.getDate();
      const newBirthday = `${year}-${month}-${day}`;
      return updateBirthday(newBirthday);
    },
    mutationKey: ["profile-birthday"],
    onSuccess: () => navigation.replace("AccountSettings"),
  });
  useEffect(() => {
    const date = new Date(queryData.birthday);

    setBirthday(date);
  }, [queryData]);
  return (
    <Screen>
      <View style={{ flex: 1 }}>
        <DateInput
          value={birthday}
          label="Birthday"
          onChange={(value) => setBirthday(value)}
        />
        <View style={{ marginTop: 150 }}>
          <Button
            text="Done"
            // disabled={disabledSubmit}
            onPress={() => mutate()}
            loading={isPending}
          />
        </View>
      </View>
    </Screen>
  );
};

export default BirthdayAccountSettingsScreen;

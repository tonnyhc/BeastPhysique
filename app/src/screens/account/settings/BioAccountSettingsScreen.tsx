import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Screen from "../../../components/common/Screen";
import TestInput from "../../../components/common/TestInput";
import Button from "../../../components/common/Button";
import useProfileServices from "../../../hooks/services/useProfileServices";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MoreStackParamsList } from "../../../Stacks/MoreStack";

const BioAccountSettingsScreen: React.FC = () => {
  const { fetchBio, updateBio } = useProfileServices();
  const navigation = useNavigation<StackNavigationProp<MoreStackParamsList>>();
  const [newBio, setNewBio] = useState<string>("");

  const { data: queryData, isLoading } = useQuery({
    queryFn: fetchBio,
    queryKey: ["profile-bio"],
    initialData: {
      bio: "",
      max_length_bio: 150,
    },
  });
  const {
    mutate,
    data: mutationData,
    isPending,
  } = useMutation({
    mutationFn: () => updateBio(newBio),
    mutationKey: ["update-bio"],
    onSuccess: () => navigation.replace("AccountSettings"),
  });
  useEffect(() => {
    setNewBio(queryData.bio ? queryData.bio : "");
  }, [queryData]);

  const disabledSubmit = newBio === queryData.bio;

  return (
    <Screen>
      <View style={{ flex: 1 }}>
        <TestInput
          multiline={true}
          value={newBio}
          placeholder="Enter bio..."
          label="Bio"
          onChange={(value: string) => setNewBio(value)}
          maxLength={queryData.max_length_bio}
          helperTextRight={`${newBio.length}/${queryData.max_length_bio}`}
        />
        <View style={{ marginTop: 150 }}>
          <Button
            text="Done"
            disabled={disabledSubmit}
            onPress={() => mutate()}
            loading={isPending}
          />
        </View>
      </View>
    </Screen>
  );
};

export default BioAccountSettingsScreen;

const styles = StyleSheet.create({});

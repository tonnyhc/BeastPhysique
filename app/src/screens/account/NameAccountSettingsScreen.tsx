import { ActivityIndicatorBase, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import Screen from "../../components/common/Screen";
import TestInput from "../../components/common/TestInput";
import Button from "../../components/common/Button";
import useProfileServices from "../../hooks/services/useProfileServices";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MoreStackParamsList } from "../../Stacks/MoreStack";
import { ActivityIndicator } from "react-native-paper";

const NameAccountSettingsScreen: React.FC = () => {
  const [newName, setNewName] = useState<string>("");
  const { fetchFullName, updateFullName } = useProfileServices();
  const navigation = useNavigation<StackNavigationProp<MoreStackParamsList>>();
  const {
    mutate,
    data: mutationData,
    isPending,
  } = useMutation({
    mutationFn: () => updateFullName(newName),
    mutationKey: ["update_full_name"],
    onSuccess: () => navigation.goBack(),
  });
  const { data, isLoading } = useQuery({
    queryFn: fetchFullName,
    queryKey: ["full_name"],
    initialData: {
      full_name: "",
      max_length_full_name: 150,
    },
  });
  useEffect(() => {
    setNewName(data.full_name);
  }, [data]);

  const disabledSubmit = data.full_name === newName;

  return (
    <Screen>
      {isLoading ? <ActivityIndicator /> : null}
      <View style={{ flex: 1 }}>
        <TestInput
          maxLength={data.max_length_full_name}
          value={newName}
          placeholder="Enter name..."
          label="Name"
          onChange={(value: string) => setNewName(value)}
          helperTextRight={`${newName.length}/${data.max_length_full_name}`}
        />
        <View style={{ marginTop: 150 }}>
          <Button
            disabled={disabledSubmit}
            text="Done"
            onPress={() => mutate()}
            loading={isPending}
          />
        </View>
      </View>
    </Screen>
  );
};

export default NameAccountSettingsScreen;

const styles = StyleSheet.create({});

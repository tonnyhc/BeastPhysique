import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import TestInput from "../../../components/common/TestInput";
import Screen from "../../../components/common/Screen";
import Button from "../../../components/common/Button";
import useProfileServices from "../../../hooks/services/useProfileServices";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MoreStackParamsList } from "../../../Stacks/MoreStack";
import { useTranslation } from "react-i18next";

const UsernameAccountSettingsScreen: React.FC = () => {
  const {t} = useTranslation();
  const [newUsername, setNewUsername] = useState<string>("");
  const { fetchUsername, updateUsername } = useProfileServices();
  const navigation =
    useNavigation<StackNavigationProp<MoreStackParamsList>>();
  const { data: queryData, isLoading } = useQuery({
    queryFn: fetchUsername,
    queryKey: ["username"],
    initialData: {
      username: "",
      max_length_username: 30,
    },
  });
  const {
    mutate,
    data: mutationData,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: () => updateUsername(newUsername),
    mutationKey: ["update-username"],
    onSuccess: () => navigation.replace("AccountSettings")
  });
  useEffect(() => {
    setNewUsername(queryData?.username);
  }, [queryData]);
  const disabledSubmit = queryData.username === newUsername;
  return (
    <Screen>
      <View style={{ flex: 1 }}>
        <TestInput
          error={error ? (error as unknown as string) : undefined}
          keyboardType="ascii-capable"
          value={newUsername}
          maxLength={queryData.max_length_username}
          placeholder="Enter username..."
          label={t('common.username')}
          onChange={(value: string) => setNewUsername(value)}
          helperTextRight={`${newUsername.length}/${queryData.max_length_username}`}
        />
        <View style={{ marginTop: 150 }}>
          <Button
            disabled={disabledSubmit}
            text={t('common.done')}
            onPress={() => mutate()}
            loading={isLoading}
          />
        </View>
      </View>
    </Screen>
  );
};

export default UsernameAccountSettingsScreen;

const styles = StyleSheet.create({});

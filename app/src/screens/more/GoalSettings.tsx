import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Screen from "../../components/common/Screen";
import PhysiqueGoalCard from "../../components/profile/setup/PhysiqueGoalCard";
import { physiqueGoalsMap } from "../../utils/mapData";
import useProfileSetup from "../../hooks/services/useProfileSetup";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MoreStackParamsList } from "../../Stacks/MoreStack";
import Button from "../../components/common/Button";
import { useQuery } from "@tanstack/react-query";
import useApi from "../../hooks/services/useApi";
import { useAuth } from "../../contexts/AuthContext";

const GoalSettings: React.FC = () => {
  const [data, setData] = useState<string>("");
  const navigation = useNavigation<StackNavigationProp<MoreStackParamsList>>();
  const { token } = useAuth();
  const { get } = useApi(token as string);

  const fetchGoal = async () => {
    const data = await get("health/fitness/details/goal/");
    return data;
  };

  const { data: queryData, isLoading } = useQuery({
    queryFn: fetchGoal,
    queryKey: ["physiqueGoal"],
  });

  useEffect(() => {
    setData(queryData);
  }, [queryData]);

  const { mutate, isPending } = useProfileSetup({
    url: "health/fitness/goal/edit/",
    onSuccessFn: () => {
      return navigation.goBack();
    },
  });
  const selectGoal = (value: string) => {
    setData(value);
  };
  return (
    <Screen>
      <View
        style={{ flex: 1, justifyContent: "space-between", paddingBottom: 80 }}
      >
        <View style={{ gap: 10, marginTop: 20 }}>
          {physiqueGoalsMap.map((item, index) => (
            <PhysiqueGoalCard
              onPress={() => selectGoal(item.heading)}
              key={index}
              heading={item.heading}
              helperText={item.helperText}
              isActive={data === item.heading}
            />
          ))}
        </View>
        <Button text="Done" loading={isPending} onPress={() => mutate(data)} />
      </View>
    </Screen>
  );
};

export default GoalSettings;

const styles = StyleSheet.create({});

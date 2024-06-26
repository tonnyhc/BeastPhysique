import { Dimensions, ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import Screen from "../../components/common/Screen";
import { useTheme } from "../../contexts/ThemeContext";
import WeightCard from "../../components/more-screen/weight-settings/WeightCard";

import { LineChart } from "react-native-chart-kit";
import WeightLogs from "../../components/more-screen/weight-settings/WeightLogs";
import useMeasuresServices from "../../hooks/services/useMeasureServices";
import { useQuery } from "@tanstack/react-query";
import WeightEditModal from "../../components/more-screen/weight-settings/WeightEditModal";
import { useTranslation } from "react-i18next";

const WeightSettings: React.FC = () => {
  const { colors } = useTheme();
  const { fetchWeightData } = useMeasuresServices();
  const [editModal, setEditModal] = useState<boolean>(false);
  const {t} = useTranslation();

  const { data, isLoading } = useQuery({
    queryFn: () => fetchWeightData(),
    queryKey: ["weightData"],
    initialData: {
      last_weigh_in: "",
      weight: 0,
      logs: [{ weight: 0, date: "" }],
    },
  });

  const convertLogsToChartData = () => {
    let finalArr = [];
    if (data) {
      for (let log of data?.logs) {
        finalArr.push(log.weight);
      }
    }

    return finalArr;
  };

  const dataForChart = convertLogsToChartData();

  const styles = StyleSheet.create({});

  return (
    <Screen>
      <WeightEditModal
        weight={data.weight.toString()}
        isVisible={editModal}
        closeModal={() => setEditModal(false)}
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}>
        <WeightCard
          onPress={() => setEditModal(true)}
          weight={data?.weight.toFixed(1) as string}
          helper_text={`${t('screens.weight.lastWeighIn')} - ${data?.last_weigh_in as string}`}
        />
        <LineChart
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
              {
                data: dataForChart,
              },
            ],
          }}
          width={Dimensions.get("window").width} // from react-native
          height={280}
          yAxisLabel=""
          yAxisSuffix="kg"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: colors.bg,
            backgroundGradientTo: colors.bg,
            decimalPlaces: 1, // optional, defaults to 2dp
            color: (opacity = 1) => colors.cardBackground,
            labelColor: (opacity = 1) => colors.secondaryText,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "4",
              strokeWidth: "2",

              stroke: "#FFA84A",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
        <WeightLogs logs={data?.logs as []} />
      </ScrollView>
    </Screen>
  );
};

export default WeightSettings;

import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { LineChart } from "react-native-chart-kit";
import { ExerciseSetProgressArray } from '../../../ts/types';


interface ExerciseProgressLineChartProps {
    data: ExerciseSetProgressArray
}

const ExerciseProgressLineChart:React.FC<ExerciseProgressLineChartProps> = ({
    data
}) => {
    const modifiedData: number[] =data.map((item) => item.weight)
    const labelsArr: string[] = []
    for (let item of data){
        const date = item.updated_at.split(' ');
        labelsArr.push(date[1])
    }
  return (
    <View>
      <LineChart
        data={{
          labels: labelsArr,
          datasets: [
            {
              data: modifiedData
            },
          ],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisLabel=""
        yAxisSuffix=" kg"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          // backgroundColor: colors.blueText,
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  )
}

export default ExerciseProgressLineChart
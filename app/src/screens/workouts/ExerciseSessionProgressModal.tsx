import { View, Text, Dimensions, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import useFetchExerciseSessionProgress from "../../hooks/useFetchExerciseSessionProgress";
import ExerciseProgressLineChart from "../../components/workouts/exercise/ExerciseProgressLineChart";
import { ExerciseSetProgressArray } from "../../ts/types";
import Chip from "../../components/common/Chip";

interface ExerciseSessionProgressModalProps {}

const ExerciseSessionProgressModal: React.FC<
  ExerciseSessionProgressModalProps
> = () => {
  const { colors } = useTheme();
  const { data } = useFetchExerciseSessionProgress(30);
  const [activeSetIndex, setActiveSetIndex] = useState<number>(0)
  const styles = StyleSheet.create({
    wrapper: {
        paddingVertical: 10,
        backgroundColor: colors.bg
    },
    heading:{
        fontSize: 28,
        alignSelf: 'center',
        fontWeight: "500",
        color: colors.primaryText,
        marginBottom: 10
    },
    chipsWrapper: {
      flexDirection: "row",
      flexWrap: 'wrap',
      gap: 10,
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      marginBottom: 20
    },
  });
  return (
    <View style={styles.wrapper}>
        <Text style={styles.heading}>Progress for each set</Text>
      <View style={styles.chipsWrapper}>
        {data.map((set: ExerciseSetProgressArray, index: number) => (
          <Chip text={`Set ${index + 1}`} isActive={activeSetIndex === index} onPress={() => setActiveSetIndex(index)} />
        ))}
      </View>
      {data[activeSetIndex].length > 0 ? 
      <ExerciseProgressLineChart data={data[activeSetIndex]}/>
      :
      <Text>No set history</Text>
    }
      
    </View>
  );
};

export default ExerciseSessionProgressModal;

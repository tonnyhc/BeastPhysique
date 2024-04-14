import { StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import useExerciseService from "../../hooks/services/useExerciseService";
import Screen from "../../components/common/Screen";
import { ResizeMode, Video } from "expo-av";
import { useTheme } from "../../contexts/ThemeContext";

interface ExerciseDetailsScreen {
  route: { params: { exerciseId: number } };
}

const ExerciseDetailsScreen: React.FC<ExerciseDetailsScreen> = ({ route }) => {
  const exerciseId = route.params.exerciseId;
  const { colors } = useTheme();
  const { fetchExerciseDetails } = useExerciseService();
  const { data, isLoading, isError } = useQuery({
    queryFn: () => fetchExerciseDetails(exerciseId),
    queryKey: [`exerciseDetails-${exerciseId}`],
  });
  const video = useRef(null);

  const styles = StyleSheet.create({
    video: {
      height: 280,
    },

    exerciseName: {
      fontSize: 24,
      textAlign: "center",
      fontFamily: "RobotoMedium",
      color: colors.primaryText,
    },
    propertyWrapper: {
      borderBottomWidth: 0.5,
      borderBottomColor: colors.helperText,
      paddingVertical: 12,
    },
    propertyHeader: {
      fontSize: 18,
      fontFamily: "RobotoMedium",
      color: colors.helperText,
    },
    muscleGroupWrapper: {
      flexDirection: "row",
      gap: 8,
      alignItems: "center",
    },
    propertyText: {
      fontSize: 16,
      fontFamily: "RobotoRegular",
      color: colors.helperText,
    },
    muscleGroupBullet: {
      fontSize: 8,
      color: colors.helperText,
      fontFamily: "RobotoRegular",
    },
  });

  return (
    <>
      <Video
        style={styles.video}
        ref={video}
        isLooping={true}
        useNativeControls={true}
        resizeMode={ResizeMode.CONTAIN}
        source={{ uri: data?.video_tutorial }}
      />
      <Screen>
        <Text style={styles.exerciseName}>{data?.name}</Text>
        {/* muscle groups */}
        <View style={styles.propertyWrapper}>
          <Text style={styles.propertyHeader}>Targeted muscle groups:</Text>
          <View style={{ paddingHorizontal: 8, paddingVertical: 8, gap: 8 }}>
            {data?.targeted_muscle_groups?.map((item) => (
              <View style={styles.muscleGroupWrapper}>
                <Text style={styles.muscleGroupBullet}>{"\u2B24"}</Text>
                <Text style={styles.propertyText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.propertyWrapper}>
          <Text style={styles.propertyHeader}>Information:</Text>
          <View style={{ paddingVertical: 8, paddingHorizontal: 8 }}>
            <Text style={styles.propertyText}>{data?.information}</Text>
          </View>
        </View>
        <View style={styles.propertyWrapper}>
          <Text style={styles.propertyHeader}>Pro TIPS:</Text>
          <View style={{ paddingVertical: 8, paddingHorizontal: 8 }}>
            <Text style={styles.propertyText}>{data?.tips}</Text>
          </View>
        </View>
      </Screen>
    </>
  );
};

export default ExerciseDetailsScreen;

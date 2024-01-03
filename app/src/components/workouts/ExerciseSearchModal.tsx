import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import React, { useDeferredValue, useEffect, useState } from "react";
import Screen from "../common/Screen";
import ReusableInput from "../common/ReusableInput";
import useExerciseService from "../../hooks/useExerciseService";
import { useMutation } from "@tanstack/react-query";
import { Exercise } from "../../ts/types";
import { useTheme } from "../../contexts/ThemeContext";

interface ExerciseSearchCardProps {
  exercise: Exercise;
}

const ExerciseSearchCard: React.FC<ExerciseSearchCardProps> = ({
  exercise,
}) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    cardWrapper: {
      borderWidth: .5,
      borderColor: colors.helperText,
      paddingVertical: 6,
      paddingHorizontal: 8,
      borderRadius: 8,
      flexDirection: "row",
      justifyContent: 'space-between'
    },
    exerciseInfoWrapper: {
        flex: 1
    },
    coverPhoto: {
      width: "100%",
      height: 150,
      objectFit: "contain",
    },
    heading: {
        fontSize: 22,
        lineHeight: 48,
    },
    helperText: {
        fontSize: 13,
        letterSpacing: .2,
        color: colors.helperText,
        flex: 1
    },
    tips: {
        fontSize: 12,
        color: colors.blueText,
        flexBasis: 'auto',
    }
  });
  return (
    <View style={styles.cardWrapper}>
      <View style={styles.exerciseInfoWrapper}>
        <Text style={styles.heading}>{exercise.name}</Text>
        <Text style={styles.helperText}>{exercise.information}</Text>
        <Text style={styles.tips}>{exercise.tips}</Text>
      </View>
      <View style={{flex: .8, alignItems: 'flex-end', justifyContent: 'flex-end'}}>
        <Image
          style={styles.coverPhoto}
          source={{ uri: exercise.cover_photo }}
        />
      </View>
    </View>
  );
};

// const exercisesMap = [
//   {
//     id: 2,
//     name: "Barbell Bench Press",
//     cover_photo:
//       "https://static.strengthlevel.com/images/illustrations/bench-press-1000x1000.jpg",
//     information:
//       "Primary worked muscles here are the chest, front delt and the triceps",
//     video_tutorial: "https://www.youtube.com/shorts/EdDqD4aKwxM",
//     tips: "Be carefull with the shoulders!",
//     created_at: "2023-10-19T19:12:16.967394+03:00",
//     is_published: false,
//     created_by: null,
//   },
//   {
//     id: 2,
//     name: "Barbell Bench Press",
//     cover_photo:
//       "https://static.strengthlevel.com/images/illustrations/bench-press-1000x1000.jpg",
//     information:
//       "Primary worked muscles here are the chest, front delt and the triceps",
//     video_tutorial: "https://www.youtube.com/shorts/EdDqD4aKwxM",
//     tips: "Be carefull with the shoulders!",
//     created_at: "2023-10-19T19:12:16.967394+03:00",
//     is_published: false,
//     created_by: null,
//   },
//   {
//     id: 2,
//     name: "Barbell Bench Press",
//     cover_photo:
//       "https://static.strengthlevel.com/images/illustrations/bench-press-1000x1000.jpg",
//     information:
//       "Primary worked muscles here are the chest, front delt and the triceps",
//     video_tutorial: "https://www.youtube.com/shorts/EdDqD4aKwxM",
//     tips: "Be carefull with the shoulders!",
//     created_at: "2023-10-19T19:12:16.967394+03:00",
//     is_published: false,
//     created_by: null,
//   },
// ];

const ExerciseSearchModal: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchExercise] = useExerciseService();
  const defferedSearch = useDeferredValue(searchValue);
  const { data, mutate, isPending } = useMutation({
    mutationKey: ["exercise"],
    mutationFn: () => searchExercise(searchValue),
  });
  useEffect(() => {
    mutate();
  }, [defferedSearch]);

  return (
    <Screen>
      <Text>Search exercise</Text>
      <ReusableInput
        value={searchValue}
        onChange={(value: string) => setSearchValue(value)}
        placeholder="Exercise name"
      />
      <FlatList
        contentContainerStyle={{ marginTop: 24, gap:14 }}
        keyExtractor={(item) => item.id.toString()}
        // numColumns={2}
        key={"exercisesSearchList"}
        data={data?.exercises}
        renderItem={({ item, index, separators }) => (
          <ExerciseSearchCard exercise={item} />
        )}
      />
    </Screen>
  );
};

export default ExerciseSearchModal;

import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useDeferredValue, useEffect, useState } from "react";
import Screen from "../../common/Screen";
import ReusableInput from "../../common/ReusableInput";
import useExerciseService from "../../../hooks/useExerciseService";
import { useMutation } from "@tanstack/react-query";
import { useTheme } from "../../../contexts/ThemeContext";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import Chip from "../../common/Chip";
import ExerciseSearchCard from "./ExerciseSearchCard";
import { Exercise } from "../../../ts/types";
import SubmitButton from "../../common/SubmitButton";
import { useCustomWorkoutPlan } from "../../../contexts/CustomWorkoutPlanContext";
import { useNavigation } from "@react-navigation/native";

const ExerciseSearchModal: React.FC = () => {
  const { colors } = useTheme();
  const { dispatch } = useCustomWorkoutPlan();
  const [searchValue, setSearchValue] = useState<string>("");
  const [filter, setFilter] = useState("exercises");
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const { searchExercise } = useExerciseService();
  const defferedSearch = useDeferredValue(searchValue);
  const { data, mutate, isPending } = useMutation({
    mutationKey: ["exercise"],
    mutationFn: () => searchExercise(searchValue),
  });
  useEffect(() => {
    mutate();
  }, [defferedSearch]);
  const navigation = useNavigation();

  const onSelectExercise = (exercise: Exercise) => {
    if (selectedExercises.includes(exercise)) {
      setSelectedExercises((prevSelected) =>
        prevSelected.filter(
          (exerciseFromArray) => exerciseFromArray !== exercise
        )
      );
    } else {
      setSelectedExercises((prevSelected) => [...prevSelected, exercise]);
    }
  };
  const addExercisesToState = () => {
    dispatch({
      type: "addExerciseToWorkout",
      payload: {
        workoutIndex: 0,
        exercises: selectedExercises,
      },
    });
    navigation.goBack();
  };

  const exercisesForFlatList =
    filter === "exercises" ? data?.exercises : data?.exercises_by_user;
  return (
    <Screen>
      <Text
        style={{ fontSize: 26, textAlign: "center", color: colors.primaryText }}
      >
        Search exercise
      </Text>
      <ReusableInput
        value={searchValue}
        onChange={(value: string) => setSearchValue(value)}
        placeholder="Exercise name"
        leftIcon={
          <MaterialCommunityIcons
            name="magnify"
            size={18}
            color={colors.primaryText}
          />
        }
      />
      {data && (
        <View
          style={{
            flexDirection: "row",
            marginTop: 12,
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", gap: 12 }}>
            <Chip
              text="Exercises"
              isActive={filter === "exercises"}
              onPress={() => setFilter("exercises")}
            />
            <Chip
              text="My exercises"
              isActive={filter === "myExercises"}
              onPress={() => setFilter("myExercises")}
            />
          </View>
          <View>
            <SubmitButton
              onPress={() => addExercisesToState()}
              text={`Select ${selectedExercises.length}`}
            />
          </View>
        </View>
      )}
      {isPending && <ActivityIndicator />}
      <FlatList
        contentContainerStyle={{ marginTop: 24, gap: 14 }}
        keyExtractor={(item) => item.id.toString()}
        key={"exercisesSearchList"}
        data={exercisesForFlatList}
        renderItem={({ item, index, separators }) => (
          <ExerciseSearchCard
            isSelected={selectedExercises.includes(item)}
            index={index}
            exercise={item}
            onSelectExercise={() => onSelectExercise(item)}
          />
        )}
      />
    </Screen>
  );
};

export default ExerciseSearchModal;

import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
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
import SubmitButton from "../../common/Button";
import { useCustomWorkoutPlan } from "../../../contexts/CustomWorkoutPlanContext";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

interface ExerciseSearchModalProps {
  route: { params: { workoutIndex: number } };
}

const ExerciseSearchModal: React.FC<ExerciseSearchModalProps> = ({
  route
}) => {
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
    const workoutIndex = route.params.workoutIndex
    dispatch({
      type: "addExerciseToWorkout",
      payload: {
        workoutIndex: workoutIndex,
        exercises: selectedExercises,
      },
    });
    navigation.goBack();
  };

  const FlatListHeader = () => {
    return (
      <>
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
          </View>
        )}
      </>
    );
  };

  const exercisesForFlatList =
    filter === "exercises" ? data?.exercises : data?.exercises_by_user;

  return (
    <View style={{ paddingHorizontal: 10, backgroundColor: colors.bg }}>
      {isPending && <ActivityIndicator />}
      <FlatList
        ListHeaderComponent={() => <FlatListHeader />}
        contentContainerStyle={{ gap: 14 }}
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
      <View style={{ position: "absolute", bottom: 20, left: 0, right: 0 }}>
        <SubmitButton
          onPress={() => addExercisesToState()}
          text={`Select ${selectedExercises.length}`}
        />
      </View>
    </View>
  );
};

export default ExerciseSearchModal;

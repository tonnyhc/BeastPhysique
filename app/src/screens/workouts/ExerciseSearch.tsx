import { ActivityIndicator, View } from "react-native";
import React, { useDeferredValue, useEffect, useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import useExerciseService from "../../hooks/services/useExerciseService";
import { ExerciseFromSearch, MuscleGroupWithExercises } from "../../ts/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import Button from "../../components/common/Button";
import TestInput from "../../components/common/TestInput";
import SearchIcon from "../../icons/SearchIcon";
import { StackNavigationProp } from "@react-navigation/stack";
import { CreateWorkoutStackParamsList } from "../../Stacks/CreateWorkoutStack";
import { useCreateWorkoutContext } from "../../contexts/CreateWorkoutContext";
import Screen from "../../components/common/Screen";
import ExerciseSearchMuscleGroup from "../../components/workouts/exercise/ExerciseSearchMuscleGroup";

const ExerciseSearch: React.FC = ({}) => {
  const { colors } = useTheme();
  const { addExercise } = useCreateWorkoutContext();
  const [searchValue, setSearchValue] = useState<string>("");
  const [filter, setFilter] = useState("exercises");
  const [selectedExercises, setSelectedExercises] = useState<
    ExerciseFromSearch[]
  >([]);
  const { searchExercise, fetchMuscleGroupsWithExercises } =
    useExerciseService();
  const defferedSearch = useDeferredValue(searchValue);
  const { data, mutate, isPending } = useMutation({
    mutationKey: ["exercise"],
    mutationFn: () => searchExercise(searchValue),
  });
  const { data: queryData, isLoading } = useQuery({
    queryFn: () => fetchMuscleGroupsWithExercises(),
    queryKey: ["exercise-muscle-groups"],
    initialData: [
      {
        name: "",
        exercises: [],
      },
    ],
  });

  useEffect(() => {
    mutate();
  }, [defferedSearch]);
  const navigation =
    useNavigation<StackNavigationProp<CreateWorkoutStackParamsList>>();

  const onSelectExercise = (exercise: ExerciseFromSearch) => {
    const exerciseIds = selectedExercises.map((ex) => ex.id);
    if (exerciseIds.includes(exercise.id)) {
      setSelectedExercises((prevSelected) =>
        prevSelected.filter(
          (exerciseFromArray) => exerciseFromArray.id !== exercise.id
        )
      );
    } else {
      setSelectedExercises((prevSelected) => [...prevSelected, exercise]);
    }
  };
  const exercisesForFlatList =
    filter === "exercises" ? data?.exercises : data?.exercises_by_user;

  return (
    <Screen closeKeyboardOnClick={true}>
      <TestInput
        value={searchValue}
        onChange={(value: string) => setSearchValue(value)}
        placeholder="Exercise name"
        leftIcon={<SearchIcon size={24} color={colors.primaryText} />}
      />
      {isPending && <ActivityIndicator />}
      {/* <FlatListHeader /> */}
      <View style={{ paddingVertical: 18, gap: 28 }}>
        {queryData.map((data: MuscleGroupWithExercises) => (
          <ExerciseSearchMuscleGroup
            key={data.name}
            selectedExercises={selectedExercises}
            muscleGroupData={data}
            onSelectExercise={onSelectExercise}
          />
        ))}
      </View>
      {/* Select exercises btn */}
      <View style={{ position: "absolute", bottom: 20, left: 100, right: 100 }}>
        <Button
          onPress={() => {
            addExercise(selectedExercises);
            navigation.goBack();
          }}
          text={`Select ${selectedExercises.length}`}
        />
      </View>
    </Screen>
  );
};

export default ExerciseSearch;

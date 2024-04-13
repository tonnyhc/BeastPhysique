import { ReactNode, createContext, useContext, useState } from "react";
import { ExerciseSession, Workout, WorkoutCreate } from "../ts/types";
import { emptySet } from "../utils/mapData";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import useWorkoutService from "../hooks/services/useWorkoutService";
import { useNavigation } from "@react-navigation/native";
import useExerciseService from "../hooks/services/useExerciseService";

const emptyWorkoutForCreate: WorkoutCreate = {
  name: "",
  exercises: [],
};

type WorkoutContextProps = {
  workout: WorkoutCreate;
  changeWorkoutName: (name: string) => void;
  addExercise: (exercises: ExerciseSession[]) => void;
  addSetToExercise: (exerciseIndex: number) => void;
  deleteSetFromExercise: (exerciseIndex: number, setIndex: number, setId?: number) => void;
  editSetProperty: (
    exerciseIndex: number,
    setIndex: number,
    propertyName: string,
    value: string
  ) => void;
  deleteExercise: (exerciseIndex: number) => void;
  submitCreate: () => UseMutationResult;
  submitEdit: () => UseMutationResult;
};

const CreateWorkoutContext = createContext<WorkoutContextProps>({
  workout: emptyWorkoutForCreate,
  changeWorkoutName: () => {},
  addExercise: (exercises: ExerciseSession[]) => {},
  addSetToExercise: (exerciseIndex: number) => {},
  deleteSetFromExercise: (exerciseIndex: number, setIndex: number) => {},
  editSetProperty: (
    exerciseIndex: number,
    setIndex: number,
    propertyName: string,
    value: string
  ) => {},
  deleteExercise: (exerciseIndex: number) => {},
  submitCreate: () => ({} as UseMutationResult),
  submitEdit: () => ({} as UseMutationResult),
});

interface CreateWorkoutProviderProps {
  children: ReactNode;
  workoutToEdit?: Workout;
}

export const CreateWorkoutProvider: React.FC<CreateWorkoutProviderProps> = ({
  children,
  workoutToEdit,
}) => {
  const navigation = useNavigation();
  const [workout, setWorkout] = useState<WorkoutCreate>(
    workoutToEdit ? workoutToEdit : emptyWorkoutForCreate
  );
  const { createWorkout, editWorkout } = useWorkoutService();
  const {deleteSetFromExerciseSession} = useExerciseService()
  const changeWorkoutName = (value: string) => {
    setWorkout((oldWorkout) => ({
      ...oldWorkout,
      name: value,
    }));
  };
  const addExercise = (exercises: ExerciseSession[]) => {
    const newExercises: ExerciseSession[] = [];
    for (let exercise of exercises) {
      newExercises.push({
        ...exercise,
        sets: [{ ...emptySet }],
      });
    }
    return setWorkout((oldWorkout) => ({
      ...oldWorkout,
      exercises: [...oldWorkout.exercises, ...newExercises],
    }));
  };
  const addSetToExercise = (exerciseIndex: number) => {
    const updatedExercises = [...workout.exercises];
    updatedExercises.map((exercise, index) => {
      if (index === exerciseIndex) {
        return exercise.sets?.push({ ...emptySet });
      }
    });
    setWorkout((oldWorkout) => ({
      ...oldWorkout,
      exercises: [...updatedExercises],
    }));
  };
  const deleteSetFromExercise = (exerciseIndex: number, setIndex: number, setId: number) => {
    if (workoutToEdit) {
      deleteSetFromExerciseSession.mutate(setId)
    }
    const updatedExercises = [...workout.exercises];
    updatedExercises[exerciseIndex].sets?.splice(setIndex, 1);
    setWorkout((oldWorkout) => ({
      ...oldWorkout,
      exercises: [...updatedExercises],
    }));
  };

  const deleteExercise = (exerciseIndex: number) => {
    const newExercises = [...workout.exercises];
    newExercises.splice(exerciseIndex, 1),
      setWorkout((oldWorkout) => ({
        ...oldWorkout,
        exercises: newExercises,
      }));
  };

  const editSetProperty = (
    exerciseIndex: number,
    setIndex: number,
    propertyName: string,
    value: string | boolean
  ) => {
    const exercisesCopy = [...workout.exercises];
    const exerciseToUpdate = exercisesCopy[exerciseIndex];
    const set = exerciseToUpdate.sets[setIndex];
    set[propertyName] = value;
    setWorkout((oldWorkout) => ({
      ...oldWorkout,
      exercises: exercisesCopy,
    }));
  };

  const submitCreate = () => {
    const { mutate, data } = createWorkout;
    mutate(workout);
    navigation.goBack()
    return data;
  };
  const submitEdit = () => {
    const { mutate, data } = editWorkout;
    mutate(workout);
    navigation.goBack();

    return data;
  };
  const context = {
    workout,
    changeWorkoutName,
    addExercise,
    addSetToExercise,
    deleteSetFromExercise,
    editSetProperty,
    deleteExercise,
    submitCreate,
    submitEdit,
  };
  return (
    <CreateWorkoutContext.Provider value={context}>
      {children}
    </CreateWorkoutContext.Provider>
  );
};

export const useCreateWorkoutContext = () => {
  const context = useContext(CreateWorkoutContext);
  if (!context) {
    throw new Error(
      "useCreateWorkoutContext must be used within a CreateWorkoutProvider"
    );
  }
  return context;
};

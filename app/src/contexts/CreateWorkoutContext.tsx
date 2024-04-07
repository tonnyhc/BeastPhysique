import { ReactNode, createContext, useContext, useState } from "react";
import { Exercise, ExerciseSearch, Workout, WorkoutCreate } from "../ts/types";
import { emptySet } from "../utils/mapData";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import useWorkoutService from "../hooks/services/useWorkoutService";

const emptyWorkoutForCreate: WorkoutCreate = {
  name: "",
  exercises: [],
};

type WorkoutContextProps = {
  workout: WorkoutCreate;
  changeWorkoutName: (name: string) => void;
  addExercise: (exercises: Exercise[]) => void;
  addSetToExercise: (exerciseIndex: number) => void;
  deleteSetFromExercise: (exerciseIndex: number, setIndex: number) => void;
  editSetProperty: (
    exerciseIndex: number,
    setIndex: number,
    propertyName: string,
    value: string
  ) => void;
  deleteExercise: (exerciseIndex: number) => void;
  submit: () => UseMutationResult;
};

const CreateWorkoutContext = createContext<WorkoutContextProps>({
  workout: emptyWorkoutForCreate,
  changeWorkoutName: () => {},
  addExercise: (exercises: Exercise[]) => {},
  addSetToExercise: (exerciseIndex: number) => {},
  deleteSetFromExercise: (exerciseIndex: number, setIndex: number) => {},
  editSetProperty: (
    exerciseIndex: number,
    setIndex: number,
    propertyName: string,
    value: string
  ) => {},
  deleteExercise: (exerciseIndex: number) => {},
  submit: () => {},
});

interface CreateWorkoutProviderProps {
  children: ReactNode;
}

export const CreateWorkoutProvider: React.FC<CreateWorkoutProviderProps> = ({
  children,
}) => {
  const [workout, setWorkout] = useState<WorkoutCreate>(emptyWorkoutForCreate);
  const { createWorkout } = useWorkoutService();
  const changeWorkoutName = (value: string) => {
    setWorkout((oldWorkout) => ({
      ...oldWorkout,
      name: value,
    }));
  };
  const addExercise = (exercises: Exercise[]) => {
    const newExercises: Exercise[] = [];
    for (let exercise of exercises) {
      newExercises.push({
        ...exercise,
        sets: [{...emptySet}],
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
        return exercise.sets?.push({...emptySet});
      }
    });
    setWorkout((oldWorkout) => ({
      ...oldWorkout,
      exercises: [...updatedExercises],
    }));
  };
  const deleteSetFromExercise = (exerciseIndex: number, setIndex: number) => {
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

  const submit = () => {
    return createWorkout.mutate(workout);
  };
  const context = {
    workout,
    changeWorkoutName,
    addExercise,
    addSetToExercise,
    deleteSetFromExercise,
    editSetProperty,
    deleteExercise,
    submit,
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

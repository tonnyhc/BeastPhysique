import { Exercise, ExerciseSet, Workout } from "../ts/types";

export const emptySet: ExerciseSet = {
  weight: "",
  reps: "",
  maxReps: "",
  minReps: "",
  failure: false,
  bodyweight: false,
};

export const emptyExercise: Exercise = {
  name: "",
  sets: [emptySet],
};

export const emptyWorkout: Workout = {
  workoutName: "",
  exercises: [emptyExercise],
};

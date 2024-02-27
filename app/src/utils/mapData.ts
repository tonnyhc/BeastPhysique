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

export const emptyWorkoutSession = {
  id: 0,
  created_at: "1-1-1",
  name: "",
  total_exercises: 1,
  total_sets: 1,
  total_weight_volume: 1,
  is_published: false,
  created_by: 1,
  exercises: [],
};

export const emptyWorkout: Workout = {
  name: "",
  exercises: [],
};

export const gendersForPicker = [
  { label: "Man", value: "Man" },
  { label: "Woman", value: "Woman" },
];

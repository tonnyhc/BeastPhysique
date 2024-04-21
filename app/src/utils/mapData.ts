import { Exercise, ExerciseSet, Profile, Workout } from "../ts/types";

export const baseProfilePicture =
  "https://res.cloudinary.com/dnb8qwwyi/image/upload/v1713645340/Default_pfp.svg_lovmuw.png";

export const emptySet: ExerciseSet = {
  weight: "",
  reps: "",
  max_reps: "",
  min_reps: "",
  to_failure: false,
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

export const generatePhysiqueGoals = (t: (key: string) => string) => {
  const physiqueGoalsMap = [
    {
      heading: t("screens.goal.maintain"),
      value: "Maintain",
      helperText: t("screens.goal.maintainHelperText"),
    },

    {
      heading: t("screens.goal.bulk"),
      value: "Bulk",
      helperText: t("screens.goal.bulkHelperText"),
    },
    { heading: t("screens.goal.cut"), value: "Cut", helperText: t("screens.goal.cutHelperText")},
  ];
  return physiqueGoalsMap;
};

export const emptyUserProfile: Profile = {
  id: 0,
  full_name: "",
  gender: "",
  birthday: "",
  bio: "",
  user: "",
  picture: baseProfilePicture,
};

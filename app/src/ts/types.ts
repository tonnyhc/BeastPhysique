import { ReactNode } from "react";
import { MuscleGroup } from "../Stacks/CreateExerciseStack";

// Requester
export type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE";

// Services
export type RegisterBody = {
  username: string;
  email: string;
  password: string;
};

export type LoginBody = {
  email: string;
  password: string;
};

export type LoginReturnBody = {
  // email: string;
  token: string;
  is_verified?: boolean;
  // user_id: number;
  // username: string;
};

// Forms
export type FormField = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onEndEditing?: () => any;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  placeholder: string;
  isPassword?: boolean;
  error?: string;
  inputMode?: "email" | "text" | "search" | "decimal";
  helperTextLeft?: string;
};

export type RegisterFormBody = {
  username: string;
  email: string;
  password: string;
  conf_pass: string;
};

// Contexts
export type AuthData = {
  token?: string | null;
  isVerified?: boolean;
  email?: string | null;
  setupProfile?: boolean;
  // username?: string | null;
};

export type AuthContextType = {
  authData: AuthData | null;
  isAuth: boolean;
  onLogin: (authData: AuthData) => Promise<LoginReturnBody>;
  onRegister: (authData: RegisterBody) => Promise<LoginReturnBody>;
  onLogout: () => void;
};

// Exercises
export type Exercise = {
  name: string;
  id?: number;
  cover_photo?: string;
  information?: string;
  video_tutorial?: string;
  tips?: string;
  created_at?: string;
  is_published?: boolean;
  // TODO: Fix created_by
  created_by?: any | null;
  sets?: ExerciseSet[];
  targeted_muscle_groups?: string[];
};

export type ExerciseFromSearch = {
  id: number;
  name: string;
};
export type ExerciseSession = {
  id: number | string;
  exercise: Exercise;
  sets: ExerciseSet[];
  created_at: string;
  // TODO: implement the profile type
  profile: any;
};

export type ExerciseSet = {
  forDelete?: boolean;
  weight: string;
  reps: string;
  minReps: string;
  maxReps: string;
  failure: boolean;
  bodyweight: boolean;
  id?: number;
};

export type ExerciseSetProgressObj = {
  weight: number;
  updated_at: string;
};

export type ExerciseSetProgressArray = ExerciseSetProgressObj[];

export type ExerciseSearch = {
  id: string | number;
  name: string;
  cover_photo: string;
  information: string;
  video_tutorial: string;
  tips: string;
  created_at: string;
};
export type ExerciseSearchResponse = {
  exercises_by_user: ExerciseSearch[];
  exercises: ExerciseSearch[];
};

// Workouts
export type Workout = {
  id: string | number;
  name: string;
  total_exercises: number;
  total_sets: number;
  total_weight_volume: number;
  is_published: boolean;
  exercises: Exercise[];
};

export type WorkoutCreate = {
  name: string;
  exercises: Exercise[];
};

export type WorkoutSession = {
  id: string | number;
  name: string;
  total_exercises: number;
  total_sets: number;
  total_weight_volume: number;
  is_published: boolean;
  exercises: ExerciseSession[];
};

export type WorkoutPlan = {
  id: number | string;
  // TODO: Fix the profile type, connecting it to the profile
  created_by: Record<any, any>;
  created_at: string;
  name: string;
  total_workouts: number | string;
  workouts: Workout[];
};

// Profile
export type ProfileDataForSetup = {
  full_name: string;
  birthday: Date;
  gender: string;
};

export type ProfilePropertyCardProps = {
  icon: ReactNode;
  heading: string;
  description: string;
};

export type PropertySection = {
  title: string;
  cards: ProfilePropertyCardProps[];
};

// Muscle Groups
export type MuscleGroupWithExercises = {
  name: string;
  exercises: {
    id: number;
    name: string;
  }[];
};

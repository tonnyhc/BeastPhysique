import { ReactNode } from "react";

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
};

export type ExerciseSet = {
  forDelete?: boolean;
  weight: string;
  reps: string;
  minReps: string;
  maxReps: string;
  failure: boolean;
  bodyweight: boolean;
};

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
export type Workout = { workoutName: string; exercises: Exercise[] };

export type WorkoutPlan = {
  id: number | string,
  // TODO: Fix the profile type, connecting it to the profile
  created_by: Record<any, any>,
  created_at: string,
  name: string,
  total_workouts: number | string,
  workouts: Workout[],
  
}

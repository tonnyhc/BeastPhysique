import React, {
  createContext,
  useReducer,
  ReactNode,
  Dispatch,
  useContext,
  useEffect,
} from "react";
import CustomProgramReducer, {
  Action,
  WorkoutPlanState,
} from "../reducers/CustomProgramReducer";
import useApi from "../hooks/services/useApi";
import { useAuth } from "./AuthContext";

interface CreateCustomWorkoutPlanContextProps {
  workoutPlan: WorkoutPlanState;
  dispatch: Dispatch<Action>; // Replace 'any' with your specific action types if available
  createWorkoutPlan: () => Promise<any>;
}

const defaultWorkoutPlanState: WorkoutPlanState = {
  planName: "",
  workouts: [],
};

export const CreateCustomWorkoutPlanContext =
  createContext<CreateCustomWorkoutPlanContextProps>({
    workoutPlan: defaultWorkoutPlanState,
    dispatch: () => {}, // Provide a default function or replace with your specific action types
    createWorkoutPlan: () => Promise.reject("A"),
  });

interface CreateCustomWorkoutPlanProviderProps {
  children: ReactNode;
}

const CreateCustomWorkoutPlanProvider: React.FC<
  CreateCustomWorkoutPlanProviderProps
> = ({ children }) => {
  const [workoutPlan, dispatch] = useReducer(
    CustomProgramReducer,
    defaultWorkoutPlanState
  );
  const { token } = useAuth();
  const { post } = useApi(token || "");

  const createWorkoutPlan = async () => {
    const url = "workouts/workout-plan/create/";
    const data = await post(url, workoutPlan);
    return data;
  };

  const context: CreateCustomWorkoutPlanContextProps = {
    workoutPlan,
    dispatch,
    createWorkoutPlan,
  };

  return (
    <CreateCustomWorkoutPlanContext.Provider value={context}>
      {children}
    </CreateCustomWorkoutPlanContext.Provider>
  );
};

export const useCustomWorkoutPlan = () => {
  return useContext(CreateCustomWorkoutPlanContext);
};

export default CreateCustomWorkoutPlanProvider;

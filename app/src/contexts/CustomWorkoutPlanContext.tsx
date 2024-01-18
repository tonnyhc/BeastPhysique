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
  ProgramState,
} from "../reducers/CustomProgramReducer";
import useApi from "../hooks/useApi";
import { useAuth } from "./AuthContext";
import { emptySet } from "../utils/mapData";

interface CreateCustomWorkoutPlanContextProps {
  workoutPlan: ProgramState;
  dispatch: Dispatch<Action>; // Replace 'any' with your specific action types if available
  createWorkoutPlan: () => void;
}

const defaultWorkoutPlanState: ProgramState = {
  planName: "",
  workouts: [
    {
      workoutName: "",
      exercises: [
        {
          name: "",
          sets: [emptySet]
        },
      ],
    },
  ],
};

export const CreateCustomWorkoutPlanContext =
  createContext<CreateCustomWorkoutPlanContextProps>({
    workoutPlan: defaultWorkoutPlanState,
    dispatch: () => {}, // Provide a default function or replace with your specific action types
    createWorkoutPlan: () => {},
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

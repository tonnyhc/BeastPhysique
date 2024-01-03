import React, { createContext, useReducer, ReactNode, Dispatch, useContext } from "react";
import CustomProgramReducer, { Action, ProgramState } from '../reducers/CustomProgramReducer';

interface CreateCustomWorkoutPlanContextProps {
  workoutPlan: ProgramState;
  dispatch: Dispatch<Action>; // Replace 'any' with your specific action types if available
}

const defaultWorkoutPlanState: ProgramState = {
  planName: "",
  workouts: [
      {
          workoutName: '',
          exercises: [
              {
                  name: "",
                  sets: {
                      weight: 0,
                      reps: 0,
                      minReps: 0,
                      maxReps: 0,
                      
                  }
              }
          ]
      }
  ],
  numberOfWorkouts: 0,
};

export const CreateCustomWorkoutPlanContext = createContext<CreateCustomWorkoutPlanContextProps>({
  workoutPlan: defaultWorkoutPlanState,
  dispatch: () => {}, // Provide a default function or replace with your specific action types
});

interface CreateCustomWorkoutPlanProviderProps {
  children: ReactNode;
}

const CreateCustomWorkoutPlanProvider: React.FC<CreateCustomWorkoutPlanProviderProps> = ({ children }) => {

  const [workoutPlan, dispatch] = useReducer(
    CustomProgramReducer,
    defaultWorkoutPlanState
  );

  const context: CreateCustomWorkoutPlanContextProps = {
    workoutPlan,
    dispatch,
  };

  return (
    <CreateCustomWorkoutPlanContext.Provider value={context}>
      {children}
    </CreateCustomWorkoutPlanContext.Provider>
  );
};

export const useCustomWorkoutPlan = () => {
    return useContext(CreateCustomWorkoutPlanContext)
}

export default CreateCustomWorkoutPlanProvider;
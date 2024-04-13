import { ReactNode, createContext, useContext, useState } from "react";
import { WorkoutPlanState } from "../reducers/CustomProgramReducer";
import { Workout } from "../ts/types";

const emptyWorkoutPlan: WorkoutPlanState = {
  planName: "",
  workouts: [],
};

type CreateWorkoutPlanContextProps = {
  workoutPlan: WorkoutPlanState;
  changePlanName: (name: string) => void;
  addWorkouts: (workouts: Workout[]) => void;
  deleteWorkout: (workoutIndex: number) => void;
};

const CreateWorkoutPlanContext = createContext<CreateWorkoutPlanContextProps>({
  workoutPlan: emptyWorkoutPlan,
  changePlanName: () => {},
  addWorkouts: () => {},
  deleteWorkout: () => {},
});

interface CreateWorkoutPlanProviderProps {
  children: ReactNode;
}

const CreateWorkoutPlanProvider: React.FC<CreateWorkoutPlanProviderProps> = ({
  children,
}) => {
  const [workoutPlan, setWorkoutPlan] =
    useState<WorkoutPlanState>(emptyWorkoutPlan);
  const changePlanName = (value: string) => {
    setWorkoutPlan((oldPlan) => ({
      ...oldPlan,
      planName: value,
    }));
  };
  const addWorkouts = (workouts: Workout[]) => {
    const newWorkouts: Workout[] = [...workoutPlan.workouts, ...workouts];
    setWorkoutPlan((oldPlan) => ({
      ...oldPlan,
      workouts: [...newWorkouts],
    }));
  };
  const deleteWorkout = (workoutIndex: number) => {
    const newWorkouts = [...workoutPlan.workouts];
    newWorkouts.splice(workoutIndex, 1);
    setWorkoutPlan((oldPlan) => ({
      ...oldPlan,
      workouts: [...newWorkouts],
    }));
  };
  const context = {
    workoutPlan,
    changePlanName,
    addWorkouts,
    deleteWorkout,
  };
  return (
    <CreateWorkoutPlanContext.Provider value={context}>
      {children}
    </CreateWorkoutPlanContext.Provider>
  );
};

export const useCreateWorkoutPlanContext = () => {
  return useContext(CreateWorkoutPlanContext);
};

export default CreateWorkoutPlanProvider;

import React from "react";
import { CreateWorkoutProvider } from "../../contexts/CreateWorkoutContext";
import CreateWorkoutsStackScreen from "../../Stacks/CreateWorkoutStack";
import { Workout } from "../../ts/types";

interface CreateWorkoutStackContextProps {
  route: {
    params: {
      workout?: Workout;
    };
  };
}

const CreateWorkoutStackContext: React.FC<CreateWorkoutStackContextProps> = ({
  route,
}) => {
  const workout = route.params?.workout ? route.params.workout : undefined;
  return (
    <CreateWorkoutProvider workoutToEdit={workout}>
      <CreateWorkoutsStackScreen editWorkout={workout ? true : false} />
    </CreateWorkoutProvider>
  );
};

export default CreateWorkoutStackContext;

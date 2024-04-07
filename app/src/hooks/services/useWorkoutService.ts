import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "../../contexts/AuthContext";
import useApi from "./useApi";
import { emptyWorkoutSession } from "../../utils/mapData";
import { WorkoutCreate } from "../../ts/types";

const useWorkoutService = () => {
  const url = "workouts/workout/";
  const { token } = useAuth();
  const { get, post } = useApi(token as string);

  const fetchWorkoutSessionDetails = async (id: number) => {
    return get(url + "session/" + id + "/");
  };

  const fetchCreateWorkout = async (body: WorkoutCreate) => {
    return post(url + "create/", body);
  };

  const workoutSessionDetails = (workoutSessionId: number) => {
    const query = useQuery({
      queryKey: ["workout_session", workoutSessionId],
      queryFn: () => fetchWorkoutSessionDetails(workoutSessionId),
      initialData: emptyWorkoutSession,
    });
    return query;
  };

  const createWorkout = useMutation({
    mutationFn: (data: WorkoutCreate) => fetchCreateWorkout(data),
    mutationKey: ["createWorkout"],
  });

  return { workoutSessionDetails, createWorkout };
};

export default useWorkoutService;

import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../contexts/AuthContext";
import useApi from "./useApi";
import { emptyWorkoutSession } from "../../utils/mapData";

const useWorkoutService = () => {
  const url = "workouts/workout/";
  const { token } = useAuth();
  const { get } = useApi(token as string);

  const fetchWorkoutSessionDetails = async (id: number) => {
    return get(url + "session/" + id + "/");
  };

  const workoutSessionDetails = (workoutSessionId: number) => {
    const query = useQuery({
      queryKey: ["workout_session", workoutSessionId],
      queryFn: () => fetchWorkoutSessionDetails(workoutSessionId),
      initialData: emptyWorkoutSession
    });
    return query;
  };

  return { workoutSessionDetails };
};

export default useWorkoutService;

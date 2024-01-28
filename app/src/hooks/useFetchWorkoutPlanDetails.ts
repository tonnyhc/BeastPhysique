import { useQuery } from "@tanstack/react-query";
import useApi from "./useApi";
import { useAuth } from "../contexts/AuthContext";

const useFetchWorkoutPlanDetails = (workoutPlanId: string | number) => {
  const { token } = useAuth();
  const { get } = useApi(token as string);
  const url = "workouts/workout-plan/details/" + workoutPlanId + "/";
  const fetchPlanDetails = async () => {
    const data = await get(url);
    return data
  };

  const query = useQuery({
    queryKey: ["workout_plan_id", workoutPlanId],
    queryFn: () => fetchPlanDetails()
  });

  return query
};

export default useFetchWorkoutPlanDetails

import { useQuery } from "@tanstack/react-query";
import { useWorkoutPlanServices } from "./useWorkoutPlanServices";

const useFetchWorkoutPlans = () => {
    const { getWorkoutPlansByUser } = useWorkoutPlanServices();
    const query = useQuery({
      queryKey: ["workout-splits"],
      queryFn: getWorkoutPlansByUser,
    });
    return query
};

export default useFetchWorkoutPlans;
import { useAuth } from "../../contexts/AuthContext";
import useApi from "../../hooks/useApi";

export const useWorkoutPlanServices = () => {
  const { token } = useAuth();
  const { post, get } = useApi(token as string);

  const createWorkoutPlan = async (body: Record<string, any>): Promise<any> => {
    try {
      const data = await post("workouts/create-workout-plan/", body);
      return data;
    } catch (e) {
      throw e;
    }
  };

  const getWorkoutPlansByUser = async (): Promise<any> => {
    try {
      const data = await get("workouts/own-workout-plans/");
      return data;
    } catch (e) {
      throw e;
    }
  };

  return { createWorkoutPlan, getWorkoutPlansByUser };
};

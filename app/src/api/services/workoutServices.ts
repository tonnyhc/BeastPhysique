import useApi from "../../hooks/useApi";
import { get, post } from "../requester";

export async function createWorkoutPlanRequest(
  body: Record<string, any>
): Promise<any> {
  try {
    const data = await post("workouts/create-workout-plan/", body);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getWorkoutPlansByUser() {
  try {
    const data = await get("workouts/own-workout-plans/");
    return data;
  } catch (e) {
    throw e;
  }
}

export const useWorkoutPlan = () => {
  const { post, get } = useApi();

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

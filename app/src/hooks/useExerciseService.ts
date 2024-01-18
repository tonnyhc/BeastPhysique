import { useAuth } from "../contexts/AuthContext";
import useApi from "./useApi";

const useExerciseService = (): {
  searchExercise: (name: string) => Promise<any>;
  createExercise: (body: Record<any,any>) => Promise<any>;
} => {
  const { token } = useAuth();
  const { get, post } = useApi(token as string);
  const searchExercise = async (name: string) => {
    const url =
      "workouts/exercise/search/" + `?name=${encodeURIComponent(name)}`;
    const data = await get(url);
    return data;
  };

  const createExercise = async (body: Record<any,any>) => {
    const url = "workouts/exercise/create/";
    const data = await post(url, body);
    return data;
  };

  return { searchExercise, createExercise };
};

export default useExerciseService;

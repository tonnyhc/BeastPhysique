import { useAuth } from "../contexts/AuthContext";
import useApi from "./useApi";

const useExerciseService = (): [
  searchExercise: (name: string) => Promise<any>
] => {
  const { token } = useAuth();
  const { get } = useApi(token as string);
  const searchExercise = async (name: string) => {
    const url = "workouts/exercise/search/" + `?name=${encodeURIComponent(name)}`;
    const data = await get(url);
    return data;
  };

  return [searchExercise];
};

export default useExerciseService;

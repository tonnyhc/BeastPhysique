import { useAuth } from "../../contexts/AuthContext";
import { Exercise } from "../../ts/types";
import useApi from "./useApi";

const useExerciseService = (): {
  searchExercise: (name: string) => Promise<any>;
  createExercise: (body: Record<any, any>) => Promise<any>;
  fetchMuscleGroupsWithExercises: () => Promise<any>;
  fetchExerciseDetails: (exerciseId: number) => Promise<Exercise>;
} => {
  const { token } = useAuth();
  const { get, post } = useApi(token as string);
  const searchExercise = async (name: string) => {
    const url =
      "workouts/exercise/search/" + `?name=${encodeURIComponent(name)}`;
    const data = await get(url);
    return data;
  };

  const createExercise = async (body: Record<any, any>) => {
    const url = "workouts/exercise/create/";
    const data = await post(url, body);
    return data;
  };

  const fetchMuscleGroupsWithExercises = async () => {
    const url = "workouts/muscle-group/list-exercises/";
    const data = await get(url);
    return data;
  };

  const fetchExerciseDetails = async (exerciseId: number) => {
    const url = "workouts/exercise/details/" + exerciseId;
    const data = await get(url);
    return data;
  };

  return {
    searchExercise,
    createExercise,
    fetchMuscleGroupsWithExercises,
    fetchExerciseDetails,
  };
};

export default useExerciseService;

import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../contexts/AuthContext";
import { ExerciseSet } from "../../ts/types";
import useApi from "./useApi";

const useUpdateSetExerciseSession = (setId: number) => {
  const { token } = useAuth();
  const { post } = useApi(token as string);
  const url = `workouts/exercise/session/update-set/${setId}/`;

  const requestFn = async (body: ExerciseSet) => {
    const data = await post(url, body);
    return data;
  };

  const mutation = useMutation({
    mutationFn: (body: ExerciseSet) => requestFn(body),
    onSuccess: () => {},
  });

  return mutation;
};

export default useUpdateSetExerciseSession;

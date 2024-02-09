import { useMutation } from "@tanstack/react-query";
import useApi from "./useApi";
import { useAuth } from "../contexts/AuthContext";
import { ExerciseSet } from "../ts/types";

const useAddSetToExerciseSession = (
  sessionId: number,
  onSuccessFn: (data: ExerciseSet) => void
) => {
  const { token } = useAuth();
  const { post } = useApi(token as string);
  const mutation = useMutation({
    mutationFn: () => requestFn(sessionId),
    onSuccess: (data) => onSuccessFn(data),
  });
  const requestFn = async (sessionId: number) => {
    const data = await post(`workouts/exercise/session/add-set/${sessionId}/`);
    return data;
  };
  return mutation;
};
export default useAddSetToExerciseSession;

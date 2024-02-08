import { useMutation } from "@tanstack/react-query";
import useApi from "./useApi";
import { useAuth } from "../contexts/AuthContext";

const useAddSetToExerciseSession = (
  sessionId: number,
  onSuccessFn: () => void
) => {
  const { token } = useAuth();
  const { post } = useApi(token as string);
  const mutation = useMutation({
    mutationFn: () => requestFn(sessionId),
    onSuccess: () => onSuccessFn(),
  });
  const requestFn = async (sessionId: number) => {
    const data = await post(`workouts/exercise/session/add-set/${sessionId}/`);
    return data;
  };

  return mutation;
};
export default useAddSetToExerciseSession;

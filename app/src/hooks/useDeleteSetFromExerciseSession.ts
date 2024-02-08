import { useMutation } from "@tanstack/react-query";
import useApi from "./useApi";
import { useAuth } from "../contexts/AuthContext";

const useDeleteSetFromExerciseSession = (
  setId: number,
  onSuccessFn: () => void
) => {
  const { token } = useAuth();
  const { post } = useApi(token as string);
  const mutation = useMutation({
    mutationFn: () => requestFn(setId),
    onSuccess: () => onSuccessFn(),
  });
  const requestFn = async (setId: number) => {
    const data = await post(`workouts/exercise/session/delete-set/${setId}/`);
    return data;
  };

  return mutation;
};
export default useDeleteSetFromExerciseSession;

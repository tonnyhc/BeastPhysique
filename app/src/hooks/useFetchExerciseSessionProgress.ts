import {useQuery } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import useApi from "./useApi";

const useFetchExerciseSessionProgress = (sessionId: number) => {
  const { token } = useAuth();
  const { get } = useApi(token as string);

  const requestProgressFn = async () => {
    const url = `workouts/exercise/session/progress/${sessionId}`;
    const data = await get(url);

    return data;
  };

  const query = useQuery({
      queryKey: [`session_progress-${sessionId}`],
      queryFn: () => requestProgressFn(),
  });

  return query;
};

export default useFetchExerciseSessionProgress;

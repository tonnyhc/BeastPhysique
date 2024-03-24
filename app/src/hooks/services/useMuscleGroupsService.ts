import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "../../contexts/AuthContext";
import useApi from "./useApi";

const useMuscleGroupsService = () => {
  const { token } = useAuth();
  const { get } = useApi(token as string);
  const url = "workouts/muscle-group/";

  const fetchMuscleGroups = async (): Promise<
    { id: number; name: string }[]
  > => {
    const data = await get(`${url}list/`);
    return data;
  };

  const listQuery = useQuery({
    queryFn: () => fetchMuscleGroups(),
    initialData: [
      {
        id: 1,
        name: "Muscle",
      },
    ],
    queryKey: ["muscle-groups-list"],
  });

  return { listQuery };
};

export default useMuscleGroupsService;

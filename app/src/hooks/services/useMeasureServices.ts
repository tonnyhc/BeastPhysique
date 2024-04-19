import { useAuth } from "../../contexts/AuthContext";
import useApi from "./useApi";

const useMeasuresServices = () => {
  const { token } = useAuth();
  const { get } = useApi(token as string);

  const url = "health/measures/";
  const fetchWeightData = async (): Promise<{
    last_weigh_in: string;
    weight: number;
    logs: {
      weight: number;
      date: string;
    }[];
  }> => {
    const data = await get(url + "weight/");
    return data;
  };

  return { fetchWeightData };
};

export default useMeasuresServices;

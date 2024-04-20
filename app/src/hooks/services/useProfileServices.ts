import { useAuth } from "../../contexts/AuthContext";
import useApi from "./useApi";

const useProfileServices = () => {
  const { token } = useAuth();
  const { put, get } = useApi(token as string);
  const url = "profile/";
  const fetchFullName = async (): Promise<{
    full_name: string;
    max_length_full_name: number;
  }> => {
    const data = await get(url + "full_name/");
    return data;
  };

  const updateFullName = async (newName: string) => {
    const data = await put(url + "full_name/", { full_name: newName });
    return data;
  };

  return { fetchFullName, updateFullName };
};

export default useProfileServices;

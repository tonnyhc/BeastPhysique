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
  const fetchUsername = async (): Promise<{
    username: string;
    max_length_username: number;
  }> => {
    const data = await get(url + "username/");
    return data;
  };
  const fetchBio = async (): Promise<{
    bio: string;
    max_length_bio: number;
  }> => {
    const data = await get(url + "bio/");
    return data;
  };
  const fetchBirthday = async (): Promise<{
    birthday: string | Date;
  }> => {
    const data = await get(url + "birthday/");
    return data;
  };
  const updateFullName = async (newName: string) => {
    const data = await put(url + "full_name/", { full_name: newName });
    return data;
  };
  const updateUsername = async (newUsename: string) => {
    const data = await put(url + "username/", { username: newUsename });
    return data;
  };
  const updateBio = async (newBio: string) => {
    const data = await put(url + "bio/", { bio: newBio });
    return data;
  };
  const updateBirthday = async (newBirthday: string) => {
    const data = await put(url + "birthday/", { birthday: newBirthday });
    return data;
  };

  return {
    fetchFullName,
    fetchUsername,
    fetchBio,
    fetchBirthday,
    updateUsername,
    updateFullName,
    updateBio,
    updateBirthday,
  };
};

export default useProfileServices;

import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import useApi from "./useApi";
import { ProfileDataForSetup } from "../ts/types";

const useSetupProfileData = (onSuccessFn: () => void) => {
  const { token } = useAuth();
  const { put } = useApi(token as string);

  const requestFn = async (data: ProfileDataForSetup): Promise<any> => {
    const result = await put("profile/edit/", data);
    return result;
  };

  const mutation = useMutation({
    mutationFn: (data: ProfileDataForSetup) => requestFn(data),
    onSuccess: () => onSuccessFn(),
  });

  return mutation;
};

export default useSetupProfileData;

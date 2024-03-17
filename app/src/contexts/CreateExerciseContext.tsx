import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { CustomExerciseData } from "../Stacks/CreateExerciseStack";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import useExerciseService from "../hooks/useExerciseService";

interface CreateExerciseProviderProps {
  children: ReactNode;
}

type CreateExerciseContextProps = {
  exerciseData: CustomExerciseData;
  changeFieldValue: (value: any, fieldName: string) => void;
  isPublishDisabled: boolean;
  isCreateDisabled: boolean;
  submitFn: (
    successFn: () => void
  ) => UseMutationResult<any, Error, void, unknown>;
};
const CreateExerciseContext = createContext<CreateExerciseContextProps>({});

export const CreateExerciseProvider: React.FC<CreateExerciseProviderProps> = ({
  children,
}) => {
  const [exerciseData, setExerciseData] = useState<CustomExerciseData>({
    name: "",
    cover_photo: "",
    information: "",
    video_tutorial: "",
    tips: "",
    publish: false,
  });
  const { createExercise } = useExerciseService();
  const [isPublishDisabled, setIsPublishDisabled] = useState(false);
  const [isCreateDisabled, setIsCreateDisabled] = useState(false);

  useEffect(() => {
    const isNameEmpty = exerciseData.name === "";
    const isAnyValueEmpty = Object.values(exerciseData).some(
      (value) => value === ""
    );
    setIsPublishDisabled(isAnyValueEmpty);
    setIsCreateDisabled(isNameEmpty);
  }, [exerciseData]);

  const submitFn = (successFn: () => void) => {
    const mutation = useMutation({
      mutationFn: () => createExercise(exerciseData),
      mutationKey: ["exerciseCreate"],
      onSuccess: () => {
        successFn();
        // navigation.goBack();
      },
    });
    return mutation;
  };

  const createPublicExercise = (successFn: () => void) => {
    setExerciseData((oldData) => ({ ...oldData, publish: true }));
    submitFn(successFn);
  };

  const changeFieldValue = (value: any, fieldName: string) => {
    setExerciseData((oldData) => ({
      ...oldData,
      [fieldName]: value,
    }));
  };

  const context = {
    exerciseData,
    changeFieldValue,
    isPublishDisabled,
    isCreateDisabled,
    submitFn,
  };

  return (
    <CreateExerciseContext.Provider value={context}>
      {children}
    </CreateExerciseContext.Provider>
  );
};

export const useCreateExercise = () => {
  return useContext(CreateExerciseContext);
};

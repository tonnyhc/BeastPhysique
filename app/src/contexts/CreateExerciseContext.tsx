import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { CustomExerciseData, MuscleGroup } from "../Stacks/CreateExerciseStack";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import useExerciseService from "../hooks/services/useExerciseService";

interface CreateExerciseProviderProps {
  children: ReactNode;
}

type CreateExerciseContextProps = {
  exerciseData: CustomExerciseData;
  changeFieldValue: (value: any, fieldName: string) => void;
  isPublishDisabled: boolean;
  isCreateDisabled: boolean;
  mutate: () => UseMutationResult<any, Error, void, unknown>;
  // submitFn: (
  //   successFn: () => void
  // ) => UseMutationResult<any, Error, void, unknown>;
  addMuscleGroup: (muscleGroup: MuscleGroup) => void;
  onSuccessFn: () => void;

};
const CreateExerciseContext = createContext<CreateExerciseContextProps>({});

export const CreateExerciseProvider: React.FC<CreateExerciseProviderProps> = ({
  children,
}) => {
  const [exerciseData, setExerciseData] = useState<CustomExerciseData>({
    name: "",
    targeted_muscle_groups: [],
    bodyweight: false,
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

  const { mutate } = useMutation({
    mutationFn: () => {
      const modifiedExerciseData = {
        ...exerciseData,
        targeted_muscle_groups: exerciseData.targeted_muscle_groups.map(
          (item) => item.id
        ),
      };

      return createExercise(modifiedExerciseData);
    },
    mutationKey: ["exerciseCreate"],
    onSuccess: () => {
      onSuccessFn()
    },
  });

  const addMuscleGroup = (muscleGroup: MuscleGroup) => {
    if (exerciseData.targeted_muscle_groups.includes(muscleGroup)) {
      setExerciseData((oldData) => ({
        ...oldData,
        targeted_muscle_groups: oldData.targeted_muscle_groups.filter(
          (item) => item !== muscleGroup
        ),
      }));
      return;
    }
    setExerciseData((oldData) => ({
      ...oldData,
      targeted_muscle_groups: [...oldData.targeted_muscle_groups, muscleGroup],
    }));
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
    mutate,
    addMuscleGroup,
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

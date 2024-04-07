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
import { transformExerciseDataToFormData } from "../utils/helperFunctions";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { WorkoutsStackParamList } from "../Stacks/WorkoutsStack";

interface CreateExerciseProviderProps {
  children: ReactNode;
}

type CreateExerciseContextProps = {
  exerciseData: CustomExerciseData;
  changeFieldValue: (value: any, fieldName: string) => void;
  isPublishDisabled: boolean;
  isCreateDisabled: boolean;
  mutate: () => UseMutationResult<any, Error, void, unknown>;
  pendingMutate: boolean;
  createPublicExercise: () => void;
  addMuscleGroup: (muscleGroup: MuscleGroup) => void;
};
const CreateExerciseContext = createContext<CreateExerciseContextProps>({});

export const CreateExerciseProvider: React.FC<CreateExerciseProviderProps> = ({
  children,
}) => {
  const [exerciseData, setExerciseData] = useState<CustomExerciseData>({
    name: "",
    targeted_muscle_groups: [],
    bodyweight: false,
    cover_photo: null,
    information: "",
    video_tutorial: null,
    tips: "",
    publish: false,
  });
  const { createExercise } = useExerciseService();
  const [isPublishDisabled, setIsPublishDisabled] = useState(false);
  const [isCreateDisabled, setIsCreateDisabled] = useState(false);
  const navigation = useNavigation<StackNavigationProp<WorkoutsStackParamList>>()

  useEffect(() => {
    const isNameEmpty = exerciseData.name === "";
    const isAnyValueEmpty = Object.values(exerciseData).some(
      (value) => value === ""
    );
    setIsPublishDisabled(isAnyValueEmpty);
    setIsCreateDisabled(isNameEmpty);
  }, [exerciseData]);


  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const modifiedExerciseData = {
        ...exerciseData,
        targeted_muscle_groups: exerciseData.targeted_muscle_groups.map(
          (item) => item.id
        ),
      };
      const formData = transformExerciseDataToFormData(modifiedExerciseData);

      return createExercise(formData);
    },
    onSuccess: () => navigation.replace('WorkoutPlans'),
    mutationKey: ["exerciseCreate"],
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

  const createPublicExercise = () => {
    setExerciseData((oldData) => ({ ...oldData, publish: true }));
    mutate();
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
    pendingMutate: isPending,
    createPublicExercise,
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

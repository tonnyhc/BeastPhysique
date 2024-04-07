import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import { useTheme } from "../contexts/ThemeContext";
import {
  CreateExerciseProvider,
  useCreateExercise,
} from "../contexts/CreateExerciseContext";
import CreateExerciseBaseScreen from "../screens/exercises/CreateExerciseBaseScreen";
import { View, Text, SafeAreaView } from "react-native";
import StackScreenHeader from "../components/common/StackScreenHeader";
import CreateExercisePublishScreen from "../screens/exercises/CreateExercisePublishScreen";
import { ImagePickerAsset } from "expo-image-picker";

export type CreateExerciseStackParamList = {
  BaseScreen: undefined;
  PublishScreen: undefined;
};

interface CreateExerciseStackScreenProps {
  navigation: StackNavigationProp<any>;
}

export type MuscleGroup = {
  id: number,
  name: string
}

export type CustomExerciseData = {
  name: string;
  targeted_muscle_groups: MuscleGroup[];
  bodyweight: boolean;
  cover_photo: string | null;
  information: string;
  video_tutorial: ImagePickerAsset | null;
  tips: string;
  publish: boolean;
};

const CreateExerciseStack =
  createStackNavigator<CreateExerciseStackParamList>();

const CreateExerciseStackScreen: React.FC<CreateExerciseStackScreenProps> = ({
  navigation,
}) => {
  const { colors } = useTheme();

  return (
    <CreateExerciseProvider>
      <CreateExerciseStack.Navigator
        initialRouteName="BaseScreen"
        screenOptions={{
          headerShown: true,
          headerTitle: "",
          headerLeftContainerStyle: {
            paddingLeft: 12,
          },
          headerRightContainerStyle: {
            paddingRight: 12,
          },
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            backgroundColor: colors.bg,
          },
        }}
      >
        <CreateExerciseStack.Screen
          name="BaseScreen"
          component={CreateExerciseBaseScreen}
          options={{
            header: () => <StackScreenHeader label="Create exercise" />,
          }}
        />
        <CreateExerciseStack.Screen
          name="PublishScreen"
          component={CreateExercisePublishScreen}
          options={{
            header: () => <StackScreenHeader label="Create exercise" />,
          }}
        />
      </CreateExerciseStack.Navigator>
    </CreateExerciseProvider>
  );
};

export default CreateExerciseStackScreen;

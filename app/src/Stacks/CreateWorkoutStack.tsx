import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";

import { useTheme } from "../contexts/ThemeContext";

import StackScreenHeader from "../components/common/StackScreenHeader";
import CreateWorkoutScreen from "../screens/workouts/CreateWorkoutScreen";

import ExerciseSearch from "../screens/workouts/ExerciseSearch";
import { useCreateWorkoutContext } from "../contexts/CreateWorkoutContext";
import CreateExerciseStackScreen from "./CreateExerciseStack";
import Button from "../components/common/Button";
import { useNavigation } from "@react-navigation/native";
import { WorkoutsStackParamList } from "./WorkoutsStack";

export type CreateWorkoutStackParamsList = {
  CreateWorkout: undefined;
  ExerciseSearch: undefined;
  CreateExercise: undefined;
};

const CreateWorkoutsStack = createStackNavigator();

const CreateWorkoutsStackScreen: React.FC = () => {
  const { colors } = useTheme();
  const { submit } = useCreateWorkoutContext();
  const navigation =
    useNavigation<StackNavigationProp<WorkoutsStackParamList>>();
  return (
    <CreateWorkoutsStack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerShown: true,
        headerBackTitleVisible: false,
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
      <CreateWorkoutsStack.Screen
        options={{
          header: () => (
            <StackScreenHeader
              rightButton={
                <Button type="text" text="Done" onPress={() => submit()} />
              }
              label="Create workout"
            />
          ),
        }}
        component={CreateWorkoutScreen}
        name="CreateWorkout"
      />
      <CreateWorkoutsStack.Screen
        options={{
          headerShown: true,
          header: () => (
            <StackScreenHeader
              rightButton={
                <Button
                  type="text"
                  text="Create"
                  onPress={() => navigation.navigate("CreateCustomExercise")}
                />
              }
              label="Search exercise"
            />
          ),
          headerStyle: {
            height: 25,
            backgroundColor: colors.bg,
            justifyContent: "center",
            alignItems: "center",
          },
        }}
        component={ExerciseSearch}
        name="ExerciseSearch"
      />
      <CreateWorkoutsStack.Screen
        name="CreateExercise"
        component={CreateExerciseStackScreen}
        options={{
          headerShown: false,
        }}
      />
    </CreateWorkoutsStack.Navigator>
  );
};

export default CreateWorkoutsStackScreen;

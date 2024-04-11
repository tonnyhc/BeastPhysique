import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import Workouts from "../screens/workout-plans/Workouts";
import CreateCustomWorkoutPlan from "../screens/workout-plans/CreateCustomWorkoutPlan";
import CreateCustomWorkoutPlanProvider, {
  useCustomWorkoutPlan,
} from "../contexts/CustomWorkoutPlanContext";
import WorkoutSelection from "../screens/workouts/WorkoutSelection";
import { useTheme } from "../contexts/ThemeContext";
import ExerciseCreationModal from "../screens/workouts/ExerciseCreationModal";
import WorkoutDetails from "../screens/workouts/WorkoutDetails";
import WorkoutPlanDetails from "../screens/workout-plans/WorkoutPlanDetails";
import ExerciseSessionEditModal from "../screens/workouts/ExerciseSessionEditModal";
import { ExerciseSession, Workout } from "../ts/types";
import ExerciseSessionProgressModal from "../screens/workouts/ExerciseSessionProgressModal";
import Button from "../components/common/Button";
import BackButton from "../components/common/BackButton";
import { Image } from "react-native";
import CloseButton from "../components/common/CloseButton";
import CreateExerciseStackScreen from "./CreateExerciseStack";
import CreateWorkoutsStackScreen from "./CreateWorkoutStack";
import CreateWorkoutStackContext from "../screens/workouts/CreateWorkoutStackContext";
import TestCreateCustomWorkoutPlan from "../screens/workout-plans/TestCreateCustomWorkoutPlan";
import StackScreenHeader from "../components/common/StackScreenHeader";
import ExerciseDetailsScreen from "../screens/exercises/ExerciseDetailsScreen";
import WorkoutSearch from "../screens/workouts/WorkoutSearch";

export type WorkoutsStackParamList = {
  WorkoutPlans: undefined;
  WorkoutPlanDetails: { planId: string | number };
  WorkoutDetails: { workoutSessionId: number };
  CreateWorkoutPlan: undefined;
  CreateCustomWorkout: {
    workoutIndex: string | number;
  };
  WorkoutSearch: undefined;

  CreateCustomExercise: undefined;
  EditExerciseSession: { exerciseSession: ExerciseSession };
  ExerciseProgress: undefined;
  ExerciseDetails: {
    exerciseId: number;
  };
};

const WorkoutsStack = createStackNavigator<WorkoutsStackParamList>();

const WorkoutsStackScreen: React.FC = () => {
  const { colors } = useTheme();
  return (
    <CreateCustomWorkoutPlanProvider>
      <WorkoutsStack.Navigator
        initialRouteName="WorkoutSearch"
        screenOptions={{
          headerShown: true,
          headerTitle: "",
          headerTitleStyle: {
            color: colors.helperText,
          },
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
        <WorkoutsStack.Group>
          <WorkoutsStack.Screen
            name="WorkoutPlans"
            options={({ navigation }) => ({
              headerLeft: () => (
                <Image
                  source={require("../../assets/IconBlack.png")}
                  style={{ width: 50, height: 42 }}
                />
              ),
              headerLeftContainerStyle: { paddingLeft: 10 },
              headerTitle: "Workout Plans",
              headerRight: () => (
                <Button
                  onPress={() => navigation.navigate("CreateWorkoutPlan")}
                  type="text"
                  text="Create "
                />
              ),
            })}
            component={Workouts}
          />
          <WorkoutsStack.Screen
            name="WorkoutPlanDetails"
            options={{
              headerShown: false,
            }}
            component={WorkoutPlanDetails}
          />
          <WorkoutsStack.Screen
            name="WorkoutDetails"
            options={{
              headerShown: false,
            }}
            component={WorkoutDetails}
          />
          {/* CREATE */}
          <WorkoutsStack.Screen
            name="CreateWorkoutPlan"
            component={TestCreateCustomWorkoutPlan}
            options={({ navigation }) => ({
              header: () => <StackScreenHeader label="Create Workout Plan" />,
            })}
          />

          <WorkoutsStack.Screen
            name="WorkoutSearch"
            component={WorkoutSearch}
            options={({ navigation }) => ({
              header: () => (
                <StackScreenHeader
                  label="Search workout"
                  rightButton={
                    <Button type="text" text="Create" onPress={() => navigation.navigate('CreateCustomWorkout')} />
                  }
                />
              ),
            })}
          />
          <WorkoutsStack.Screen
            options={{
              headerShown: false,
            }}
            component={CreateWorkoutStackContext}
            name="CreateCustomWorkout"
          />

          <WorkoutsStack.Screen
            options={{
              headerShown: false,
            }}
            component={CreateExerciseStackScreen}
            name="CreateCustomExercise"
          />
          <WorkoutsStack.Screen
            options={{ headerShown: false }}
            component={ExerciseDetailsScreen}
            name="ExerciseDetails"
          />

          <WorkoutsStack.Screen
            name="EditExerciseSession"
            component={ExerciseSessionEditModal}
            options={{ presentation: "modal", headerShown: false }}
          />
          <WorkoutsStack.Screen
            name="ExerciseProgress"
            component={ExerciseSessionProgressModal}
            options={{ presentation: "modal", headerShown: false }}
          />
        </WorkoutsStack.Group>
      </WorkoutsStack.Navigator>
    </CreateCustomWorkoutPlanProvider>
  );
};

export default WorkoutsStackScreen;

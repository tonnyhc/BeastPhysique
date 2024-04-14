import { createStackNavigator } from "@react-navigation/stack";
import Workouts from "../screens/workout-plans/Workouts";
import CreateCustomWorkoutPlanProvider from "../contexts/CustomWorkoutPlanContext";
import { useTheme } from "../contexts/ThemeContext";
import WorkoutDetails from "../screens/workouts/WorkoutDetails";
import WorkoutPlanDetails from "../screens/workout-plans/WorkoutPlanDetails";
import ExerciseSessionEditModal from "../screens/workouts/ExerciseSessionEditModal";
import { ExerciseSession, Workout } from "../ts/types";
import ExerciseSessionProgressModal from "../screens/workouts/ExerciseSessionProgressModal";
import Button from "../components/common/Button";
import { Image } from "react-native";
import CreateExerciseStackScreen from "./CreateExerciseStack";
import CreateWorkoutStackContext from "../screens/workouts/CreateWorkoutStackContext";
import ExerciseDetailsScreen from "../screens/exercises/ExerciseDetailsScreen";
import CreateWorkoutPlanStackScreen from "./CreateWorkoutPlanStack";
import CreateWorkoutPlanStackContext from "../screens/workout-plans/CreateWorkoutPlanStackContext";

export type WorkoutsStackParamList = {
  WorkoutPlans: undefined;
  WorkoutPlanDetails: { planId: string | number };
  WorkoutDetails: { workoutSessionId: number };
  CreateWorkoutPlan: undefined;
  CreateCustomWorkout: {
    workout?: Workout;
    callbackFn?: (workout: Workout) => void;
  };

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
        // initialRouteName="CreateWorkoutPlan"
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
                  text="Create"
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
            options={{
              headerShown: false,
            }}
            component={CreateWorkoutPlanStackContext}
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

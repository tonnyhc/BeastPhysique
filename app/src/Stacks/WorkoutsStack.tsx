import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import Workouts from "../screens/workout-plans/Workouts";
import CreateCustomWorkoutPlan from "../screens/workout-plans/CreateCustomWorkoutPlan";
import CreateCustomWorkoutPlanProvider from "../contexts/CustomWorkoutPlanContext";
import WorkoutSelection from "../screens/workouts/WorkoutSelection";
import ExerciseSearchModal from "../components/workouts/exercise/ExerciseSearchModal";
import { useTheme } from "../contexts/ThemeContext";
import ExerciseCreationModal from "../screens/workouts/ExerciseCreationModal";
import WorkoutDetails from "../screens/workouts/WorkoutDetails";
import WorkoutPlanDetails from "../screens/workout-plans/WorkoutPlanDetails";
import ExerciseSessionEditModal from "../screens/workouts/ExerciseSessionEditModal";
import { ExerciseSession, Workout } from "../ts/types";
import ExerciseSessionProgressModal from "../screens/workouts/ExerciseSessionProgressModal";
import CloseIcon from "../icons/CloseIcon";
import Button from "../components/common/Button";
import BackButton from "../components/common/BackButton";
import CreateCustomWorkout from "../screens/workouts/CreateCustomWorkout";

export type WorkoutsStackParamList = {
  WorkoutPlans: undefined;
  WorkoutPlanDetails: { planId: string | number };
  WorkoutDetails: { workoutSessionId: number };
  CreateWorkoutPlan: undefined;
  CreateCustomWorkout: {
    workoutIndex: string | number;
  };
  // CreateWorkoutsForPlan: undefined;
  WorkoutSearch: undefined;
  ExerciseSearchModal: {
    workoutIndex: number;
  };
  CreateCustomExercise: undefined;
  EditExerciseSession: { exerciseSession: ExerciseSession };
  ExerciseProgress: undefined;
};

const WorkoutsStack = createStackNavigator<WorkoutsStackParamList>();

const WorkoutsStackScreen: React.FC = () => {
  const { colors } = useTheme();
  return (
    <CreateCustomWorkoutPlanProvider>
      <WorkoutsStack.Navigator
        screenOptions={{
          headerShown: true,
          headerTitle: "",
          headerTitleStyle: {
            color: colors.helperText,
          },
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            backgroundColor: colors.bg,
          },
        }}
        initialRouteName="CreateWorkoutPlan"
      >
        <WorkoutsStack.Group>
          <WorkoutsStack.Screen name="WorkoutPlans" component={Workouts} />
          <WorkoutsStack.Screen
            name="WorkoutPlanDetails"
            component={WorkoutPlanDetails}
          />
          <WorkoutsStack.Screen
            name="WorkoutDetails"
            component={WorkoutDetails}
          />
          {/* CREATE */}
          <WorkoutsStack.Screen
            name="CreateWorkoutPlan"
            component={CreateCustomWorkoutPlan}
            options={{
              headerLeft: (props) => (
                <Button
                  type="text"
                  text=""
                  onPress={() => {}}
                  leftIcon={<CloseIcon size={24} color={colors.helperText} />}
                />
              ),
              headerTitle: "Create Workout Plan",
            }}
          />
          <WorkoutsStack.Screen
            name="WorkoutSearch"
            component={WorkoutSelection}
            options={{
              headerShown: true,
              headerLeft: (props) => <BackButton onPress={() => {}} />,
              headerLeftContainerStyle: {
                paddingLeft: 10,
              },

              headerTitle: "Workout search",
            }}
          />
          <WorkoutsStack.Screen
            name="CreateCustomWorkout"
            component={CreateCustomWorkout}
            options={{
              headerTitle: "Create workout",
              headerLeft: (props) => <BackButton onPress={() => {}} />,
              headerLeftContainerStyle: {
                paddingLeft: 10,
              },
            }}
          />

          <WorkoutsStack.Screen
            name="ExerciseSearchModal"
            component={ExerciseSearchModal}
            options={({ navigation }) => ({
              presentation: "modal",
              headerShown: true,
              headerTitle: "Search exercise",
              headerLeft: (props) => (
                <Button
                  type="text"
                  text=""
                  onPress={() => navigation.goBack()}
                  leftIcon={<CloseIcon size={24} color={colors.helperText} />}
                />
              ),

              headerRight: (props) => (
                <Button
                  onPress={() => navigation.navigate("CreateCustomExercise")}
                  text="Create exercise"
                  type="text"
                />
              ),
            })}
          />
          <WorkoutsStack.Screen
            name="CreateCustomExercise"
            component={ExerciseCreationModal}
            options={({ navigation }) => ({
              presentation: "modal",
              headerShown: true,
              headerTitle: "Create exercise",
              headerLeft: (props) => (
                <Button
                  type="text"
                  text=""
                  onPress={() => navigation.goBack()}
                  leftIcon={<CloseIcon size={24} color={colors.helperText} />}
                />
              ),
            })}
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

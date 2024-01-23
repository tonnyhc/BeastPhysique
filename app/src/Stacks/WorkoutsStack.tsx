import { createStackNavigator } from "@react-navigation/stack";
import Workouts from "../screens/workout-plans/Workouts";
import CreateCustomWorkoutPlan from "../screens/workout-plans/CreateCustomWorkoutPlan";
import LogoIcon from "../components/header/LogoIcon";
import DrawerMenuIcon from "../components/header/DrawerMenuIcon";
import CreateCustomWorkoutPlanProvider from "../contexts/CustomWorkoutPlanContext";
import CreateWorkoutsForPlan from "../screens/workouts/CreateWorkoutsForPlan";
import ExerciseCreationCard from "../components/workouts/exercise/ExerciseCreationCard";
import WorkoutSelection from "../screens/workouts/WorkoutSelection";
import ExerciseSearchModal from "../components/workouts/exercise/ExerciseSearchModal";
import { useTheme } from "../contexts/ThemeContext";
import ExerciseCreationModal from "../screens/workouts/ExerciseCreationModal";
import WorkoutDetails from "../screens/workouts/WorkoutDetails";
import WorkoutPlanDetails from "../screens/workout-plans/WorkoutPlanDetails";

export type WorkoutsStackParamList = {
  WorkoutPlans: undefined;
  WorkoutPlanDetails: undefined,
  WorkoutDetails: undefined,
  CreateWorkoutPlan: undefined;
  CreateWorkoutsForPlan: undefined;
  WorkoutSearch: undefined;
  ExerciseSearchModal: undefined;
  CreateCustomExercise: undefined
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
          headerRight: (props) => <LogoIcon />,
          headerLeft: (props) => <DrawerMenuIcon />,
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            backgroundColor: colors.bg,
          },
        }}
        initialRouteName="WorkoutPlanDetails"
      >
        <WorkoutsStack.Group>
          <WorkoutsStack.Screen name="WorkoutPlans" component={Workouts} />
          <WorkoutsStack.Screen name="WorkoutPlanDetails" component={WorkoutPlanDetails} />
          <WorkoutsStack.Screen name="WorkoutDetails" component={WorkoutDetails}/>
          <WorkoutsStack.Screen
            name="CreateWorkoutPlan"
            component={CreateCustomWorkoutPlan}
          />
          <WorkoutsStack.Screen
            name="CreateWorkoutsForPlan"
            component={CreateWorkoutsForPlan}
          />
          <WorkoutsStack.Screen
            name="WorkoutSearch"
            component={WorkoutSelection}
            options={{ presentation: "modal", headerShown: false }}
          />
          <WorkoutsStack.Screen
            name="ExerciseSearchModal"
            component={ExerciseSearchModal}
            options={{ presentation: "modal", headerShown: false }}
          />
          <WorkoutsStack.Screen
            name="CreateCustomExercise"
            component={ExerciseCreationModal}
            options={{ presentation: "modal" , headerShown: false}}
          />
        </WorkoutsStack.Group>
      </WorkoutsStack.Navigator>
    </CreateCustomWorkoutPlanProvider>
  );
};

export default WorkoutsStackScreen;

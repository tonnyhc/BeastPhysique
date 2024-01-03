import { createStackNavigator } from "@react-navigation/stack";
import Workouts from "../screens/workouts/Workouts";
import CreateCustomWorkoutPlan from "../screens/workouts/CreateCustomWorkoutPlan";
import LogoIcon from "../components/header/LogoIcon";
import DrawerMenuIcon from "../components/header/DrawerMenuIcon";
import CreateCustomWorkoutPlanProvider from "../contexts/CustomWorkoutPlanContext";
import CreateWorkoutsForPlan from "../screens/workouts/CreateWorkoutsForPlan";
import ExerciseCreationCard from "../components/workouts/ExerciseCreationCard";
import WorkoutSelection from "../screens/workouts/WorkoutSelection";
import ExerciseSearchModal from "../components/workouts/ExerciseSearchModal";

const Stack = createStackNavigator();

const WorkoutsStack: React.FC = () => {
  return (
    <CreateCustomWorkoutPlanProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerTitle: "",
          headerRight: (props) => <LogoIcon />,
          headerLeft: (props) => <DrawerMenuIcon />,
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
        }}
        initialRouteName="CreateWorkoutPlan"
      >
        <Stack.Screen name="WorkoutPlans" component={Workouts} />
        <Stack.Screen
          name="CreateWorkoutPlan"
          component={CreateCustomWorkoutPlan}
        />
        <Stack.Screen
          name="CreateWorkoutsForPlan"
          component={CreateWorkoutsForPlan}
        />
        <Stack.Screen
          name="WorkoutSearch"
          component={WorkoutSelection}
          options={{ presentation: "modal", headerShown: false }}
        />
        <Stack.Screen
          name="ExerciseSearch"
          component={ExerciseSearchModal}
          options={{ presentation: "modal", headerShown: false }}
        />
      </Stack.Navigator>
    </CreateCustomWorkoutPlanProvider>
  );
};

export default WorkoutsStack;

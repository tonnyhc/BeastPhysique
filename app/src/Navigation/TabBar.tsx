import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../screens/Dashboard";

import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
  Feather,
} from "@expo/vector-icons";
import { useTheme } from "../contexts/ThemeContext";
import WorkoutsStackScreen from "../Stacks/WorkoutsStack";
import BarbellIcon from "../icons/BarbellIcon";

const Tab = createBottomTabNavigator();

const TabBar = () => {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={() => ({
        tabBarStyle: {
          backgroundColor: colors.bg,
        },
        headerShown: false,
        tabBarActiveTintColor: "#00BDD6FF",
        tabBarInactiveTintColor: "#565E6CFF",
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Nutrition"
        component={Dashboard}
        options={{
          tabBarLabel: "Nutrition",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="nutrition"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="WorkoutsStack"
        component={WorkoutsStackScreen}
        options={{
          tabBarLabel: "Workouts",
          tabBarIcon: ({ color, size }) => (
            // <MaterialIcons name="fitness-center" size={size} color={color} />
            <BarbellIcon size={size + 10} color={color}/>
          ),
        }}
      />
      <Tab.Screen
        name="Music"
        component={Dashboard}
        options={{
          tabBarLabel: "Music",
          tabBarIcon: ({ color, size }) => (
            <Feather name="music" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default TabBar;

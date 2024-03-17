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
import ProfileIcon from "../icons/ProfileIcon";
import ProfileStackScreen from "../Stacks/ProfileStack";
import HomeIcon from "../icons/HomeIcon";

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
        tabBarLabelStyle: {
          fontFamily: "RobotoSlabRegular",
          // TODO: When is active make the font "RobotoSlabBold"
        },

        headerShown: false,
        tabBarInactiveTintColor: "#565E6CFF",
        tabBarActiveTintColor: colors.orangeText,
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
            // <HomeIcon size={48} color={color}/>
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
            <BarbellIcon size={size + 10} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <ProfileIcon color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default TabBar;

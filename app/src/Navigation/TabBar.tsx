import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../screens/Dashboard";

import { useTheme } from "../contexts/ThemeContext";
import WorkoutsStackScreen from "../Stacks/WorkoutsStack";
import BarbellIcon from "../icons/BarbellIcon";
import ProfileStackScreen from "../Stacks/ProfileStack";
import HomeIcon from "../icons/HomeIcon";
import UserIcon from "../icons/UserIcon";
import MoreIcon from "../icons/MoreIcon";
import More from "../screens/more/BaseMoreScreen";
import MoreStackScreen from "../Stacks/MoreStack";

const Tab = createBottomTabNavigator();

const TabBar = () => {
  const { colors } = useTheme();
  return (
    <Tab.Navigator

      initialRouteName="Home"
      screenOptions={() => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.bg,
          borderTopWidth: 0,
        },
        tabBarItemStyle: {
          width: 24,
          height: 24,
        },
        headerShown: false,
        tabBarInactiveTintColor: colors.primaryText,
        tabBarActiveTintColor: colors.primaryText,
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <HomeIcon
              size={size }
              fill={focused ? colors.primaryText : "none"}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="WorkoutsStack"
        component={WorkoutsStackScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <BarbellIcon
              size={size}
              fill={focused ? color : "none"}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStackScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <UserIcon
              fill={focused ? color : "none"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={MoreStackScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MoreIcon
              fill={focused ? color : "none"}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default TabBar;

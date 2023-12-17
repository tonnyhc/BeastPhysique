import { View, Text, StyleSheet, FlatList } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../screens/Dashboard";

import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
  Feather,
} from "@expo/vector-icons";
import Workouts from "../screens/Workouts";
import { useTheme } from "../contexts/ThemeContext";

const Tab = createBottomTabNavigator();

type Tab = {
  name: string;
  component: React.ReactNode;
  icon: React.ReactNode;
};

const tabs: Tab[] = [
  { name: "Home", component: <Dashboard />, icon: <FontAwesome name="home" /> },
];

const TabBar = () => {
    const {colors} = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarStyle: {
            backgroundColor: colors.bg
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
        name="Workouts"
        component={Workouts}
        options={{
          tabBarLabel: "Workouts",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="fitness-center" size={size} color={color} />
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

const styles = StyleSheet.create({
  wrapper: {
    height: 64,
    fontSize: 10,
    justifyContent: "center",
    alignItems: "center",
    borderTopColor: "#CCC",
    borderTopWidth: 1,
    backgroundColor: "transparent",
  },
});

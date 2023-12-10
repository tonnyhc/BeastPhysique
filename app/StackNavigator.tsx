import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import { ReactNode } from "react";
import Dashboard from "./src/screens/Dashboard";

const Stack = createStackNavigator();
type Screen = {
  name: string;
  component: ReactNode;
};

const screens: Screen[] = [
  { name: "Login", component: <Login /> },
  { name: "Register", component: <Register /> },
];

const StackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Group>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default StackNavigator;

import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/Login";
import Register from "./screens/Register";
import { ReactNode } from "react";

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
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default StackNavigator;

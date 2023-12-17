import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "react-native";
import Screen from "../components/common/Screen";
import Login from "../screens/Login";
import Register from "../screens/Register";
import OTPVerification from "../components/authentication/OTPVerification";
import { useAuth } from "../contexts/AuthContext";

const Stack = createStackNavigator();

const AuthStack: React.FC = () => {
  const { token,isVerified } = useAuth();
  return (
    <Stack.Navigator
      // initialRouteName={token && isVerified ? "Login" : "OTPVerification"}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Group>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="OTPVerification" component={OTPVerification} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AuthStack;

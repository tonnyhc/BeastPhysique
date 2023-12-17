import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import OTPVerification from "../components/authentication/OTPVerification";
import { useAuth } from "../contexts/AuthContext";

const Stack = createStackNavigator();

const AuthStack: React.FC = () => {
  const { token,isVerified } = useAuth();
  console.log('token:', token);
  console.log('is verified', isVerified)
  return (
    <Stack.Navigator
      initialRouteName={token && isVerified === false ? "OTPVerification" : "Login"}
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

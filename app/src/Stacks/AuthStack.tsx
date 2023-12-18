import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/authentication/Login";
import Register from "../screens/authentication/Register";
import AccountVerification from "../screens/authentication/AccountVerification";
import { useAuth } from "../contexts/AuthContext";
import ForgotPassword from "../screens/authentication/ForgotPassword";
import ForgottenPasswordVerification from "../screens/authentication/ForgottenPasswordVerification";
import ResetPassword from "../screens/authentication/ResetPassword";

const Stack = createStackNavigator();

const AuthStack: React.FC = () => {
  const { token,isVerified } = useAuth();
  return (
    <Stack.Navigator
      initialRouteName={token && isVerified === false ? "AccountVerification" : "Login"}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Group>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="AccountVerification" component={AccountVerification} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name='ForgottenPasswordVerification' component={ForgottenPasswordVerification} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AuthStack;

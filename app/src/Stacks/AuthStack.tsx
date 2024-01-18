import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/authentication/Login";
import Register from "../screens/authentication/Register";
import AccountVerification from "../screens/authentication/AccountVerification";
import { useAuth } from "../contexts/AuthContext";
import ForgotPassword from "../screens/authentication/ForgotPassword";
import ForgottenPasswordVerification from "../screens/authentication/ForgottenPasswordVerification";
import ResetPassword from "../screens/authentication/ResetPassword";
import { ForgottenPasswordProvider } from "../contexts/ForgottenPasswordContext";
import SuccessVerification from "../screens/authentication/SuccessVerification";

export type AuthStackParamList = {
  Login: undefined,
  Register: undefined,
  AccountVerification: undefined;
  ForgotPassword: undefined;
  ForgottenPasswordVerification: undefined,
  ResetPassword: undefined,
  SuccessPasswordReset: undefined
  OTPVerification: undefined;
}

const AuthStack = createStackNavigator<AuthStackParamList>();

const AuthStackScreen: React.FC = () => {
  const { token, isVerified } = useAuth();
  return (
    <ForgottenPasswordProvider>
      <AuthStack.Navigator
        initialRouteName={
          token && !isVerified ? "AccountVerification" : "Login"
          // "AccountVerification"
        }
        screenOptions={{
          headerShown: false,
        }}
      >
        <AuthStack.Group>
          <AuthStack.Screen name="Login" component={Login} />
          <AuthStack.Screen name="Register" component={Register} />
          <AuthStack.Screen
            name="AccountVerification"
            component={AccountVerification}
          />
          <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
          <AuthStack.Screen
            name="ForgottenPasswordVerification"
            component={ForgottenPasswordVerification}
          />
          <AuthStack.Screen name="ResetPassword" component={ResetPassword} />
          <AuthStack.Screen name="SuccessPasswordReset" component={SuccessVerification} />
        </AuthStack.Group>
      </AuthStack.Navigator>
    </ForgottenPasswordProvider>
  );
};

export default AuthStackScreen;

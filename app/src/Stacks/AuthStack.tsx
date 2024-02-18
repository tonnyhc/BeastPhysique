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
import WelcomeScreen from "../screens/authentication/WelcomeScreen";
import SubmitButton from "../components/common/Button";
import ProfileSetupScreen from "./ProfileSetupStack";

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  AccountVerification: undefined;
  ForgotPassword: undefined;
  ForgottenPasswordVerification: undefined;
  ResetPassword: undefined;
  SuccessPasswordReset: undefined;
  OTPVerification: undefined;
  "Profile setup 1": undefined;
};

const AuthStack = createStackNavigator<AuthStackParamList>();

const AuthStackScreen: React.FC = () => {
  const { token, isVerified } = useAuth();
  return (
    <ForgottenPasswordProvider>
      <AuthStack.Navigator
        initialRouteName={
          token && !isVerified ? "AccountVerification" : "Welcome"
        }
        // initialRouteName="Profile setup 1"
        screenOptions={{
          headerShown: false,
          headerTitleStyle: { fontSize: 22, fontFamily: "RobotoSlab" },
        }}
      >
        <AuthStack.Group>
          <AuthStack.Screen
            name="Profile setup 1"
            options={{
              headerShown: false,
            }}
            component={ProfileSetupScreen}
          />
          <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
          <AuthStack.Screen name="Login" component={Login} />
          <AuthStack.Screen name="Register" component={Register} />
          <AuthStack.Screen
            name="AccountVerification"
            component={AccountVerification}
            options={{ headerShown: false }}
          />
          <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
          <AuthStack.Screen
            name="ForgottenPasswordVerification"
            component={ForgottenPasswordVerification}
          />
          <AuthStack.Screen name="ResetPassword" component={ResetPassword} />
          <AuthStack.Screen
            name="SuccessPasswordReset"
            component={SuccessVerification}
          />
        </AuthStack.Group>
      </AuthStack.Navigator>
    </ForgottenPasswordProvider>
  );
};

export default AuthStackScreen;

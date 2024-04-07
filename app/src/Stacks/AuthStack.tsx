import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import Login from "../screens/authentication/Login";
import Register from "../screens/authentication/Register";

import AccountVerification from "../screens/authentication/AccountVerification";
import { useAuth } from "../contexts/AuthContext";
import ForgotPassword from "../screens/authentication/ForgotPassword";
import ForgottenPasswordVerification from "../screens/authentication/ForgottenPasswordVerification";
import ResetPassword from "../screens/authentication/ResetPassword";
import { ForgottenPasswordProvider } from "../contexts/ForgottenPasswordContext";
import ProfileSetupScreen from "./ProfileSetupStack";
import { useTheme } from "../contexts/ThemeContext";
import BackButton from "../components/common/BackButton";
import Onboarding from "../screens/authentication/Onboarding";
import SuccessPasswordReset from "../screens/authentication/SuccessVerification";
import StackScreenHeader from "../components/common/StackScreenHeader";

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
  ProfileSetup: undefined;
};

const AuthStack = createStackNavigator<AuthStackParamList>();

const AuthStackScreen: React.FC = () => {
  const { token, isVerified, onLogout } = useAuth();

  return (
    <ForgottenPasswordProvider>
      <AuthStack.Navigator
        initialRouteName={
          token && !isVerified ? "AccountVerification" : "Welcome"
        }
        screenOptions={{
          headerShown: false,
        }}
      >
        <AuthStack.Group>
          <AuthStack.Screen
            name="ProfileSetup"
            options={{
              headerShown: false,
            }}
            component={ProfileSetupScreen}
          />
          <AuthStack.Screen name="Welcome" component={Onboarding} />
          <AuthStack.Screen name="Login" component={Login} />
          <AuthStack.Screen name="Register" component={Register} />
          <AuthStack.Screen
            name="AccountVerification"
            component={AccountVerification}
            options={({ navigation }) => ({
              header: () => <StackScreenHeader label="Account verification" />,
              headerShown: true,
            })}
          />
          <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
          <AuthStack.Screen
            name="ForgottenPasswordVerification"
            component={ForgottenPasswordVerification}
          />
          <AuthStack.Screen name="ResetPassword" component={ResetPassword} />
          <AuthStack.Screen
            name="SuccessPasswordReset"
            component={SuccessPasswordReset}
          />
        </AuthStack.Group>
      </AuthStack.Navigator>
    </ForgottenPasswordProvider>
  );
};

export default AuthStackScreen;

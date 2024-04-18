import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import ActivitySetup from "../screens/profile/ActivitySetup";
import PhysiqueGoalSetup from "../screens/profile/PhysiqueGoalSetup";
import NameScreen from "../screens/profile/NameScreen";
import AgeSelectScreen from "../screens/profile/AgeSelectScreen";
import GenderSetupScreen from "../screens/profile/GenderSetupScreen";
import MeasuresSetup from "../screens/profile/MeasuresSetup";

export type ProfileSetupStackParamsList = {
  NameScreen: undefined;
  MeasuresScreen: undefined;
  GenderSelectScreen: undefined;
  AgeSelectScreen: undefined;
  NameBirthDaySetup: undefined;
  MeasuresSetup: undefined;
  ActivitySetup: undefined;
  PhysiqueGoalSetup: undefined;
};

const ProfileSetupStack = createStackNavigator<ProfileSetupStackParamsList>();

const ProfileSetupStackScreen: React.FC = () => {
  return (
    <ProfileSetupStack.Navigator
      screenOptions={({ route, navigation }) => ({
        headerShown: false,

        headerShadowVisible: false,
      })}
    >
      <ProfileSetupStack.Screen name="NameScreen" component={NameScreen} />

      <ProfileSetupStack.Screen
        name="MeasuresScreen"
        component={MeasuresSetup}
      />
      <ProfileSetupStack.Screen
        name="GenderSelectScreen"
        component={GenderSetupScreen}
      />
      <ProfileSetupStack.Screen
        name="AgeSelectScreen"
        component={AgeSelectScreen}
      />

      <ProfileSetupStack.Screen
        name="ActivitySetup"
        component={ActivitySetup}
      />
      <ProfileSetupStack.Screen
        options={{ title: "Fitness goal" }}
        name="PhysiqueGoalSetup"
        component={PhysiqueGoalSetup}
      />
    </ProfileSetupStack.Navigator>
  );
};

export default ProfileSetupStackScreen;

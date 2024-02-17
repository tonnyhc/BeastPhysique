import { createStackNavigator } from "@react-navigation/stack";
import NameBirthdaySetup from "../screens/profile/NameBirthdaySetup";
import SubmitButton from "../components/common/Button";
import ActivitySetup from "../screens/profile/ActivitySetup";
import MeasuresSetup from "../screens/profile/MeasuresSetup";
import PhysiqueGoalSetup from "../screens/profile/PhysiqueGoalSetup";

export type ProfileSetupStackParamsList = {
  NameBirthDaySetup: undefined;
  MeasuresSetup: undefined;
  ActivitySetup: undefined;
  PhysiqueGoalSetup: undefined;
};

const ProfileSetupStack = createStackNavigator<ProfileSetupStackParamsList>();

const ProfileSetupScreen: React.FC = () => {
  return (
    <ProfileSetupStack.Navigator
      screenOptions={{
        headerTitleStyle:{fontFamily: "RobotoSlabRegular", fontWeight: '500'},
        headerShadowVisible: false,
        headerRight: () => (
          <SubmitButton
            onPress={() => {}}
            text="Skip"
            textStyles={{ fontSize: 16 }}
            type="text"
          />
        ),
      }}
    >
      <ProfileSetupStack.Screen
        name="NameBirthDaySetup"
        options={{ title: "Profile setup" }}
        component={NameBirthdaySetup}
      />
      <ProfileSetupStack.Screen
        options={{ title: "Measures" }}
        name="MeasuresSetup"
        component={MeasuresSetup}
      />
      <ProfileSetupStack.Screen
        options={{ title: "How active are you?" }}
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

export default ProfileSetupScreen;

import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import NameBirthdaySetup from "../screens/profile/NameBirthdaySetup";
import ActivitySetup from "../screens/profile/ActivitySetup";
import MeasuresSetup from "../screens/profile/MeasuresSetup";
import PhysiqueGoalSetup from "../screens/profile/PhysiqueGoalSetup";
import Button from "../components/common/Button";
import { useNavigation, useRoute } from "@react-navigation/native";

export type ProfileSetupStackParamsList = {
  NameBirthDaySetup: undefined;
  MeasuresSetup: undefined;
  ActivitySetup: undefined;
  PhysiqueGoalSetup: undefined;
};


const ProfileSetupStack = createStackNavigator<ProfileSetupStackParamsList>();

const ProfileSetupStackScreen: React.FC = () => {
  // const route = useRoute();
  // const navigation = useNavigation<StackNavigationProp<ProfileSetupStackParamsList>>()
  // const skipCurrentScreen = () => {
  //   const currentRouteName = route.name;

  //   switch (currentRouteName) {
  //     case "NameBirthDaySetup":
  //       navigation.navigate("MeasuresSetup");
  //       break;
  //     case "MeasuresSetup":
  //       navigation.navigate("ActivitySetup");
  //       break;
  //     // Add more cases for other screens as needed
  //     default:
  //       // Navigate to a default screen or handle the case accordingly
  //       break;
  //   }
  // };

  return (
    <ProfileSetupStack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontFamily: "RobotoSlabRegular",
          fontWeight: "500",
        },
        headerShadowVisible: false,
        headerRight: () => (
          <Button
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

export default ProfileSetupStackScreen;

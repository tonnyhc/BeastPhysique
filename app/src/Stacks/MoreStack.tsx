import { createStackNavigator } from "@react-navigation/stack";
import BaseMoreScreen from "../screens/more/BaseMoreScreen";
import { useTheme } from "../contexts/ThemeContext";
import PhysiqueGoalSetup from "../screens/profile/PhysiqueGoalSetup";

export type MoreStackParamsList = {
    Base: undefined;
    GoalSettings: undefined
}

const MoreStack = createStackNavigator<MoreStackParamsList>();

const MoreStackScreen: React.FC = () => {
  const { colors } = useTheme();
  return (
    <MoreStack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: colors.bg,
          margin: 0,
        },
        headerShadowVisible: false,
        headerTitleStyle: {
          fontSize: 20,
          fontFamily: "RobotoMedium",
          color: colors.primaryText,
          textAlign: "center",
        },
      }}
    >
        {/*  */}
      <MoreStack.Screen
        options={{
          headerShown: true,
          headerTitle: "More",
        }}
        component={BaseMoreScreen}
        name="Base"
      />
      {/*  */}
      <MoreStack.Screen name="GoalSettings" component={PhysiqueGoalSetup}/>
    </MoreStack.Navigator>
  );
};

export default MoreStackScreen;

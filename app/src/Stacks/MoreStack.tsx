import { createStackNavigator } from "@react-navigation/stack";
import BaseMoreScreen from "../screens/more/BaseMoreScreen";
import GoalSettings from "../screens/more/GoalSettings";
import WeightSettings from "../screens/more/WeightSettings";
import AccountSettingsScreen from "./AccountSettingsStack";
import SecuritySettingsStack from "./SecuritySettingsStack";
import TestStackScreenHeader from "../components/common/TestStackScreenHeader";
import { useTheme } from "../contexts/ThemeContext";
import NavigationGoBack from "../components/navigation/NavigationGoBack";

export type MoreStackParamsList = {
  Base: undefined;
  GoalSettings: undefined;
  WeightSettings: undefined;
  AccountSettings: undefined;
  SecuritySettings: undefined;
};

const MoreStack = createStackNavigator<MoreStackParamsList>();

const MoreStackScreen: React.FC = () => {
  const { colors } = useTheme();
  return (
    <MoreStack.Navigator initialRouteName="Base">
      <MoreStack.Screen
        options={{
          header: () => <TestStackScreenHeader headerTitle="More" />,
        }}
        component={BaseMoreScreen}
        name="Base"
      />
      <MoreStack.Screen
        name="GoalSettings"
        options={({ navigation }) => ({
          header: () => (
            <TestStackScreenHeader
              headerTitle="Goal"
              headerLeft={<NavigationGoBack />}
            />
          ),
        })}
        component={GoalSettings}
      />
      <MoreStack.Screen
        name="WeightSettings"
        options={({ navigation }) => ({
          header: () => (
            <TestStackScreenHeader
              headerTitle="Weight"
              headerLeft={<NavigationGoBack />}
            />
          ),
        })}
        component={WeightSettings}
      />
      <MoreStack.Screen
        options={({ navigation }) => ({ headerShown: false })}
        component={AccountSettingsScreen}
        name="AccountSettings"
      />
      <MoreStack.Screen
        options={({ navigation }) => ({ headerShown: false })}
        component={SecuritySettingsStack}
        name="SecuritySettings"
      />
    </MoreStack.Navigator>
  );
};

export default MoreStackScreen;

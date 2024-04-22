import { createStackNavigator } from "@react-navigation/stack";
import BaseMoreScreen from "../screens/more/BaseMoreScreen";
import GoalSettings from "../screens/more/GoalSettings";
import WeightSettings from "../screens/more/WeightSettings";
import AccountSettingsScreen from "./AccountSettingsStack";
import SecuritySettingsStack from "./SecuritySettingsStack";
import TestStackScreenHeader from "../components/common/TestStackScreenHeader";
import { useTheme } from "../contexts/ThemeContext";
import NavigationGoBack from "../components/navigation/NavigationGoBack";
import { useTranslation } from "react-i18next";
import LanguageSettings from "../screens/more/LanguageSettings";

export type MoreStackParamsList = {
  Base: undefined;
  GoalSettings: undefined;
  WeightSettings: undefined;
  AccountSettings: undefined;
  SecuritySettings: undefined;
  LanguageSettings: undefined;
};

const MoreStack = createStackNavigator<MoreStackParamsList>();

const MoreStackScreen: React.FC = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  return (
    <MoreStack.Navigator initialRouteName="Base">
      <MoreStack.Screen
        options={{
          header: () => (
            <TestStackScreenHeader
              headerTitle={t("screens.more.headerTitle")}
            />
          ),
        }}
        component={BaseMoreScreen}
        name="Base"
      />
      <MoreStack.Screen
        name="GoalSettings"
        options={({ navigation }) => ({
          header: () => (
            <TestStackScreenHeader
              headerTitle={t("screens.more.goal")}
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
              headerTitle={t("screens.more.weight")}
              headerLeft={<NavigationGoBack />}
            />
          ),
        })}
        component={WeightSettings}
      />
      <MoreStack.Screen
        name="LanguageSettings"
        options={({ navigation }) => ({
          header: () => (
            <TestStackScreenHeader
              headerTitle={t("screens.more.language")}
              headerLeft={<NavigationGoBack />}
            />
          ),
        })}
        component={LanguageSettings}
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

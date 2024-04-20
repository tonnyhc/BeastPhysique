import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "react-native";

import BaseAccountSettingsScreen from "../screens/account/BaseAccountSettingsScreen";
import { TouchableOpacity } from "react-native";
import ChevronLeft from "../icons/ChevronLeft";
import { useTheme } from "../contexts/ThemeContext";
import TestStackScreenHeader from "../components/common/TestStackScreenHeader";

export type AccountSettingsParamsList = {
  BaseScreen: undefined;
};

const AccountSettingsStack = createStackNavigator<AccountSettingsParamsList>();

const AccountSettingsScreen: React.FC = () => {
  const { colors } = useTheme();
  return (
    <AccountSettingsStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.bg },
        headerShadowVisible: false,
      }}
    >
      <AccountSettingsStack.Screen
        options={({ navigation }) => ({
          header: () => (
            <TestStackScreenHeader
              headerTitle="Account"
              headerLeft={
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <ChevronLeft size={24} color={colors.primaryText} />
                </TouchableOpacity>
              }
            />
          ), 
        })}
        name="BaseScreen"
        component={BaseAccountSettingsScreen}
      />
    </AccountSettingsStack.Navigator>
  );
};

export default AccountSettingsScreen;

import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "react-native";

import BaseAccountSettingsScreen from "../screens/account/settings/BaseAccountSettingsScreen";
import { TouchableOpacity } from "react-native";
import ChevronLeft from "../icons/ChevronLeft";
import { useTheme } from "../contexts/ThemeContext";
import TestStackScreenHeader from "../components/common/TestStackScreenHeader";
import NameAccountSettingsScreen from "../screens/account/settings/NameAccountSettingsScreen";
import UsernameAccountSettingsScreen from "../screens/account/settings/UsernameAccountSettingsScreen";
import BioAccountSettingsScreen from "../screens/account/settings/BioAccountSettingsScreen";
import BirthdayAccountSettingsScreen from "../screens/account/settings/BirthdayAccountSettingsScreen";

export type AccountSettingsParamsList = {
  BaseScreen: undefined;
  NameScreen: undefined;
  UsernameScreen: undefined;
  BioScreen: undefined;
  BirthdayScreen: undefined;
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
      <AccountSettingsStack.Screen
        options={({ navigation }) => ({
          header: () => (
            <TestStackScreenHeader
              headerTitle="Edit name"
              headerLeft={
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <ChevronLeft size={24} color={colors.primaryText} />
                </TouchableOpacity>
              }
            />
          ),
        })}
        name="NameScreen"
        component={NameAccountSettingsScreen}
      />
      <AccountSettingsStack.Screen
        options={({ navigation }) => ({
          header: () => (
            <TestStackScreenHeader
              headerTitle="Edit username"
              headerLeft={
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <ChevronLeft size={24} color={colors.primaryText} />
                </TouchableOpacity>
              }
            />
          ),
        })}
        name="UsernameScreen"
        component={UsernameAccountSettingsScreen}
      />
      <AccountSettingsStack.Screen
        options={({ navigation }) => ({
          header: () => (
            <TestStackScreenHeader
              headerTitle="Edit bio"
              headerLeft={
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <ChevronLeft size={24} color={colors.primaryText} />
                </TouchableOpacity>
              }
            />
          ),
        })}
        name="BioScreen"
        component={BioAccountSettingsScreen}
      />
      <AccountSettingsStack.Screen
        options={({ navigation }) => ({
          header: () => (
            <TestStackScreenHeader
              headerTitle="Edit birthday"
              headerLeft={
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <ChevronLeft size={24} color={colors.primaryText} />
                </TouchableOpacity>
              }
            />
          ),
        })}
        name="BirthdayScreen"
        component={BirthdayAccountSettingsScreen}
      />
    </AccountSettingsStack.Navigator>
  );
};

export default AccountSettingsScreen;

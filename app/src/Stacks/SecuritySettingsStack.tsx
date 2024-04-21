import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BaseSecuritySettingsScreen from "../screens/security/settings/BaseSecuritySettingsScreen";
import TestStackScreenHeader from "../components/common/TestStackScreenHeader";
import NavigationGoBack from "../components/navigation/NavigationGoBack";
import ChangePasswordScreen from "../screens/security/settings/ChangePasswordScreen";
import { useTranslation } from "react-i18next";

export type SecuritySettingsStackParamsList = {
  Base: undefined;
  ChangePassword: undefined;
};

const Stack = createStackNavigator<SecuritySettingsStackParamsList>();

const SecuritySettingsStack: React.FC = () => {
  const {t} = useTranslation();
  return (
    <Stack.Navigator initialRouteName="Base">
      <Stack.Screen
        options={{
          header: (props) => (
            <TestStackScreenHeader
              headerTitle={t('screens.more.security')}
              headerLeft={<NavigationGoBack />}
            />
          ),
        }}
        component={BaseSecuritySettingsScreen}
        name="Base"
      />
      <Stack.Screen
        options={{
          header: (props) => (
            <TestStackScreenHeader
              headerTitle={t('screens.change_password.change_password')}
              headerLeft={<NavigationGoBack />}
            />
          ),
        }}
        component={ChangePasswordScreen}
        name="ChangePassword"
      />
    </Stack.Navigator>
  );
};

export default SecuritySettingsStack;

const styles = StyleSheet.create({});

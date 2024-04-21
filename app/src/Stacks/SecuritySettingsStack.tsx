import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BaseSecuritySettingsScreen from "../screens/security/settings/BaseSecuritySettingsScreen";
import TestStackScreenHeader from "../components/common/TestStackScreenHeader";
import NavigationGoBack from "../components/navigation/NavigationGoBack";
import ChangePasswordScreen from "../screens/security/settings/ChangePasswordScreen";

export type SecuritySettingsStackParamsList = {
  Base: undefined;
  ChangePassword: undefined;
};

const Stack = createStackNavigator<SecuritySettingsStackParamsList>();

const SecuritySettingsStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Base">
      <Stack.Screen
        options={{
          header: (props) => (
            <TestStackScreenHeader
              headerTitle="Security"
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
              headerTitle="Change password"
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

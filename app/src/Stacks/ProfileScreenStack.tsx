import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProfileScreen from '../screens/profile/ProfileScreen'
import AccountSettingsScreen from './AccountSettingsStack'

export type ProfileScreenStackParamsList = {
    Profile: undefined;
    EditProfile: undefined;
}

const Stack = createStackNavigator<ProfileScreenStackParamsList>();


const ProfileScreenStack:React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false,

    }}>
        <Stack.Screen name="Profile" component={ProfileScreen}/>
        <Stack.Screen name="EditProfile" component={AccountSettingsScreen}/>
    </Stack.Navigator>
  )
}

export default ProfileScreenStack

const styles = StyleSheet.create({})
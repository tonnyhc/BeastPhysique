import { createStackNavigator } from "@react-navigation/stack";
import BaseMoreScreen from "../screens/more/BaseMoreScreen";
import { useTheme } from "../contexts/ThemeContext";
import GoalSettings from "../screens/more/GoalSettings";
import ChevronLeft from "../icons/ChevronLeft";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import WeightSettings from "../screens/more/WeightSettings";
import AccountSettingsScreen from "./AccountSettingsStack";

export type MoreStackParamsList = {
  Base: undefined;
  GoalSettings: undefined;
  WeightSettings: undefined;
  AccountSettings: undefined;
};

const MoreStack = createStackNavigator<MoreStackParamsList>();

const MoreStackScreen: React.FC = () => {
  const { colors } = useTheme();
  return (
    <MoreStack.Navigator
      screenOptions={{
        headerShown: true,
        headerLeftContainerStyle: {
          paddingLeft: 12,
        },
        headerRightContainerStyle: {
          paddingRight: 12,
        },
        headerStyle: {
          backgroundColor: colors.bg,
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
      <MoreStack.Screen
        name="GoalSettings"
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
              <ChevronLeft size={24} color={colors.primaryText} />
            </TouchableWithoutFeedback>
          ),
          headerTitle: "Goal",
        })}
        component={GoalSettings}
      />
      <MoreStack.Screen
        name="WeightSettings"
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
              <ChevronLeft size={24} color={colors.primaryText} />
            </TouchableWithoutFeedback>
          ),
          headerTitle: "Weight",
        })}
        component={WeightSettings}
      />
      <MoreStack.Screen
        options={({ navigation }) => ({ headerShown: false })}
        component={AccountSettingsScreen}
        name="AccountSettings"
      />
    </MoreStack.Navigator>
  );
};

export default MoreStackScreen;

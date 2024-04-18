import { createStackNavigator } from "@react-navigation/stack";
import BaseMoreScreen from "../screens/more/BaseMoreScreen";
import { useTheme } from "../contexts/ThemeContext";
import PhysiqueGoalSetup from "../screens/profile/PhysiqueGoalSetup";
import GoalSettings from "../screens/more/GoalSettings";
import StackScreenHeader from "../components/common/StackScreenHeader";
import ChevronLeft from "../icons/ChevronLeft";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export type MoreStackParamsList = {
  Base: undefined;
  GoalSettings: undefined;
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
    </MoreStack.Navigator>
  );
};

export default MoreStackScreen;

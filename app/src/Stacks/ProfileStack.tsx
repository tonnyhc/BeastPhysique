import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/profile/ProfileScreen";
import LogoIcon from "../components/header/LogoIcon";
import { useTheme } from "../contexts/ThemeContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import GearIcon from "../icons/GearIcon";

export type ProfileStackParamsList = {
  Profile: undefined;
};

const ProfileStack = createStackNavigator<ProfileStackParamsList>();

const ProfileStackScreen: React.FC = () => {
  const { colors } = useTheme();
  return (
    <ProfileStack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: true,
        headerTitle: "",
        headerLeft: (props) => <LogoIcon />,
        headerLeftContainerStyle: {
          paddingLeft: 12,
        },
        // headerLeft: (props) => <DrawerMenuIcon />,
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          backgroundColor: colors.bg,
        },
      }}
    >
      <ProfileStack.Screen
        component={ProfileScreen}
        options={{
          headerRight: (props) => (
            <TouchableOpacity>
              <GearIcon size={32} color={colors.primaryText} />
            </TouchableOpacity>
          ),
          headerRightContainerStyle: {
            paddingRight: 12
          }
        }}
        name="Profile"
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackScreen;

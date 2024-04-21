import { ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import React from "react";
import Screen from "../../components/common/Screen";
import { useTheme } from "../../contexts/ThemeContext";
import SettingsFrameWrapper, {
  SettingsFrameWrapperProps,
} from "../../components/more-screen/SettingsFrameWrapper";
import BarbellIcon from "../../icons/BarbellIcon";
import { Colors } from "../../utils/colors";
import ChevronRight from "../../icons/ChevronRight";
import ScaleIcon from "../../icons/ScaleIcon";
import EditIcon from "../../icons/EditIcon";
import NotificationIcon from "../../icons/NotificationIcon";
import LanguageIcon from "../../icons/LanguageIcon";
import ShieldIcon from "../../icons/ShieldIcon";
import MoonIcon from "../../icons/MoonIcon";
import FlagIcon from "../../icons/FlagIcon";
import Button from "../../components/common/Button";
import LogoutIcon from "../../icons/LogoutIcon";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MoreStackParamsList } from "../../Stacks/MoreStack";
import UserIcon from "../../icons/UserIcon";

const generateCategories = (
  colors: Colors,
  toggleDarkMode: () => void,
  theme: string,
  navigation: StackNavigationProp<MoreStackParamsList>
) => {
  const categories: SettingsFrameWrapperProps[] = [
    // Health & Fitness
    {
      categoryName: "Health & Fitness",
      properties: [
        // Exercises
        {
          title: "Exercises",
          icon: <BarbellIcon size={24} color={colors.primaryText} />,
          action: <ChevronRight size={24} color={colors.primaryText} />,
          navigate: () => navigation.navigate("Base"),
        },
        // Workouts
        {
          title: "Workouts",
          icon: <BarbellIcon size={24} color={colors.primaryText} />,
          action: <ChevronRight size={24} color={colors.primaryText} />,
          navigate: () => navigation.navigate("Base"),
        },
        // Weight
        {
          title: "Weight",
          icon: <ScaleIcon size={24} color={colors.primaryText} />,
          action: <ChevronRight size={24} color={colors.primaryText} />,
          navigate: () => navigation.navigate("WeightSettings"),
        },
        // Goal
        {
          title: "Goal",
          icon: <EditIcon size={24} color={colors.primaryText} />,
          action: <ChevronRight size={24} color={colors.primaryText} />,
          navigate: () => navigation.navigate("GoalSettings"),
        },
      ],
    },
    // Settings & Preferences
    {
      categoryName: "Settings & Preferences",
      properties: [
        // Account
        {
          title: "Account",
          icon: <UserIcon size={24} color={colors.primaryText} />,
          action: <ChevronRight size={24} color={colors.primaryText} />,
          navigate: () => navigation.navigate("AccountSettings"),
        },

        // Notifications
        {
          title: "Notifications",
          icon: <NotificationIcon size={24} color={colors.primaryText} />,
          action: <ChevronRight size={24} color={colors.primaryText} />,
        },
        // Language
        {
          title: "Language",
          icon: <LanguageIcon size={24} color={colors.primaryText} />,
          action: <ChevronRight size={24} color={colors.primaryText} />,
        },
        // Security
        {
          title: "Security",
          icon: <ShieldIcon size={24} color={colors.primaryText} />,
          action: <ChevronRight size={24} color={colors.primaryText} />,
          navigate: () => navigation.navigate("SecuritySettings"),
        },
        // Dark mode
        {
          title: "Dark mode",
          icon: <MoonIcon size={24} color={colors.primaryText} />,
          action: (
            <Switch
              value={theme === "dark" ? true : false}
              onChange={() => toggleDarkMode()}
            />
          ),
          navigate: () => toggleDarkMode(),
        },
      ],
    },
    // Support
    {
      categoryName: "Support",
      properties: [
        // Help center
        {
          title: "Help center",
          icon: <NotificationIcon size={24} color={colors.primaryText} />,
          action: <ChevronRight size={24} color={colors.primaryText} />,
        },
        // Report a bug
        {
          title: "Report a bug",
          icon: <FlagIcon size={24} color={colors.primaryText} />,
          action: <ChevronRight size={24} color={colors.primaryText} />,
        },
      ],
    },
  ];

  return categories;
};

const BaseMoreScreen: React.FC = () => {
  const { colors, toggleTheme, theme } = useTheme();
  const navigation = useNavigation<StackNavigationProp<MoreStackParamsList>>();
  const { onLogout } = useAuth();
  const categories = generateCategories(colors, toggleTheme, theme, navigation);

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 30,
          gap: 10,
        }}
      >
        {categories.map((cat, index) => (
          <SettingsFrameWrapper
            key={cat.categoryName + index}
            categoryName={cat.categoryName}
            properties={cat.properties}
          />
        ))}
        <View style={{ alignItems: "flex-start" }}>
          <Button
            textStyles={{ color: colors.error }}
            onPress={() => (onLogout ? onLogout() : null)}
            leftIcon={<LogoutIcon size={24} color={colors.error} />}
            type="text"
            text="Log out"
          />
        </View>
      </ScrollView>
    </Screen>
  );
};

export default BaseMoreScreen;

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
import { useTranslation } from "react-i18next";

const generateCategories = (
  colors: Colors,
  toggleDarkMode: () => void,
  theme: string,
  navigation: StackNavigationProp<MoreStackParamsList>,
  t: (key: string) => string
) => {
  const categories: SettingsFrameWrapperProps[] = [
    // Health & Fitness
    {
      categoryName: t("screens.more.health_fitness"),
      properties: [
        // Exercises
        {
          title: t("screens.more.exercises"),
          icon: <BarbellIcon size={24} color={colors.primaryText} />,
          action: <ChevronRight size={24} color={colors.primaryText} />,
          navigate: () => navigation.navigate("Base"),
        },
        // Workouts
        {
          title: t("screens.more.workouts"),
          icon: <BarbellIcon size={24} color={colors.primaryText} />,
          action: <ChevronRight size={24} color={colors.primaryText} />,
          navigate: () => navigation.navigate("Base"),
        },
        // Weight
        {
          title: t("screens.more.weight"),
          icon: <ScaleIcon size={24} color={colors.primaryText} />,
          action: <ChevronRight size={24} color={colors.primaryText} />,
          navigate: () => navigation.navigate("WeightSettings"),
        },
        // Goal
        {
          title: t("screens.more.goal"),
          icon: <EditIcon size={24} color={colors.primaryText} />,
          action: <ChevronRight size={24} color={colors.primaryText} />,
          navigate: () => navigation.navigate("GoalSettings"),
        },
      ],
    },
    // Settings & Preferences
    {
      categoryName: t("screens.more.settings_preferences"),
      properties: [
        // Account
        {
          title: t("screens.more.account"),
          icon: <UserIcon size={24} color={colors.primaryText} />,
          action: <ChevronRight size={24} color={colors.primaryText} />,
          navigate: () => navigation.navigate("AccountSettings"),
        },

        // Notifications
        {
          title: t("screens.more.notifications"),
          icon: <NotificationIcon size={24} color={colors.primaryText} />,
          action: <ChevronRight size={24} color={colors.primaryText} />,
        },
        // Language
        {
          title: t("screens.more.language"),
          icon: <LanguageIcon size={24} color={colors.primaryText} />,
          action: <ChevronRight size={24} color={colors.primaryText} />,
          navigate: () => navigation.navigate("LanguageSettings"),
        },
        // Security
        {
          title: t("screens.more.security"),
          icon: <ShieldIcon size={24} color={colors.primaryText} />,
          action: <ChevronRight size={24} color={colors.primaryText} />,
          navigate: () => navigation.navigate("SecuritySettings"),
        },
        // Dark mode
        {
          title: t("screens.more.darkMode"),
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
      categoryName: t("screens.more.support"),
      properties: [
        // Help center
        {
          title: t("screens.more.helpCenter"),
          icon: <NotificationIcon size={24} color={colors.primaryText} />,
          action: <ChevronRight size={24} color={colors.primaryText} />,
        },
        // Report a bug
        {
          title: t("screens.more.reportBug"),
          icon: <FlagIcon size={24} color={colors.primaryText} />,
          action: <ChevronRight size={24} color={colors.primaryText} />,
        },
      ],
    },
  ];

  return categories;
};

const BaseMoreScreen: React.FC = () => {
  const { t } = useTranslation();
  const { colors, toggleTheme, theme } = useTheme();
  const navigation = useNavigation<StackNavigationProp<MoreStackParamsList>>();
  const { onLogout } = useAuth();
  const categories = generateCategories(
    colors,
    toggleTheme,
    theme,
    navigation,
    t
  );

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
            text={t("screens.more.logOut")}
          />
        </View>
      </ScrollView>
    </Screen>
  );
};

export default BaseMoreScreen;

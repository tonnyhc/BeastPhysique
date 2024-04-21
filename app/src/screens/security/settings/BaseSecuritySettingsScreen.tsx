import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Screen from "../../../components/common/Screen";
import { SettingsNavigationCardProps } from "../../../components/more-screen/SettingsFrameWrapper";
import ChevronRight from "../../../icons/ChevronRight";
import { Colors } from "../../../utils/colors";
import { StackNavigationProp } from "@react-navigation/stack";
import { SecuritySettingsStackParamsList } from "../../../Stacks/SecuritySettingsStack";
import LockIcon from "../../../icons/LockIcon";
import { useTheme } from "../../../contexts/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import SettingsNavigationCard from "../../../components/navigation/SettingsNavigationCard";
import EmailIcon from "../../../icons/EmailIcon";

const generateNavCards = (
  colors: Colors,
  navigation: StackNavigationProp<SecuritySettingsStackParamsList>
) => {
  const cards: SettingsNavigationCardProps[] = [
    {
      title: "Password",
      icon: <LockIcon size={24} color={colors.primaryText} />,
      action: <ChevronRight size={24} color={colors.primaryText} />,
      navigate: () => navigation.navigate("ChangePassword"),
    },
    {
      title: "Email",
      icon: <EmailIcon size={24} color={colors.primaryText} />,
      action: <ChevronRight size={24} color={colors.primaryText} />,
      navigate: () => navigation.navigate("ChangePassword"),
    },
  ];
  return cards;
};

const BaseSecuritySettingsScreen: React.FC = () => {
  const navigation =
    useNavigation<StackNavigationProp<SecuritySettingsStackParamsList>>();
  const { colors } = useTheme();
  const cards = generateNavCards(colors, navigation);
  return (
    <Screen>
      <View style={{ gap: 16 }}>
        {cards.map((item) => (
          <SettingsNavigationCard
            key={item.title}
            title={item.title}
            action={item.action}
            icon={item.icon}
            navigate={() => item.navigate()}
          />
        ))}
      </View>
    </Screen>
  );
};

export default BaseSecuritySettingsScreen;

const styles = StyleSheet.create({});

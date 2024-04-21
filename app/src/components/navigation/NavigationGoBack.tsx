import { TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import ChevronLeft from "../../icons/ChevronLeft";
import { useTheme } from "../../contexts/ThemeContext";

const NavigationGoBack: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <ChevronLeft size={24} color={colors.primaryText} />
    </TouchableOpacity>
  );
};

export default NavigationGoBack;

import { View, Text } from "react-native";
import React from "react";

import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../contexts/ThemeContext";

const DrawerMenuIcon: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  return (
    <View style={{ paddingLeft: 10 }}>
      <MaterialIcons
        onPress={() => navigation.openDrawer()}
        name="menu"
        size={26}
        color={colors.primaryText}
      />
    </View>
  );
};

export default DrawerMenuIcon;

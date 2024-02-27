import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { IconProps } from "../ts/interfaces";

import { View } from "react-native";

const BurgerIcon: React.FC<IconProps> = ({ color, size }) => {
  return (
    <View>
      <MaterialCommunityIcons name="hamburger" size={size} color={color} />
    </View>
  );
};

export default BurgerIcon;

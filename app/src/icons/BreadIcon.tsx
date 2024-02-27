import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { IconProps } from "../ts/interfaces";

import { View } from "react-native";

const BreadIcon: React.FC<IconProps> = ({ color, size }) => {
  return (
    <View>
      <MaterialCommunityIcons name="bread-slice-outline" size={size} color={color} />
    </View>
  );
};

export default BreadIcon;

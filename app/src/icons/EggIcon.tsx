import { View } from "react-native";
import React from "react";
import { IconProps } from "../ts/interfaces";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const EggIcon: React.FC<IconProps> = ({ size, color }) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <MaterialCommunityIcons name="egg-outline" size={size} color={color} />
    </View>
  );
};

export default EggIcon;

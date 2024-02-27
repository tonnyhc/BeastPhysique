import { View } from "react-native";
import React from "react";
import { IconProps } from "../ts/interfaces";
import { AntDesign } from "@expo/vector-icons";

const HeartIcon: React.FC<IconProps> = ({ size, color }) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <AntDesign name="hearto" size={size} color={color} />
    </View>
  );
};

export default HeartIcon;

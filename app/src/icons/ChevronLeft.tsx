import React from "react";
import { IconProps } from "../ts/interfaces";
import { Entypo } from "@expo/vector-icons";

import { View } from "react-native";

const ChevronLeft: React.FC<IconProps> = ({ color, size }) => {
  return (
    <View>
        <Entypo name="chevron-left" size={size} color={color} />
    </View>
  );
};

export default ChevronLeft;

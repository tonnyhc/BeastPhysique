import React from "react";
import { IconProps } from "../ts/interfaces";
import { Entypo } from "@expo/vector-icons";

import { View } from "react-native";

const ChevronRight: React.FC<IconProps> = ({ color, size }) => {
  return (
    <View>
        <Entypo name="chevron-right" size={size} color={color} />
    </View>
  );
};

export default ChevronRight;

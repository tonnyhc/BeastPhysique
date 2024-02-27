import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { IconProps } from "../ts/interfaces";

import { View } from "react-native";

const CalendarIcon: React.FC<IconProps> = ({ color, size }) => {
  return (
    <View>
      <AntDesign name="calendar" size={size} color={color} />
    </View>
  );
};

export default CalendarIcon;

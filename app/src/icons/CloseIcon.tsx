import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import { View } from "react-native";
import { IconProps } from "../ts/interfaces";

const CloseIcon: React.FC<IconProps> = ({ color, size }) => {
  return (
    <View>
      <AntDesign name="close" size={size} color={color} />
    </View>
  );
};

export default CloseIcon;

import React from "react";
import { IconProps } from "../ts/interfaces";
import { FontAwesome5 } from "@expo/vector-icons";

import { View } from "react-native";

const UserIcon: React.FC<IconProps> = ({ color, size }) => {
  return (
    <View>
      <FontAwesome5 name="user-circle" size={size} color={color} />
    </View>
  );
};

export default UserIcon;

import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { IconProps } from "../ts/interfaces";

import { View } from "react-native";

const PersonIcon: React.FC<IconProps> = ({ color, size }) => {
  return (
    <View>
      <MaterialCommunityIcons
        name="human-handsdown"
        size={size}
        color={color}
      />
    </View>
  );
};

export default PersonIcon;

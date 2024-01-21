import { View } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { IconProps } from "../ts/interfaces";

const TrashIcon: React.FC<IconProps> = ({ size, color }) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <FontAwesome name="trash" size={size} color={color} />
    </View>
  );
};

export default TrashIcon;

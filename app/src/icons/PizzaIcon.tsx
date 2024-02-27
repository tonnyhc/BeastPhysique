import { View } from "react-native";
import React from "react";
import { IconProps } from "../ts/interfaces";
import { Ionicons } from '@expo/vector-icons';

const PizzaIcon: React.FC<IconProps> = ({ size, color }) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Ionicons name="pizza-outline" size={size} color={color} />
    </View>
  );
};

export default PizzaIcon;

import { View } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
interface TrashIconProps {
  size: number;
  color: string;
}

const TrashIcon: React.FC<TrashIconProps> = ({ size, color }) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <FontAwesome name="trash" size={size} color={color} />
    </View>
  );
};

export default TrashIcon;

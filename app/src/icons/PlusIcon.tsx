import React from "react";
import { IconProps } from "../ts/interfaces";
import { AntDesign } from '@expo/vector-icons';
import { View } from "react-native";

const PlusIcon: React.FC<IconProps> = ({ color, size }) => {
  return (
    <View>
        <AntDesign name="plus" size={size} color={color}/>
    </View>
  );
};

export default PlusIcon;

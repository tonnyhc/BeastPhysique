import { Entypo } from '@expo/vector-icons';
import React from "react";
import { IconProps } from "../ts/interfaces";

import { View } from "react-native";

const RulerIcon: React.FC<IconProps> = ({ color, size }) => {
  return (
    <View>
      <Entypo name="ruler" size={size} color={color}/>
    </View>
  );
};

export default RulerIcon;

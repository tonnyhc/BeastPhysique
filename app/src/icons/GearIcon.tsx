import { View, Text } from 'react-native'
import React from 'react'
import { IconProps } from '../ts/interfaces'
import { FontAwesome } from '@expo/vector-icons';

const GearIcon:React.FC<IconProps> = ({
    size,
    color
}) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <FontAwesome name="gear" size={size} color={color} />
    </View>
  )
}

export default GearIcon
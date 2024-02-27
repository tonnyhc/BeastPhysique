import { View, Text } from 'react-native'
import React from 'react'
import { IconProps } from '../ts/interfaces'
import { Entypo } from '@expo/vector-icons';

const SearchIcon:React.FC<IconProps> = ({
    size,
    color
}) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Entypo name="magnifying-glass" size={size} color={color} />
    </View>
  )
}

export default SearchIcon
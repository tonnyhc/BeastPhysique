import { View, Text } from 'react-native'
import React from 'react'
import { IconProps } from '../ts/interfaces'
import { FontAwesome5 } from '@expo/vector-icons';

const ProfileIcon:React.FC<IconProps> = ({
    size,
    color
}) => {
  return (
    <View>
      <FontAwesome5 name="user-alt" size={size} color={color} />
    </View>
  )
}

export default ProfileIcon
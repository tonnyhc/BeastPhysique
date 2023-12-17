import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { useTheme } from '../../contexts/ThemeContext';

const UpperLogoWrapper:React.FC = () => {
    const {colors} = useTheme();
    const styles = StyleSheet.create({
        wrapper: {
            justifyContent: "space-between",
            flexDirection: 'row',
        },
        text: {
            fontSize: 28,
            fontWeight: '700',
            color: colors.primaryText,
            fontFamily: 'Acme'
        },
        logoImg: {
            resizeMode: "cover",
              width: 44,
              height: 44,
              borderRadius: 100,
        }
        
    })
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>BeastPhysique</Text>
      <Image
            style={styles.logoImg}
            source={require("../../../assets/pngtree-flat-barbell-png-image_6015194.jpg")}
          />
    </View>
  )
}

export default UpperLogoWrapper
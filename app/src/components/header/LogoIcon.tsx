import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "../../contexts/ThemeContext";

const LogoIcon: React.FC = () => {
  const {theme} = useTheme()
  const lightImage = require(`../../../assets/IconWhite.png`);
  const darkImage=require(`../../../assets/IconBlack.png`);
  const image = theme === 'dark' ? lightImage : darkImage
  const styles = StyleSheet.create({
    image: {
      width: 45,
      height: 35,
      objectFit: 'contain',
      alignSelf: "flex-end",
      padding: 0,
    },
  });
  return (
    <View style={{paddingRight: 10}}>
      <Image style={styles.image} source={image} />
    </View>
  );
};

export default LogoIcon;

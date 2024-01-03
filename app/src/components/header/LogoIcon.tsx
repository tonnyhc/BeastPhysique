import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

const LogoIcon: React.FC = () => {
  const image = require("../../../assets/IconBlack.png");

  const styles = StyleSheet.create({
    image: {
      width: 45,
      height: 35,
      objectFit: 'contain',
      alignSelf: "flex-end",
      padding: 0
    },
  });
  return (
    <View style={{paddingRight: 10}}>
      <Image style={styles.image} source={image} />
    </View>
  );
};

export default LogoIcon;

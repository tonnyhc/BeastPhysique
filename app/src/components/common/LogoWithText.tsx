import { View, Image } from "react-native";
import React from "react";
import { useTheme } from "../../contexts/ThemeContext";

interface LogoWithTextProps {
    width: number,
    height: number
}

const LogoWithText: React.FC<LogoWithTextProps> = ({
    width,
    height
}) => {
  const { theme} = useTheme();

  const darkImage = require("../../../assets/splash-black.png");
  const whiteImage = require("../../../assets/splash.png");
  return (
    <View style={{ flex: 1 }}>
      <Image
        style={{
          objectFit: "contain",
          width: width,
          height: height,
          alignSelf: "center",
        }}
        source={theme === "dark" ? whiteImage : darkImage}
      />
    </View>
  );
};

export default LogoWithText;

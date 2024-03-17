import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";

import { useFonts } from "expo-font";

import { useCallback } from "react";
import { useAuth } from "./src/contexts/AuthContext";
import TabBar from "./src/Navigation/TabBar";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "./src/contexts/ThemeContext";
import AuthStackScreen from "./src/Stacks/AuthStack";
import ProfileSetupStackScreen from "./src/Stacks/ProfileSetupStack";

const LightTheme = {
  dark: false,
  colors: {
    primary: "rgb(0, 122, 255)",
    background: "#ffffff",
    card: "rgb(255, 255, 255)",
    text: "rgb(28, 28, 30)",
    border: "rgb(216, 216, 216)",
    notification: "rgb(255, 59, 48)",
  },
};

SplashScreen.preventAutoHideAsync();
const Layout: React.FC = () => {
  const { theme } = useTheme();
  const { isAuth, isVerified, setupProfile } = useAuth();

  const [fontsLoaded, fontError] = useFonts({
    ArimaBold: require("./assets/fonts/arima/Arima-Bold.ttf"),
    ArimaRegular: require("./assets/fonts/arima/Arima-Regular.ttf"),
    RobotoRegular: require("./assets/fonts/roboto/Roboto-Regular.ttf"),
    RobotoBold: require("./assets/fonts/roboto/Roboto-Bold.ttf"),
    RobotoMedium: require("./assets/fonts/roboto/Roboto-Medium.ttf"),
    RobotoSlabRegular: require("./assets/fonts/roboto-slab/RobotoSlab-Regular.ttf"),
    RobotoSlabMedium:require("./assets/fonts/roboto-slab/RobotoSlab-Medium.ttf"),
    RobotoSlabBold: require("./assets/fonts/roboto-slab/RobotoSlab-Bold.ttf"),

    IntegralRegular: require("./assets/fonts/integral/integralcf-regular.otf"),
    IntegralBold: require("./assets/fonts/integral/integralcf-bold.otf"),
    
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const renderFn = () => {
    if (setupProfile) {
      return <ProfileSetupStackScreen />;
    }
    if (!isAuth || (isAuth && !isVerified)) {
      return <AuthStackScreen />;
    }
    return <TabBar />;
  };

  return (
    <NavigationContainer theme={LightTheme} onReady={onLayoutRootView}>
      {renderFn()}
      <StatusBar style={theme == "light" ? "dark" : "light"} />
    </NavigationContainer>
  );
};
export default Layout;

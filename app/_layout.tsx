import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";

import { useFonts } from "expo-font";

import AuthStack from "./src/Stacks/AuthStack";
import { useCallback, useEffect } from "react";
import { useAuth } from "./src/contexts/AuthContext";
import TabBar from "./src/Stacks/TabBar";
import { SafeAreaView } from "react-native-safe-area-context";

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
// SplashScreen.preventAutoHideAsync();

const Layout: React.FC = () => {
  const [isLoaded, error] = useFonts({
    Acme: require("./assets/fonts/Acme-Regular.ttf"),
  });
  const { isAuth } = useAuth();
  useEffect(() => {
    const loadFonts = async () => {
      if (isLoaded) {
        await SplashScreen.hideAsync();
      }
      console.log(error);
    };
    loadFonts();
  }, [isLoaded]);
  const onLayoutRootView = useCallback(async () => {
    if (isLoaded) {
      await SplashScreen.hideAsync();
    }
    console.log(error);
  }, [isLoaded]);
  return (
      <NavigationContainer theme={LightTheme} onReady={onLayoutRootView}>
        {!isAuth ? <AuthStack /> : <TabBar />}
      </NavigationContainer>
  );
};
export default Layout;

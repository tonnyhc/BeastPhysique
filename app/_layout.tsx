import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";

import { useFonts } from "expo-font";

import { useCallback, useEffect } from "react";
import { useAuth } from "./src/contexts/AuthContext";
import TabBar from "./src/Navigation/TabBar";
import DrawerContent from "./src/Navigation/DrawerContent";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "./src/contexts/ThemeContext";
import AuthStackScreen from "./src/Stacks/AuthStack";
import { View } from "react-native";

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
export const Drawer = createDrawerNavigator();
const Layout: React.FC = () => {
  const { theme } = useTheme();
  const { isAuth, isVerified } = useAuth();

  const [fontsLoaded, fontError] = useFonts({
    Acme: require("./assets/fonts/Acme-Regular.ttf"),
    ArimaBold: require("./assets/fonts/arima/Arima-Bold.ttf"),
    ArimaRegular: require("./assets/fonts/arima/Arima-Regular.ttf"),
    RobotoRegular: require("./assets/fonts/roboto/Roboto-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <NavigationContainer theme={LightTheme} onReady={onLayoutRootView}>
      {!isAuth || (isAuth && !isVerified) ? (
        <AuthStackScreen />
      ) : (
        <Drawer.Navigator
          drawerContent={(props) => <DrawerContent {...props} />}
          screenOptions={{ headerShown: false }}
        >
          <Drawer.Screen name="Home" component={TabBar} />
          <Drawer.Screen name="Settings" component={TabBar} />
          <Drawer.Screen name="Feed" component={TabBar} />
        </Drawer.Navigator>
      )}
      <StatusBar style={theme == "light" ? "dark" : "light"} />
    </NavigationContainer>
  );
};
export default Layout;

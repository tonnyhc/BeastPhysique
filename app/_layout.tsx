import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";

import { useFonts } from "expo-font";

import AuthStack from "./src/Stacks/AuthStack";
import { useCallback, useEffect } from "react";
import { useAuth } from "./src/contexts/AuthContext";
import TabBar from "./src/Navigation/TabBar";
import DrawerContent from "./src/components/DrawerContent";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "./src/contexts/ThemeContext";
// import RightDrawer from "./src/(drawer)/RightDrawer";

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
export const Drawer = createDrawerNavigator();
const Layout: React.FC = () => {
  const{theme} = useTheme()
  const [isLoaded, error] = useFonts({
    Acme: require("./assets/fonts/Acme-Regular.ttf"),
  });
  const { isAuth, isVerified } = useAuth();
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
  }, [isLoaded]);
  return (
    <NavigationContainer theme={LightTheme} onReady={onLayoutRootView}>
      {!isAuth || !isVerified ? (
        <AuthStack />
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
      <StatusBar style={theme == 'light' ? 'dark' : 'light'}/>
    </NavigationContainer>
  );
};
export default Layout;

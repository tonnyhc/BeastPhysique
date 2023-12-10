import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

import Register from "./screens/Register";
import { useCallback } from "react";
import Login from "./screens/Login";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./StackNavigator";
import { SafeAreaView, Switch, View } from "react-native";

export default function App() {
  const [isLoaded] = useFonts({
    Acme: require("./assets/fonts/Acme-Regular.ttf"),
  });
  const { colorScheme, setColorScheme } = useColorScheme();

  const onLayoutRootView = useCallback(async () => {
    if (isLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  const onChangeColorScheme = (): void => {
    setColorScheme(colorScheme === "light" ? "dark" : "light");
  };

  return (
    <NavigationContainer onReady={onLayoutRootView}>
        {/* <SafeAreaView
          onLayout={onLayoutRootView}
          className="flex-1 font-acme dark:bg-darkBg"
        > */}
        
          <Switch
            className="self-end mr-3"
            onChange={onChangeColorScheme}
            value={colorScheme == "dark"}
          />
          <StackNavigator />
          <StatusBar style={colorScheme == "dark" ? "light" : "dark"} />
        {/* </SafeAreaView> */}
    </NavigationContainer>
  );
}

{
  /* 
<View className="flex-1  px-6 font-acme ">
<Register />
<Login />
</View> */
}

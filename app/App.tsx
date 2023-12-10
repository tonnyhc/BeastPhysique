import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  Switch,
  Text,
  View,
  Button,
  TextInput
} from "react-native";
import { useColorScheme } from "nativewind";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

import Register from "./screens/Register";
import { useCallback } from "react";

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

  const onChangeColorScheme = ():void => {
    setColorScheme(colorScheme === "light" ? "dark" : "light")
  }
  
  return (
    <SafeAreaView onLayout={onLayoutRootView} className="flex-1 font-acme dark:bg-darkBg">
      <View className="flex-1 justify-center px-6 font-acme ">
        <Switch className="self-end" onChange={onChangeColorScheme} value={colorScheme == 'dark'} />
        <Register />
      </View>
      <StatusBar style={colorScheme == 'dark' ? 'light' : 'dark'} />
    </SafeAreaView>
  );
}

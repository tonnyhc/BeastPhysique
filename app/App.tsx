import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();

import { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./StackNavigator";
import { Switch } from "react-native";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AuthProvider } from "./src/contexts/AuthContext";

const queryClient = new QueryClient();

export default function App() {
  // const [isLoaded, error] = useFonts({
  //   Acme: require("./assets/fonts/Acme-Regular.ttf"),
  // });
  const { colorScheme, setColorScheme } = useColorScheme();

  // const onLayoutRootView = useCallback(async () => {
  //   if (isLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  //   console.log(error)
  // }, [isLoaded]);

  const onChangeColorScheme = (): void => {
    setColorScheme(colorScheme === "light" ? "dark" : "light");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NavigationContainer>
          {/* <Switch
        className="self-end mr-3"
        onChange={onChangeColorScheme}
        value={colorScheme == "dark"}
      /> */}
          <StackNavigator />
          <StatusBar style={colorScheme == "dark" ? "light" : "dark"} />
        </NavigationContainer>
      </AuthProvider>
    </QueryClientProvider>
  );
}

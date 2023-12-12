import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();

import { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AuthProvider } from "./src/contexts/AuthContext";
import TabBar from "./src/components/TabBar";

import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import { ThemeProvider } from "./src/contexts/ThemeContext";

const queryClient = new QueryClient();

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
        <ThemeProvider>
          <NavigationContainer theme={LightTheme}>
            {/* <Switch
        className="self-end mr-3"
        onChange={onChangeColorScheme}
        value={colorScheme == "dark"}
      /> */}
            {/* <StackNavigator /> */}
            <TabBar />
            <StatusBar style={colorScheme == "dark" ? "light" : "dark"} />
          </NavigationContainer>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

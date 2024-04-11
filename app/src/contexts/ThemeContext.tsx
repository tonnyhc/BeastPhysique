import { ReactNode, createContext, useContext, useState } from "react";
import { lightColors, darkColors, Colors } from "../utils/colors";
import { sizes } from "../utils/sizes";

type ThemeContextType = {
  theme: string;
  colors: Colors;
  shadows: Record<string, any>;
  sizes: Record<string, any>;
  toggleTheme: () => void;
};
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  colors: lightColors,
  shadows: { "": "" },
  sizes: sizes,
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState("dark");
  const colors: Colors = theme === "light" ? lightColors : darkColors;
  const shadows = {
    "24DP_Penumbra": {
      shadowColor: "rgba(0, 0, 0, 0.14)",
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 1,
      shadowRadius: 17,
    },
    "12DP_Penumbra": {
      shadowColor: "rgba(0, 0, 0, 0.12)",
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 1,
      shadowRadius: 22,
    },
    "12DP_Umbra": {
      shadowColor: "rgba(0, 0, 0, 0.14)",
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 1,
      shadowRadius: 17,
    },
  };

  const toggleTheme = (): void => {
    setTheme((oldTheme) => (oldTheme == "light" ? "dark" : "light"));
  };

  const context = {
    theme,
    colors,
    shadows,
    sizes,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext<ThemeContextType>(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};



import { ReactNode, createContext, useContext, useState } from "react";
import { lightColors, darkColors, Colors } from "../utils/colors";

type ThemeContextType = {
  theme: string;
  colors: Record<any, any>;
};
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  colors: lightColors,
});

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const colors: Colors = theme === "light" ? lightColors : darkColors;

  const context = {
    theme,
    colors,
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

const colors = {
  grayText: "#BCC1CAFF",
};

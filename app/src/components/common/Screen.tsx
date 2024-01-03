import { ReactNode } from "react";
import { View, SafeAreaView } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../contexts/ThemeContext";

interface ScreenProps {
  children: ReactNode;
}

const Screen: React.FC<ScreenProps> = ({ children }) => {
  const {colors} = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <View
        style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 12, flex: 1 }}
      >
        {children}
      </View>
    </SafeAreaView>
  );
};
export default Screen;

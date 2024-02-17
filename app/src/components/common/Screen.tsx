import { ReactNode } from "react";
import {
  View,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

interface ScreenProps {
  children: ReactNode;
}

const Screen: React.FC<ScreenProps> = ({ children }) => {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <View
        style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 12, flex: 1 }}
      >
        <TouchableWithoutFeedback  onPress={() => Keyboard.dismiss()}>
          {children}
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
};
export default Screen;

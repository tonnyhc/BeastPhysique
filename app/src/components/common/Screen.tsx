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
  closeKeyboardOnClick?: boolean;
}

const Screen: React.FC<ScreenProps> = ({ children, closeKeyboardOnClick }) => {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      {closeKeyboardOnClick ? (
        <TouchableWithoutFeedback
          style={{ flexGrow: 1 }}
          onPress={() => Keyboard.dismiss()}
          accessible={false}
        >
          <View
            style={{
              paddingLeft: 24,
              paddingRight: 24,
              paddingTop: 12,
              flex: 1,
            }}
          >
            {children}
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <View
          style={{ paddingLeft: 24, paddingRight: 24, paddingTop: 12, flex: 1 }}
        >
          {children}
        </View>
      )}
    </SafeAreaView>
  );
};
export default Screen;

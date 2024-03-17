import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

const useKeyboard = () => {
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return keyboardVisible
};

export default useKeyboard;

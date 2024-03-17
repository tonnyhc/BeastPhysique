import { StyleSheet, Text, View } from "react-native";
import React from "react";
import useKeyboard from "../../../hooks/useKeyboard";
import Button from "../../common/Button";
import ChevronRight from "../../../icons/ChevronRight";
import { useTheme } from "../../../contexts/ThemeContext";

interface SetupScreenFooterBtnsProps {
  submitFn: () => void;
  disabledSubmit?: boolean;
  pendingSubmit: boolean;
}

const SetupScreenFooterBtns: React.FC<SetupScreenFooterBtnsProps> = ({
  submitFn,
  disabledSubmit,
  pendingSubmit,
}) => {
  const keyboardVisible = useKeyboard();
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    buttonWrapper: {
      flex: 1,
      justifyContent: keyboardVisible ? "center" : "flex-end",
      marginBottom: keyboardVisible ? 0 : 50,
    },
    buttons: {
      flexDirection: "row",
      gap: 60,
      justifyContent: "center",
    },
  });
  return (
    <View style={styles.buttonWrapper}>
      <View style={styles.buttons}>
        <Button
          text="Skip"
          type="text"

          onPress={() => {}}
        />
        <Button
          text="Save and continue"

          loading={pendingSubmit}
          disabled={disabledSubmit}
          onPress={submitFn}
          icon={<ChevronRight size={24} color={colors.white} />}
        />
      </View>
    </View>
  );
};

export default SetupScreenFooterBtns;

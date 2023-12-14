import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { ActivityIndicator } from "react-native-paper";

interface SubmitButtonProps {
  text: string;
  onPress: () => any;
  disabled?: boolean;
  loading?: boolean;

  testId?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  text,
  onPress,
  disabled,
  loading,
  testId,
}) => {
  const { colors, theme } = useTheme();
  const styles = StyleSheet.create({
    submitBtn: {
      paddingLeft: 16,
      paddingRight: 16,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 24,
      height: 45,
      backgroundColor: colors.submitBtn,
      opacity: disabled ? 0.5 : 1,
    },
    submitBtnText: {
      color: colors.white,
      fontWeight: "700",
      fontFamily: "Acme",
    },
  });
  return (
    <View>
      <TouchableOpacity
        testID={testId}
        disabled={disabled}
        onPress={onPress}
        style={styles.submitBtn}
      >
        {loading ? (
          <ActivityIndicator testID="loadingIndicator" />
        ) : (
          <Text style={styles.submitBtnText}>{text}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default SubmitButton;

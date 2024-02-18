import { StyleSheet, View, Text } from "react-native";
import React from "react";
import RNPickerSelect from "react-native-picker-select";
import { useTheme } from "../../contexts/ThemeContext";

type SelectItem = {
  label: string;
  value: string | number;
};

interface PickerSelectProps {
  label?: string;
  placeholder?: string;
  items: SelectItem[];
  onChange: (value: any) => void;
}

const PickerSelect: React.FC<PickerSelectProps> = ({
  label,
  placeholder,
  items,
  onChange,
}) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    wrapper: {
      minHeight: 80,
      // height: multiline ? 150 : 'auto',
      // ...styles?.wrapper
    },
    labelText: {
      fontSize: 12,
      fontWeight: "700",
      fontFamily: "Acme",
      marginBottom: 12,
      color: colors.primaryText,
    },
    inputWrapper: {
      // flex: 1,
      flexDirection: "row",
      // alignItems: "center",
      backgroundColor: colors.inputBg,
      minHeight: 45,
      borderRadius: 24,
      paddingLeft: 16,
      paddingRight: 16,
      // borderColor: error ? colors.error : "#CCC",
      borderColor: colors.borderGrey,
      borderWidth: 1,
    },
    placeholder: {
      color: colors.helperText,
      marginLeft: 8,
      fontFamily: "RobotoBold",
    },
    inputText: {
      fontFamily: "RobotoBold",
      color: colors.helperText,
      marginLeft: 8,
    },
  });
  return (
    <View style={styles.wrapper}>
      <Text style={styles.labelText}>{label}</Text>

      <RNPickerSelect
        style={{
          inputIOSContainer: {
            ...styles.inputWrapper,
          },
          placeholder: {
            ...styles.placeholder,
          },
          inputIOS: {
            ...styles.inputText,
          },
          inputAndroid: {
            ...styles.inputText,
          },
        }}
        placeholder={{
          value: "",
          label: placeholder,
        }}
        onValueChange={(value) => onChange(value)}
        items={items}
      />
    </View>
  );
};

export default PickerSelect;

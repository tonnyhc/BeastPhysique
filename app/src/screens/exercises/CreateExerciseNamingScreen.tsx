import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ReusableInput from "../../components/common/ReusableInput";
import Screen from "../../components/common/Screen";
import { useTheme } from "../../contexts/ThemeContext";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Button from "../../components/common/Button";
import PlusIcon from "../../icons/PlusIcon";
import { CustomExerciseData } from "../../Stacks/CreateExerciseStack";
import { useCreateExercise } from "../../contexts/CreateExerciseContext";

interface CreateExerciseNamingScreenProps {}

const CreateExerciseNamingScreen: React.FC<
  CreateExerciseNamingScreenProps
> = () => {
  const { colors } = useTheme();
  const { exerciseData, changeFieldValue } = useCreateExercise();
  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      gap: 20,
      marginTop: 50,
    },
    title: {
      fontSize: 22,
      fontFamily: "RobotoMedium",
      color: colors.primaryText,
      textAlign: "center",
    },
    subtitle: {
      fontSize: 18,
      fontFamily: "RobotoMedium",
      color: colors.primaryText,
      textAlign: "center",
    },
    inputWrapper: {
      gap: 20,
      justifyContent: "center",
    },
    musclesWrapper: {
      marginTop: 60,
      gap: 10,
    },
  });

  return (
    <Screen>
      <View style={styles.wrapper}>
        <View style={styles.inputWrapper}>
          <Text style={styles.title}>Exercise name</Text>
          <ReusableInput
            value={exerciseData.name}
            placeholder="Name"
            onChange={(value: string) => {
              changeFieldValue(value, "name");
            }}
          />
        </View>
        <View
          style={[
            styles.inputWrapper,
            { flexDirection: "row", alignItems: "center" },
          ]}
        >
          <Text style={styles.subtitle}>Can be performed bodyweight </Text>
          <BouncyCheckbox size={25} fillColor={colors.orangeText} />
        </View>

        <View style={styles.musclesWrapper}>
          <Text style={styles.subtitle}>Select targeted muscles</Text>
          <Button
            type="icon"
            onPress={() => {}}
            text=""
            leftIcon={<PlusIcon size={20} color={colors.white} />}
          />
        </View>
      </View>
    </Screen>
  );
};

export default CreateExerciseNamingScreen;

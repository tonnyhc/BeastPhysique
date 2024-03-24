import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import ReusableInput from "../../components/common/ReusableInput";
import Screen from "../../components/common/Screen";
import { useTheme } from "../../contexts/ThemeContext";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {
  CreateExerciseStackParamList,
  CustomExerciseData,
} from "../../Stacks/CreateExerciseStack";
import { useCreateExercise } from "../../contexts/CreateExerciseContext";
import TestInput from "../../components/common/TestInput";
import Button from "../../components/common/Button";
import ChevronRight from "../../icons/ChevronRight";
import PlusIcon from "../../icons/PlusIcon";
import FAB from "../../components/common/FAB";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import SelectMuscleGroupsModal from "../../components/workouts/exercise/SelectMuscleGroupsModal";
import { checkForEmptyValuesInObject } from "../../utils/helperFunctions";
import SelectMuscleGroupChip from "../../components/workouts/exercise/SelectMuscleGroupChip";

interface CreateExerciseBaseScreenProps {}

const CreateExerciseBaseScreen: React.FC<
  CreateExerciseBaseScreenProps
> = () => {
  const { colors } = useTheme();
  const { exerciseData, changeFieldValue, addMuscleGroup } =
    useCreateExercise();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const checkboxRef = useRef(null);
  const navigation =
    useNavigation<StackNavigationProp<CreateExerciseStackParamList>>();
  const emptyValues = checkForEmptyValuesInObject({
    name: exerciseData.name,
    targeted_muscle_groups: exerciseData.targeted_muscle_groups,
  });
  const styles = StyleSheet.create({
    screenWrapper: {
      flexGrow: 1,
      justifyContent: "space-between",
      paddingBottom: 35,
    },
    bodyweightWrapper: {
      flexDirection: "row",
      justifyContent: "space-between",
    },

    form: {
      gap: 20,
      marginTop: 20,
    },

    muscleGroupsWrapper: {
      flexWrap: "wrap",
      flexDirection: "row",
      gap: 10,
      justifyContent:
        exerciseData.targeted_muscle_groups.length == 0 ? "center" : "flex-start",
    },

    formRow: {
      gap: 23,
      borderBottomWidth: 0.5,
      borderColor: colors.helperText,
      paddingBottom: 18,
    },

    labelText: {
      fontFamily: "RobotoRegular",
      color: colors.primaryText,
      fontSize: 20,
      marginLeft: 0,
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Screen closeKeyboardOnClick={true}>
        <SelectMuscleGroupsModal
          exerciseMuscleGroups={exerciseData.targeted_muscle_groups}
          addMuscleGroup={addMuscleGroup}
          closeModal={() => setModalVisible(false)}
          isVisible={modalVisible}
        />
        <View style={styles.screenWrapper}>
          <View style={styles.form}>
            {/* exercise name */}
            <View style={styles.formRow}>
              <TestInput
                label="Name"
                labelStyles={styles.labelText}
                value={exerciseData.name}
                onChange={(value: string) => changeFieldValue(value, "name")}
                placeholder="Custom exercise"
              />
            </View>

            {/* Targeted muscle groups */}
            <View style={styles.formRow}>
              <Text style={styles.labelText}>Targeted muscle groups</Text>
              <View style={styles.muscleGroupsWrapper}>
                {exerciseData.targeted_muscle_groups.map((item, index) => (
                  <SelectMuscleGroupChip remove={() => addMuscleGroup(item)} name={item.name} key={index} />
                ))}
                {/* add muscle group button */}
                <View style={{ width: 45, height: 45 }}>
                  <FAB
                    onPress={() => setModalVisible(true)}
                    icon={<PlusIcon size={20} color={colors.white} />}
                  />
                </View>
              </View>
            </View>

            {/* bodyweight checkbox */}
            <View style={styles.formRow}>
              <View style={styles.bodyweightWrapper}>
                <Text style={styles.labelText}>
                  Can be performed bodyweight
                </Text>
                <BouncyCheckbox
                  ref={checkboxRef}
                  size={26}
                  fillColor={colors.button}
                  isChecked={exerciseData.bodyweight}
                  onPress={(value: boolean) =>
                    changeFieldValue(value, "bodyweight")
                  }
                />
              </View>
            </View>
          </View>

          <View>
            <Button
              text="Continue"
              disabled={emptyValues || exerciseData.targeted_muscle_groups.length == 0}
              icon={<ChevronRight size={22} color={colors.white} />}
              onPress={() => navigation.navigate("PublishScreen")}
            />
          </View>
        </View>
      </Screen>
    </KeyboardAvoidingView>
  );
};

export default CreateExerciseBaseScreen;

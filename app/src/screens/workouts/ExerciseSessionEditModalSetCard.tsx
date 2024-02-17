import { useTheme } from "../../contexts/ThemeContext";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { ExerciseSet } from "../../ts/types";
import TrashIcon from "../../icons/TrashIcon";
import ReusableInput from "../../components/common/ReusableInput";
import { useEffect, useState } from "react";

import useDeleteSetFromExerciseSession from "../../hooks/useDeleteSetFromExerciseSession";
import SubmitButton from "../../components/common/Button";
import useUpdateSetExerciseSession from "../../hooks/useUpdateSetExerciseSession";

interface ExerciseSessionEditModalSetCardProps {
  set: ExerciseSet;
  index: number;
  deleteSetFn: (setId: number) => void;
}

const ExerciseSessionEditModalSetCard: React.FC<
  ExerciseSessionEditModalSetCardProps
> = ({ set, index, deleteSetFn }) => {
  const { colors } = useTheme();
  const [setData, setSetData] = useState<ExerciseSet>(set);
  const [isSaveDisabled, setIsSaveDisabled] = useState<boolean>(true);
  useEffect(() => {
    if (setData != set) {
      setIsSaveDisabled(false);
    } else {
      setIsSaveDisabled(true);
    }
  }, [setData]);

  const { mutate: mutateDelete } = useDeleteSetFromExerciseSession(set.id as number, () =>
    deleteSetFn(set.id as number)
  );

  const {mutate: mutateUpdate, } = useUpdateSetExerciseSession(set.id as number, setData);

  const changeSetProperty = (propName: string, value?: string) => {
    if (propName == "failure" || propName == "bodyweight") {
      setSetData((oldData) => ({
        ...oldData,
        [propName]: !oldData[propName],
      }));
      return;
    }
    setSetData((oldData) => ({
      ...oldData,
      [propName]: value,
    }));
  };

  const styles = StyleSheet.create({
    card: {
      backgroundColor: colors.grayBg,
      padding: 10,
      borderRadius: 8,
    },
    cardHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 10,
    },
    cardHeading: {
      fontSize: 22,
      color: colors.primaryText,
    },
    cardBody: {
      flexDirection: "row",
      gap: 10,
    },
    setInfo: {
      flex: 1,
      justifyContent: "center",
      gap: -15,
    },
    setProperty: {
      alignSelf: "center",
    },
    cardFooter: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 20,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    switchText: {
      fontSize: 16,
      letterSpacing: 0.25,
    },
    switch: {
      alignSelf: "center",
    },
  });
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardHeading}>Set {index + 1}</Text>
        <TouchableOpacity onPress={() => mutateDelete()}>
          <TrashIcon size={22} color={colors.error} />
        </TouchableOpacity>
      </View>
      <View style={styles.cardBody}>
        {/* SET */}
        <View style={styles.setInfo}>
          <Text style={styles.setProperty}>Reps</Text>
          <ReusableInput
            inputMode="numeric"
            placeholder=""
            onChange={(value: string) => changeSetProperty("reps", value)}
            value={setData.reps.toString()}
          />
        </View>
        <View style={styles.setInfo}>
          <Text style={styles.setProperty}>Weight</Text>
          <ReusableInput
            inputMode="decimal"
            placeholder=""
            onChange={(value: string) => changeSetProperty("weight", value)}
            value={setData.weight.toString()}
          />
        </View>
        <View style={styles.setInfo}>
          <Text style={styles.setProperty}>Min Reps</Text>
          <ReusableInput
            inputMode="numeric"
            placeholder=""
            onChange={(value: string) => changeSetProperty("minReps", value)}
            value={setData.minReps.toString()}
          />
        </View>
        <View style={styles.setInfo}>
          <Text style={styles.setProperty}>Max Reps</Text>
          <ReusableInput
            inputMode="numeric"
            placeholder=""
            onChange={(value: string) => changeSetProperty("maxReps", value)}
            value={setData.maxReps.toString()}
          />
        </View>
      </View>
      <View style={styles.cardFooter}>
        <View style={styles.row}>
          <View>
            <Text style={styles.switchText}>To failure</Text>
            <Switch
              style={styles.switch}
              value={setData.failure}
              onChange={() => changeSetProperty("failure")}
            />
          </View>
          <View>
            <Text style={styles.switchText}>Bodyweight</Text>
            <Switch
              value={setData.bodyweight}
              onChange={() => changeSetProperty("bodyweight")}
              style={styles.switch}
            />
          </View>
        </View>
        <View style={styles.row}>
          <SubmitButton
            disabled={isSaveDisabled}
            onPress={() => mutateUpdate(setData)}
            text="Save"
          />
        </View>
      </View>
    </View>
  );
};

export default ExerciseSessionEditModalSetCard;

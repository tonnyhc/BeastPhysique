import { useTheme } from "../../contexts/ThemeContext";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { ExerciseSet } from "../../ts/types";
import TrashIcon from "../../icons/TrashIcon";
import ReusableInput from "../../components/common/ReusableInput";
import { useState } from "react";

interface ExerciseSessionEditModalSetCardProps {
  set: ExerciseSet;
  index: number;
}

const ExerciseSessionEditModalSetCard: React.FC<
  ExerciseSessionEditModalSetCardProps
> = ({ set, index }) => {
  const { colors } = useTheme();
  const [setData, setSetData] = useState<ExerciseSet>(set);

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
      justifyContent: "space-evenly",
      marginTop: 20,
    },
  });

  const changeSetProperty = (propName: string, value?: string) => {
    if (propName == "failure" || propName == "bodyweight") {
      setSetData((oldData) => ({
        ...oldData,
        [propName]: !oldData[propName],
      }));
      console.log(setData);
      return;
    }
    setSetData((oldData) => ({
      ...oldData,
      [propName]: value,
    }));
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardHeading}>Set {index + 1}</Text>
        <TouchableOpacity>
          <TrashIcon size={22} color={colors.error} />
        </TouchableOpacity>
      </View>
      <View style={styles.cardBody}>
        {/* SET */}
        <View style={styles.setInfo}>
          <Text style={styles.setProperty}>Reps</Text>
          <ReusableInput
            placeholder=""
            onChange={(value: string) => changeSetProperty("reps", value)}
            value={setData.reps.toString()}
          />
        </View>
        <View style={styles.setInfo}>
          <Text style={styles.setProperty}>Weight</Text>
          <ReusableInput
            placeholder=""
            onChange={(value: string) => changeSetProperty("weight", value)}
            value={setData.weight.toString()}
          />
        </View>
        <View style={styles.setInfo}>
          <Text style={styles.setProperty}>Min Reps</Text>
          <ReusableInput
            placeholder=""
            onChange={(value: string) => changeSetProperty("minReps", value)}
            value={setData.maxReps.toString()}
          />
        </View>
        <View style={styles.setInfo}>
          <Text style={styles.setProperty}>Max Reps</Text>
          <ReusableInput
            placeholder=""
            onChange={(value: string) => changeSetProperty("maxReps", value)}
            value={setData.minReps.toString()}
          />
        </View>
      </View>
      <View style={styles.cardFooter}>
        <View>
          <Text style={{ fontSize: 20 }}>To failure</Text>
          <Switch
            value={setData.failure}
            onChange={() => changeSetProperty("failure")}
          />
        </View>
        <View>
          <Text>Bodyweight</Text>
          <Switch
            value={setData.bodyweight}
            onChange={() => changeSetProperty("bodyweight")}
          />
        </View>
      </View>
    </View>
  );
};

export default ExerciseSessionEditModalSetCard;

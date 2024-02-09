import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { ExerciseSession, ExerciseSet } from "../../ts/types";
import Screen from "../../components/common/Screen";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "../../contexts/ThemeContext";
import SubmitButton from "../../components/common/SubmitButton";
import PlusIcon from "../../icons/PlusIcon";
import ExerciseSessionEditModalSetCard from "./ExerciseSessionEditModalSetCard";
import { emptySet } from "../../utils/mapData";
import useAddSetToExerciseSession from "../../hooks/useAddSetToExerciseSession";

interface ExerciseSessionEditModalProps {
  route: { params: { exerciseSession: ExerciseSession } };
}

const ExerciseSessionEditModal: React.FC<ExerciseSessionEditModalProps> = ({
  route,
}) => {
  const session = route.params.exerciseSession;
  const { colors } = useTheme();
  const [exerciseSession, setExerciseSession] =
    useState<ExerciseSession>(session);

  const addSetToState = (set: ExerciseSet) => {
    console.log(set)
    setExerciseSession((oldSession) => ({
      ...oldSession,
      sets: [...oldSession.sets, set],
    }));
    console.log(exerciseSession)
  };

  const deleteSetFromState = (setId: number) => {
    console.log(setId)
    const newSets = exerciseSession.sets.filter((set) => set.id !== setId);
    setExerciseSession((oldSession) => ({
      ...oldSession,
      sets: [...newSets],
    }));
  };

  const { mutate, isPending } = useAddSetToExerciseSession(
    session.id as number,
    addSetToState
  );

  const styles = StyleSheet.create({
    heading: {
      fontSize: 26,
      alignSelf: "center",
      fontWeight: "500",
    },
    subheading: {
      fontSize: 22,
      alignSelf: "center",
    },
  });
  return (
    <Screen>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 50,
        }}
      >
        <Text style={styles.heading}>Modify</Text>
        <Text style={styles.subheading}>Barbell Bench press</Text>
      </View>
      <ScrollView contentContainerStyle={{ gap: 10 }}>
        {exerciseSession.sets.map((set, index) => (
          <ExerciseSessionEditModalSetCard
            deleteSetFn={deleteSetFromState}
            set={set}
            index={index}
            key={index}
          />
        ))}
        <View style={{ marginTop: 10 }}>
          <SubmitButton
            leftIcon={<PlusIcon size={16} color={colors.white} />}
            text="Set"
            onPress={() => mutate()}
            loading={isPending}
          />
        </View>
      </ScrollView>
    </Screen>
  );
};

export default ExerciseSessionEditModal;

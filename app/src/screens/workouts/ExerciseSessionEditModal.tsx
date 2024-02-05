import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ExerciseSession } from "../../ts/types";
import Screen from "../../components/common/Screen";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "../../contexts/ThemeContext";
import SubmitButton from "../../components/common/SubmitButton";
import PlusIcon from "../../icons/PlusIcon";
import ExerciseSessionEditModalSetCard from "./ExerciseSessionEditModalSetCard";

interface ExerciseSessionEditModalProps {
  route: { params: { exerciseSession: ExerciseSession } };
}

const ExerciseSessionEditModal: React.FC<ExerciseSessionEditModalProps> = ({
  route,
}) => {
  const session = route.params.exerciseSession;
  const { colors } = useTheme();

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
      <ScrollView>
        {session.sets.map((set, index) => (
          <ExerciseSessionEditModalSetCard
            set={set}
            index={index}
            key={index}
          />
        ))}
        <View style={{ marginTop: 10 }}>
          <SubmitButton
            leftIcon={<PlusIcon size={16} color={colors.white} />}
            text="Set"
            onPress={() => {}}
          />
        </View>
      </ScrollView>
    </Screen>
  );
};

export default ExerciseSessionEditModal;

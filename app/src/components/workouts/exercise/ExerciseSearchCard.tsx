import { View, Text, StyleSheet, Image } from "react-native";

import { Exercise } from "../../../ts/types";
import { useTheme } from "../../../contexts/ThemeContext";
import CircleSelect from "../../common/CircleSelect";
import { TouchableOpacity } from "react-native-gesture-handler";

interface ExerciseSearchCardProps {
  exercise: Exercise;
  index: number;
  //   onSelectExercise: (exercise: Exercise) => Exercise[]
  onSelectExercise: () => void;
  isSelected: boolean
}

const ExerciseSearchCard: React.FC<ExerciseSearchCardProps> = ({
  exercise,
  index,
  onSelectExercise,
  isSelected
}) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    cardWrapper: {
      borderWidth: 0.5,
      borderColor: colors.helperText,
      paddingVertical: 6,
      paddingHorizontal: 8,
      borderRadius: 8,
      flexDirection: "row",
      justifyContent: "space-between",
      position: "relative",
    },
    exerciseInfoWrapper: {
      flex: 1,
    },
    coverPhoto: {
      width: "100%",
      height: 150,
      objectFit: "contain",
    },
    heading: {
      fontSize: 18,
      fontFamily: "RobotoMedium",
      color: colors.primaryText,
      marginBottom: 8,
    },
    helperText: {
      fontFamily: "RobotoRegular",
      fontSize: 13,
      letterSpacing: 0.2,
      color: colors.helperText,
      flex: 1,
    },
    tips: {
      fontSize: 12,
      color: colors.orangeText,
      fontFamily: "RobotoRegular",
      flexBasis: "auto",
    },
    select: {
      position: "absolute",
      top: 5,
      right: 5,
    },
  });
  return (
    <TouchableOpacity onPress={onSelectExercise} style={styles.cardWrapper}>
      <View style={styles.exerciseInfoWrapper}>
        <Text style={styles.heading}>{exercise.name}</Text>
        {exercise.information && (
          <Text style={styles.helperText}>{exercise.information}</Text>
        )}
        {exercise.tips && <Text style={styles.tips}>{exercise.tips}</Text>}
      </View>
      {exercise.cover_photo && (
        <View
          style={{
            flex: 0.8,
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
        >
          <Image
            style={styles.coverPhoto}
            source={{ uri: exercise.cover_photo }}
          />
        </View>
      )}
      <View style={styles.select}>
        <CircleSelect onPress={onSelectExercise} isSelected={isSelected} />
      </View>
    </TouchableOpacity>
  );
};

export default ExerciseSearchCard;

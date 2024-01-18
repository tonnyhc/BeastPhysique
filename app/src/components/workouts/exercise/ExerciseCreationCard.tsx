import { View, Text, StyleSheet, Animated } from "react-native";
import React, { ReactNode } from "react";
import SubmitButton from "../../common/SubmitButton";
import { useTheme } from "../../../contexts/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { Exercise } from "../../../ts/types";
import { useCustomWorkoutPlan } from "../../../contexts/CustomWorkoutPlanContext";
import { Swipeable, TouchableOpacity } from "react-native-gesture-handler";
import SetSwipeableCard from "./SetSwipeableCard";
import TrashIcon from "../../../icons/TrashIcon";

interface ExerciseCreationCardProps {
  exercise: Exercise;
  workoutIndex: number;
  exerciseIndex: number;
  isExpanded: boolean;
  onExpand: (index: number) => {};

  onDelete: () => void;
}

const ExerciseCreationCard: React.FC<ExerciseCreationCardProps> = ({
  exercise,
  workoutIndex,
  exerciseIndex,
  isExpanded,
  onExpand,
  onDelete,
}) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { workoutPlan, dispatch } = useCustomWorkoutPlan();

  const styles = StyleSheet.create({
    cardWrapper: {
      borderWidth: 1,
      borderColor: "#C1B9B9",
      borderTopRightRadius: 24,
      borderTopLeftRadius: 24,
      justifyContent: "flex-start",
      paddingBottom: 12,
      paddingHorizontal: 6,
      gap: 12,
      backgroundColor: colors.bg,
    },
    cardContent: {
      marginTop: 12,
    },
    buttonsWrapper: {
      flexDirection: "row",
      marginVertical: 12,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 80,
    },
    buttonsSeparator: {
      flex: 1,
      height: 1,
      backgroundColor: colors.helperText,
    },
    heading: {
      fontSize: 22,
      textAlign: "center",
      color: colors.primaryText,
    },
    inputWrapper: {
      flex: 1,
    },
    inputHelperText: {
      textAlign: "center",
      fontSize: 14,
      color: colors.helperText,
    },
    expandedVisibility: {
      display: isExpanded ? "flex" : "none",
    },
  });

  const renderEmptyCard = (): ReactNode => {
    return (
      <View style={styles.cardWrapper}>
        <View style={styles.cardContent}>
          <SubmitButton
            type="fill"
            buttonStyles={{ alignSelf: "center" }}
            text="Search for an exercise"
            onPress={() => navigation.navigate("ExerciseSearchModal")}
          />
          <View style={styles.buttonsWrapper}>
            <View style={styles.buttonsSeparator} />
            <Text style={{ marginHorizontal: 12, color: colors.helperText }}>
              or
            </Text>
            <View style={styles.buttonsSeparator} />
          </View>
          <SubmitButton
            type="outlined"
            buttonStyles={{ alignSelf: "center" }}
            text="Create a custom one"
            onPress={() => navigation.navigate("CreateCustomExercise")}
          />
        </View>
      </View>
    );
  };
  const renderCardWithData = (): ReactNode => {
    return (
      <View style={styles.cardWrapper}>
        <View style={styles.cardContent}>
          <TouchableOpacity onPress={() => onExpand(exerciseIndex)}>
            <Text style={styles.heading}>{exercise.name}</Text>
          </TouchableOpacity>

          <View style={styles.expandedVisibility}>
            {exercise?.sets?.map((set, index) => (
              <SetSwipeableCard
                key={index}
                set={set}
                setIndex={index}
                workoutIndex={workoutIndex}
                exerciseIndex={exerciseIndex}
              />
            ))}
          </View>
        </View>
        <View style={styles.expandedVisibility}>
          <SubmitButton
            buttonStyles={{ alignSelf: "center" }}
            // leftIcon={}
            text="Set"
            onPress={() =>
              dispatch({
                type: "addSetToExercise",
                payload: {
                  workoutIndex: workoutIndex,
                  exerciseIndex: exerciseIndex,
                },
              })
            }
          />
        </View>
      </View>
    );
  };

  const renderRightActions = (progress: any, dragX: any) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });

    return (
      <TouchableOpacity onPress={onDelete}>
        <Animated.View
          style={{
            zIndex: 0,
            backgroundColor: colors.error,
            justifyContent: "center",
            alignItems: "center",
            paddingRight: 20,
            height: "100%",
          }}
        >
          <TrashIcon size={20} color={colors.white}/>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      overshootRight={true}
      onSwipeableWillOpen={() =>
        dispatch({
          type: "removeExerciseFromWorkout",
          payload: {
            exerciseIndex: exerciseIndex,
            workoutIndex: workoutIndex,
          },
        })
      }
      friction={2}
    >
      {exercise?.name ? renderCardWithData() : renderEmptyCard()}
    </Swipeable>
  );
};

export default ExerciseCreationCard;

import { useState } from "react";
import { useCustomWorkoutPlan } from "../../contexts/CustomWorkoutPlanContext";
import { useTheme } from "../../contexts/ThemeContext";
import Screen from "../../components/common/Screen";
import ReusableInput from "../../components/common/ReusableInput";
import { FlatList, View, Text } from "react-native";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import SubmitButton from "../../components/common/Button";
import ExerciseCreationCard from "../../components/workouts/exercise/ExerciseCreationCard";
import { emptyExercise, emptySet } from "../../utils/mapData";
import TrashIcon from "../../icons/TrashIcon";
import { TouchableOpacity } from "react-native-gesture-handler";

interface WorkoutCreationCardProps {
  route: any;
}

const WorkoutCreationCard: React.FC<WorkoutCreationCardProps> = ({ route }) => {
  const { colors } = useTheme();
  const { workoutPlan, dispatch } = useCustomWorkoutPlan();
  const { workoutIndex } = route.params;
  const [expandedCard, setExpandedCard] = useState<number>(0);

  const onExpandCard = (index: number): void => {
    return setExpandedCard(index);
  };

  const renderListHeader = () => {
    return (
      <>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <ReusableInput
            leftIcon={
              <MaterialCommunityIcons
                name="strategy"
                size={18}
                color={colors.iconColor}
              />
            }
            styles={{ wrapper: { flexGrow: 1 } }}
            onChange={(value: string) =>
              dispatch({
                type: "changeWorkoutName",
                payload: {
                  index: workoutIndex,
                  name: value,
                },
              })
            }
            value={workoutPlan.workouts[workoutIndex]?.workoutName}
            placeholder="Workout name"
          />
          <TouchableOpacity onPress={() => {
            dispatch({type: "deleteWorkout", payload: workoutIndex})
          }}>
            <TrashIcon color={colors.error} size={20} />
          </TouchableOpacity>
        </View>
        <View style={{ height: 20 }} />
      </>
    );
  };

  return (
    <Screen>
      <View style={{ flex: 1 }}>
        {/* Exercises list */}
        <FlatList
          ListHeaderComponent={() => renderListHeader()}
          ListFooterComponent={
            <SubmitButton
              leftIcon={
                <AntDesign name="plus" size={16} color={colors.white} />
              }
              buttonStyles={{ alignSelf: "center", marginTop: 39 }}
              text="Exercise"
              onPress={() =>
                dispatch({
                  type: "addExerciseToWorkout",
                  payload: {
                    workoutIndex: workoutIndex,
                    exercises: [emptyExercise],
                  },
                })
              }
            />
          }
          contentContainerStyle={{ flexGrow: 1 }}
          style={{ flexGrow: 1 }}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          data={workoutPlan.workouts[workoutIndex].exercises}
          renderItem={({ item, index, separators }) => (
            <ExerciseCreationCard
              onExpand={onExpandCard}
              isExpanded={expandedCard === index}
              exercise={item}
              workoutIndex={workoutIndex}
              exerciseIndex={index}
            />
          )}
          extraData={workoutPlan.workouts}
          scrollEnabled={true}
        />
      </View>
      {/* workout tab indicator */}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
          marginBottom: 10,
          flexDirection: "row",
        }}
      >
        {/* indicator */}
        <View
          style={{
            height: 6,
            width: 20,
            backgroundColor: colors.helperText,
            borderRadius: 10,
          }}
        />
      </View>
    </Screen>
  );
};

export default WorkoutCreationCard;

import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import Screen from "../../components/common/Screen";
import ReusableInput from "../../components/common/ReusableInput";
import SubmitButton from "../../components/common/SubmitButton";
import { useTheme } from "../../contexts/ThemeContext";
import { ScrollView } from "react-native-gesture-handler";
import { useMutation } from "@tanstack/react-query";
import useExerciseService from "../../hooks/useExerciseService";
import { StackNavigationProp } from "@react-navigation/stack";
import { WorkoutsStackParamList } from "../../Stacks/WorkoutsStack";

interface ExerciseCreationModalProps {
    navigation: StackNavigationProp<WorkoutsStackParamList>
}

type CustomExerciseData = {
  name: string;
  cover_photo: string;
  information: string;
  video_tutorial: string;
  tips: string;
  publish: boolean;
};

const ExerciseCreationModal:React.FC<ExerciseCreationModalProps> = ({navigation}) => {
  const { colors } = useTheme();
  const { createExercise } = useExerciseService();
  const [exerciseData, setExerciseData] = useState<CustomExerciseData>({
    name: "",
    cover_photo: "",
    information: "",
    video_tutorial: "",
    tips: "",
    publish: false,
  });

  const [isPublishDisabled, setIsPublishDisabled] = useState(false);
  const [isCreateDisabled, setIsCreateDisabled] = useState(false);
  useEffect(() => {
    const isNameEmpty = exerciseData.name === ''
    const isAnyValueEmpty = Object.values(exerciseData).some(value => value === "")
    setIsPublishDisabled(isAnyValueEmpty);
    setIsCreateDisabled(isNameEmpty)
  },[exerciseData])

  const { mutate, isPending, isError } = useMutation({
    mutationFn: () => createExercise(exerciseData),
    mutationKey: ["exerciseCreate"],
    onSuccess: () => {
        navigation.goBack()
    }
  });

  const createPublicExercise = () => {
    setExerciseData((oldData) => ({ ...oldData, publish: true }));
    mutate();
  };

  const styles = StyleSheet.create({
    headerText: {
      fontSize: 32,
      alignSelf: "center",
      //   flex: 1,
    },
    inputsWrapper: {
      flex: 1,
      marginTop: 20,
    },
    input: {
      gap: -10,
      marginBottom: 10,
    },
    helperText: {
      fontSize: 14,
      color: colors.helperText,
      marginHorizontal: 12,
    },
  });

  return (
    <Screen>
      <View
        style={{
          justifyContent: "space-between",
          flex: 1,
          paddingVertical: 20,
        }}
      >
        <Text style={styles.headerText}>Create your own exercise</Text>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
          <ScrollView style={styles.inputsWrapper}>
            <View style={styles.input}>
              <Text style={styles.helperText}>
                The exercise name is the value the exercise can be searched
                from!
              </Text>
              <ReusableInput
                placeholder="Exercise name"
                value={exerciseData.name}
                maxLenght={50}
                onChange={(value: string) =>
                  setExerciseData((oldData) => ({ ...oldData, name: value }))
                }
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.helperText}>
                Cover photo is required if you want to make the exercise public!
              </Text>
              <ReusableInput
                placeholder="Cover photo URL"
                value={exerciseData.cover_photo}
                onChange={(value: string) =>
                  setExerciseData((oldData) => ({
                    ...oldData,
                    cover_photo: value,
                  }))
                }
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.helperText}>
                Video tutorial is required if you want to make the exercise
                public!
              </Text>
              <ReusableInput
                placeholder="Video tutorial URL"
                value={exerciseData.video_tutorial}
                onChange={(value: string) =>
                  setExerciseData((oldData) => ({
                    ...oldData,
                    video_tutorial: value,
                  }))
                }
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.helperText}>
                Exercise information is required if you want to make the
                exercise public!
              </Text>
              <ReusableInput
                placeholder="Exercise information"
                multiline={true}
                value={exerciseData.information}
                onChange={(value: string) =>
                    setExerciseData((oldData) => ({
                      ...oldData,
                      information: value,
                    }))
                  }
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.helperText}>
                Exercise tips and tricks are required if you want to make the
                exercise public!
              </Text>
              <ReusableInput
                multiline={true}
                placeholder="Exercise tips and tricks"
                value={exerciseData.tips}
                onChange={(value: string) =>
                  setExerciseData((oldData) => ({ ...oldData, tips: value }))
                }
              />
            </View>
          </ScrollView>
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "center",
              gap: 20,
            }}
          >
            <SubmitButton onPress={() => {}} disabled={isCreateDisabled} text="Create" />
            <SubmitButton
              type={"outlined"}
              disabled={isPublishDisabled}
              onPress={() => createPublicExercise()}
              loading={isPending}
              text="Create and publish"
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </Screen>
  );
};

export default ExerciseCreationModal;

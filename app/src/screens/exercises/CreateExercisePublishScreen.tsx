import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import Screen from "../../components/common/Screen";
import { useTheme } from "../../contexts/ThemeContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Video, ResizeMode } from "expo-av";
import Button from "../../components/common/Button";
import { useCreateExercise } from "../../contexts/CreateExerciseContext";
import { useNavigation } from "@react-navigation/native";

import * as ImagePicker from "expo-image-picker";
import FAB from "../../components/common/FAB";
import PlusIcon from "../../icons/PlusIcon";
import TestInput from "../../components/common/TestInput";

const CreateExercisePublishScreen: React.FC = () => {
  const {
    exerciseData,
    changeFieldValue,
    mutate,
    createPublicExercise,
    isCreateDisabled,
    isPublishDisabled,
    pendingMutate,
  } = useCreateExercise();
  const { colors } = useTheme();
  const video = React.useRef(null);
  const [videoToRender, setVideoToRender] =
    useState<ImagePicker.ImagePickerAsset | null>(null);
  React.useEffect(() => {
    if (video.current && video.current.getStatusAsync) {
      video?.current.playAsync();
    }
  }, [video]);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      allowsMultipleSelection: false,
      quality: 1,
      //   mediaTypes: "Photos",
    });
    if (!result.canceled) {
      const image = result.assets[0];
      const imageUri =
        Platform.OS === "ios" ? image.uri.replace("file://", "") : image.uri;
      changeFieldValue(imageUri, "cover_photo");
    }
  };
  const removePickedVideoAlert = async () => {
    Alert.alert(
      "Remove video",
      "",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            changeFieldValue(null, "video_tutorial");
            setVideoToRender(null);
          },
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const pickVideoAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      allowsMultipleSelection: false,
      videoQuality: 1,
      formatAsMp4: true,
      mediaTypes: "Videos",
    });
    if (!result.canceled) {
      const videoFromStorage = result.assets[0];
      const videoUri =
        Platform.OS === "ios"
          ? videoFromStorage.uri.replace("file://", "")
          : videoFromStorage.uri;
      changeFieldValue(videoUri, "video_tutorial");
      setVideoToRender(videoFromStorage);
    }
  };

  const removePickedImageAlert = () =>
    Alert.alert(
      "Remove photo",
      "",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => changeFieldValue(null, "cover_photo"),
        },
      ],
      {
        cancelable: true,
      }
    );

  const styles = StyleSheet.create({
    screenWrapper: {
      flexGrow: 1,
    },
    scrollViewContent: {
      justifyContent: "space-between",
      flexGrow: 1,
      paddingBottom: 35,
    },
    formRow: {
      gap: 23,
      borderBottomWidth: 0.5,
      borderColor: colors.helperText,
      paddingVertical: 18,
    },

    labelText: {
      fontFamily: "RobotoRegular",
      color: colors.primaryText,
      fontSize: 20,
      marginLeft: 0,
    },

    photoWrapper: {
      borderRadius: 10,
      overflow: "hidden",
      width: 150,
      height: 120,
      position: "relative",
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Screen closeKeyboardOnClick={true}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          style={styles.screenWrapper}
        >
          <View style={{ flex: 1 }}>
            {/* Photos  */}
            <View style={styles.formRow}>
              <Text style={styles.labelText}>Cover photo</Text>
              <View>
                {exerciseData.cover_photo ? (
                  <TouchableOpacity
                    onPress={() => removePickedImageAlert()}
                    style={styles.photoWrapper}
                  >
                    <Image
                      style={{ width: 150, height: 120, objectFit: "cover" }}
                      source={{ uri: exerciseData.cover_photo }}
                    />
                  </TouchableOpacity>
                ) : (
                  <View style={{ width: 45, height: 45 }}>
                    <FAB
                      icon={<PlusIcon size={24} color={colors.white} />}
                      onPress={() => pickImageAsync()}
                    />
                  </View>
                )}
              </View>
            </View>
            {/* Video */}
            <View style={styles.formRow}>
              <Text style={styles.labelText}>Video tutorial</Text>
              <View style={{ justifyContent: "flex-start" }}>
                {exerciseData.video_tutorial ? (
                  <TouchableOpacity
                    onPress={() => removePickedVideoAlert()}
                    style={styles.photoWrapper}
                  >
                    <Video
                      ref={video}
                      style={{ flex: 1 }}
                      source={videoToRender}
                      useNativeControls={false}
                      resizeMode={ResizeMode.COVER}
                      isLooping
                    />
                  </TouchableOpacity>
                ) : (
                  <View style={{ width: 45, height: 45 }}>
                    <FAB
                      icon={<PlusIcon size={24} color={colors.white} />}
                      onPress={() => pickVideoAsync()}
                    />
                  </View>
                )}
              </View>
            </View>
            {/* Description */}
            <View style={[styles.formRow, { gap: 10 }]}>
              <Text style={styles.labelText}>Information</Text>
              <TestInput
                multiline={true}
                onChange={(value: string) =>
                  changeFieldValue(value, "information")
                }
                placeholder="Write a descriptive information "
                value={exerciseData.information}
              />
            </View>

            <View style={[styles.formRow, { gap: 10 }]}>
              <Text style={styles.labelText}>Tips & Tricks</Text>
              <TestInput
                multiline={true}
                placeholder="Be carefull with ..."
                value={exerciseData.tips}
                onChange={(value: string) => changeFieldValue(value, "tips")}
              />
            </View>
          </View>

          <View style={{ marginTop: 20, gap: 10 }}>
            <Button
              type="primary"
              text="Create"
              loading={pendingMutate}
              disabled={isCreateDisabled}
              onPress={mutate}
            />
            <Button
              type="outlined"
              disabled={isPublishDisabled}
              text="Create & Publish"
              onPress={() => createPublicExercise()}
            />
          </View>
        </ScrollView>
      </Screen>
    </KeyboardAvoidingView>
  );
};

export default CreateExercisePublishScreen;

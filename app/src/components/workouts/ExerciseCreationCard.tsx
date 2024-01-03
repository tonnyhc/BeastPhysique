import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import SubmitButton from "../common/SubmitButton";
import { useTheme } from "../../contexts/ThemeContext";
import { useNavigation } from "@react-navigation/native";

const ExerciseCreationCard: React.FC = () => {

  const { colors } = useTheme();
  const navigation = useNavigation();


  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "#C1B9B9",
        borderTopRightRadius: 24,
        borderTopLeftRadius: 24,
        justifyContent: "flex-start",
        paddingBottom: 12,
        paddingHorizontal: 6,
      }}
    >
      <View style={{ marginTop: 12 }}>
        <SubmitButton
          type="fill"
          buttonStyles={{ alignSelf: "center" }}
          text="Search for an exercise"
          onPress={() => navigation.navigate("ExerciseSearch")}
        />
        <View
          style={{
            flexDirection: "row",
            marginVertical: 12,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 80,
          }}
        >
          <View
            style={{ flex: 1, height: 1, backgroundColor: colors.helperText }}
          />
          <Text style={{ marginHorizontal: 12, color: colors.helperText }}>
            or
          </Text>
          <View
            style={{ flex: 1, height: 1, backgroundColor: colors.helperText }}
          />
        </View>
        <SubmitButton
          type="outlined"
          buttonStyles={{ alignSelf: "center" }}
          text="Create a custom one"
          onPress={() => {}}
        />
      </View>

    </View>
  );
};

export default ExerciseCreationCard;

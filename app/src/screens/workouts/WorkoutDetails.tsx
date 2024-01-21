import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Animated,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import GearIcon from "../../icons/GearIcon";
import TimelineIcon from "../../icons/TimelineIcon";

const WorkoutDetailsExerciseCard: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { colors } = useTheme();
  const scaleYAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(scaleYAnim, {
      toValue: isExpanded ? 1 : 0,
      duration: 120, // You can adjust the duration as needed
      useNativeDriver: false,
    }).start();
  }, [scaleYAnim, isExpanded]);

  const cardClickHandler = () => {
    setIsExpanded((oldExpanded) => !oldExpanded);
  };

  const styles = StyleSheet.create({
    card: {
      backgroundColor: "#CCCCCC",
      paddingTop: 10,
      paddingBottom: isExpanded ? 0 : 10,
      // paddingVertical: 10,
      paddingHorizontal: 14,
      borderRadius: 8,
    },
    headingWrapper: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    heading: {
      color: colors.primaryText,
      fontSize: 16,
      fontWeight: "500",
    },
    subheader: {
      fontSize: 16,
      color: colors.helperText,
      fontWeight: "500",
    },
    cardContent: {
      paddingVertical: 20,
    },
    animatedCardContent: {
      transform: [{ scaleY: scaleYAnim }],
      overflow: "hidden",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    buttonsWrapper: {
      flexDirection: "row",
      gap: 30,
      paddingHorizontal: 8,
    },
    button: {
      gap: 4,
    },
    buttonText: {
      color: colors.submitBtn,
      fontSize: 16,
    },
    separator: {
      height: "100%",
      width: 1,
      backgroundColor: colors.helperText,
    },
    setsCount: {
      justifyContent: "center",
      alignItems: "center",
      gap: 4,
    },
    body: {
      marginTop: 24,
      paddingHorizontal: 12,
      gap: 6,
    },
    bodyHeader: {
      fontSize: 15,
      color: colors.helperText,
      fontWeight: "600",
    },
    bodyText: {
      fontSize: 14,
      color: colors.helperText,
      fontWeight: "500",
    },
    footer: {
      marginTop: 20,
      paddingHorizontal: 10,
    },
    setsWrapper: {
      flexDirection: "row",
      flexWrap: "wrap",
      rowGap: 10,
      columnGap: 15,
    },
    setPill: {
      backgroundColor: "#DEDEDE",
      paddingHorizontal: 18,
      paddingVertical: 5,
      borderRadius: 5,
    },
    setContent: {
      fontSize: 16,
    },
    setDetails: {
      flexDirection: "row",
      marginTop: 10,
      paddingHorizontal: 12,
      paddingVertical: 6,
      backgroundColor: "#DEDEDE",
      justifyContent: "space-between",
    },
    setProperty: {
      fontSize: 14,
    },
    setValue: {
      color: colors.submitBtn,
      textAlign: "center",
    },
  });
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={cardClickHandler}>
        <View style={styles.headingWrapper}>
          <Text style={styles.heading}>Barbell Bench press</Text>
          {!isExpanded ? <Text style={styles.subheader}>4 sets</Text> : null}
        </View>
      </TouchableOpacity>

      {isExpanded ? (
        <Animated.View style={[styles.cardContent, styles.animatedCardContent]}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.buttonsWrapper}>
              <TouchableOpacity style={styles.button}>
                <TimelineIcon size={22} color={colors.submitBtn} />
                <Text style={styles.buttonText}>Progress</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <GearIcon size={22} color={colors.submitBtn} />
                <Text style={styles.buttonText}>Modify</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.separator} />
            <View style={styles.setsCount}>
              <Text style={styles.subheader}>4</Text>
              <Text style={styles.subheader}>Sets</Text>
            </View>
          </View>
          {/* Body */}
          <View style={styles.body}>
            <Text style={styles.bodyHeader}>Tips:</Text>
            <Text style={styles.bodyText}>
              When pulling try to squeeze your elbows behind your back
            </Text>
          </View>
          {/* Footer */}
          <View style={styles.footer}>
            <View style={styles.setsWrapper}>
              <TouchableOpacity style={styles.setPill}>
                <Text style={styles.setContent}>Set 1</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.setDetails}>
              {/* Set Property */}
              <View>
                <Text style={styles.setProperty}>Weight</Text>
                <Text style={styles.setValue}>62</Text>
              </View>
              {/* Set Property */}
              <View>
                <Text style={styles.setProperty}>Reps</Text>
                <Text style={styles.setValue}>62</Text>
              </View>
              {/* Set Property */}
              <View>
                <Text style={styles.setProperty}>Min Reps</Text>
                <Text style={styles.setValue}>62</Text>
              </View>
              {/* Set Property */}
              <View>
                <Text style={styles.setProperty}>Max Reps</Text>
                <Text style={styles.setValue}>62</Text>
              </View>
            </View>
          </View>
        </Animated.View>
      ) : null}
    </View>
  );
};

const WorkoutDetails: React.FC = () => {
  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
    },
    workoutName: {
      fontSize: 24,
      fontWeight: "500",
      alignSelf: "center",
      marginBottom: 10,
    },
    exercisesWrapper: {
      flexGrow: 1,
      backgroundColor: "#DCDCDC",
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      gap: 10,
      padding: 10,
    },
  });

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={styles.workoutName}>Upper</Text>
        <View style={styles.exercisesWrapper}>
          <WorkoutDetailsExerciseCard />
          <WorkoutDetailsExerciseCard />
        </View>
      </ScrollView>
    </View>
  )
};

export default WorkoutDetails;

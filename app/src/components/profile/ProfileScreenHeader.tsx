import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import Button from "../common/Button";

const ProfileScreenHeader = () => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    wrapper: {
      alignItems: "center",
      gap: 6,
      flexDirection: "row",
    },
    profilePicture: {
      width: 68,
      height: 68,
      objectFit: "cover",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 100,
    },
    fullName: {
      fontSize: 20,
      fontFamily: "RobotoMedium",
      letterSpacing: -0.33,
    },
    username: {
      fontSize: 16,
      color: colors.helperText,
      fontFamily: "RobotoRegular"
    },
    followersRow: {
      flexDirection: "row",
      gap: 10,
    },
    followersCount: {
      fontSize: 14,
      fontFamily: "RobotoRegular",
      lineHeight: 24,
      color: colors.helperText,
    },
  });

  return (
    <View style={styles.wrapper}>
      <Image
        style={styles.profilePicture}
        source={{
          uri: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }}
      />
      <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 6, justifyContent:"flex-start" }}>
        <View style={{ gap: 6 }}>
          <Text style={styles.fullName}>Tonny P.</Text>
          <Text style={styles.username}>@toni1</Text>
        </View>
        <View style={{alignItems: 'flex-start', flex: 1 }}>
          <View style={styles.followersRow}>
            <Text style={styles.followersCount}> 1300 following</Text>
            <Text style={styles.followersCount}>1200 followers</Text>
          </View>
          <Button buttonStyles={{alignSelf: "flex-start"}} onPress={() => {}} type="secondary" text="Edit profile" />
        </View>
      </View>
    </View>
  );
};

export default ProfileScreenHeader;

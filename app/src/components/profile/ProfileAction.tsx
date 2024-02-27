import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Button from "../common/Button";

const ProfileAction = () => {
  const styles = StyleSheet.create({
    buttonsRow: {
        gap: 12,
        flexDirection: 'row',
    }
  });

  return (
    <View style={styles.buttonsRow}>
        <Button buttonStyles={{flex: 1}} type="secondary" text="Edit Profile" onPress={() => {}}/>
        <Button buttonStyles={{flex: 1}} text="Settings" onPress={() => {}}/>
    </View>
  );
};

export default ProfileAction;

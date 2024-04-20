import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import TestInput from "../../components/common/TestInput";
import Screen from "../../components/common/Screen";
import Button from "../../components/common/Button";

interface UsernameAccountSettingsScreenProps {
  route: { params: { username: string } };
}

const UsernameAccountSettingsScreen: React.FC<
  UsernameAccountSettingsScreenProps
> = ({ route }) => {
  const username = route.params.username;
  const [newUsername, setNewUsername] = useState<string>(username);
  return (
    <Screen>
      <View style={{ flex: 1 }}>
        <TestInput
          keyboardType="ascii-capable"
          value={newUsername}
          placeholder="Enter username..."
          label="Username"
          onChange={(value: string) => setNewUsername(value)}
        />
        <View style={{ marginTop: 150 }}>
          <Button text="Done" onPress={() => {}} />
        </View>
      </View>
    </Screen>
  );
};

export default UsernameAccountSettingsScreen;

const styles = StyleSheet.create({});

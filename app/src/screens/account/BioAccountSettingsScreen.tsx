import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Screen from "../../components/common/Screen";
import TestInput from "../../components/common/TestInput";
import Button from "../../components/common/Button";

interface BioAccountSettingsScreenProps {
  route: { params: { bio: string } };
}

const BioAccountSettingsScreen: React.FC<BioAccountSettingsScreenProps> = ({
  route,
}) => {
  const bio = route.params.bio;
  const [newBio, setNewBio] = useState<string>(bio);
  return (
    <Screen>
      <View style={{ flex: 1 }}>
        <TestInput
          multiline={true}
          value={newBio}
          placeholder="Enter bio..."
          label="Bio"
          onChange={(value: string) => setNewBio(value)}
        />
        <View style={{ marginTop: 150 }}>
          <Button text="Done" onPress={() => {}} />
        </View>
      </View>
    </Screen>
  );
};

export default BioAccountSettingsScreen;

const styles = StyleSheet.create({});

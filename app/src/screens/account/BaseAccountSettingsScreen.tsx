import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import Screen from "../../components/common/Screen";
import Button from "../../components/common/Button";
import { useTheme } from "../../contexts/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AccountSettingsParamsList } from "../../Stacks/AccountSettingsStack";

const BaseAccountSettingsScreen: React.FC = () => {
  const navigation =
    useNavigation<StackNavigationProp<AccountSettingsParamsList>>();
  const properties: { key: string; value: string; navigate: () => void }[] = [
    {
      key: "Name",
      value: "Tonny Petrov",
      navigate: () => navigation.navigate("NameScreen"),
    },
    {
      key: "Username",
      value: "toni1",
      navigate: () => navigation.navigate("UsernameScreen"),
    },
    {
      key: "Bio",
      value: "21\nSoftware Engineer\n Pumping Iron",
      navigate: () =>
        navigation.navigate("BioScreen", {
          bio: "21\nSoftware Engineer\n Pumping Iron",
        }),
    },
  ];

  const { colors } = useTheme();
  const styles = StyleSheet.create({
    section: {
      paddingBottom: 16,
      borderBottomWidth: 0.5,
      borderBottomColor: colors.secondaryText,
    },
    profilePicWrapper: {
      justifyContent: "center",
      alignItems: "center",
    },
    profilePic: {
      width: 150,
      height: 150,
      borderRadius: 100,
    },
    property: {
      flexDirection: "row",
      padding: 10,
      gap: 16,
    },
    propertyLabel: {
      minWidth: 100,
      fontFamily: "RobotoRegular",
      fontSize: 18,
      color: colors.primaryText,
    },
    propertyValueWrapper: {
      borderBottomWidth: 0.5,
      borderBottomColor: colors.secondaryText,
      paddingBottom: 10,
      paddingLeft: 10,
      flex: 1,
    },
    propertyValue: {
      fontFamily: "RobotoRegular",
      fontSize: 18,
      color: colors.primaryText,
    },
  });

  return (
    <Screen>
      {/* profile pic */}
      <View style={styles.section}>
        <View style={styles.profilePicWrapper}>
          <Image
            resizeMode="cover"
            style={styles.profilePic}
            source={{
              uri: "https://plus.unsplash.com/premium_photo-1688891564708-9b2247085923?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
          />
          <Button type="text" text="Edit profile picture" onPress={() => {}} />
        </View>
      </View>

      {/* form */}
      <View style={styles.section}>
        {properties.map((prop) => (
          <View style={styles.property} key={prop.key}>
            <Text style={styles.propertyLabel}>{prop.key}</Text>
            <TouchableOpacity
              onPress={() => prop.navigate()}
              style={styles.propertyValueWrapper}
            >
              <Text style={styles.propertyValue}>{prop.value}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </Screen>
  );
};

export default BaseAccountSettingsScreen;

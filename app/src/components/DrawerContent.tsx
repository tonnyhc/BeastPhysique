import React from "react";
import Screen from "./common/Screen";
import { View, Image, Text, StyleSheet } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { TouchableOpacity } from "react-native-gesture-handler";

import { EvilIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import {
  Avatar,
  Paragraph,
  Title,
  Caption,
  Drawer,
  TouchableRipple,
  Switch,
} from "react-native-paper";

const DrawerContent = (props: any) => {
  const { toggleTheme, theme, colors } = useTheme();
  const styles = StyleSheet.create({
    userInfoSection: {
      flexDirection: "row",
      gap: 12,
      paddingLeft: 15,
      paddingTop: 15,
      borderBottomColor: "#ccc",
      borderBottomWidth: 2,
      paddingBottom: 6,
    },
    profileName: {
      fontSize: 22,
      color: colors.primaryText,
      lineHeight: 28,
    },
    username: {
      fontSize: 14,
      color: colors.secondaryText,
    },
    preferences: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        style={{
          backgroundColor: colors.bg,
        }}
        {...props}
      >
        <View>
          <View style={styles.userInfoSection}>
            <Avatar.Image
              source={{
                uri: "https://images.squarespace-cdn.com/content/v1/5b7e685d8ab722146afd7529/1564600902218-403CMIW9V4G2UC13A25W/PP_01.jpg",
              }}
            />
            <View>
              <Title style={styles.profileName}>Tonny Petrov</Title>
              <Caption style={styles.username}>@tonnyhc</Caption>
            </View>
          </View>

          <Drawer.Section
            style={{ flex: 1}}
            showDivider={false}
          >
            <DrawerItem
              labelStyle={{ color: colors.thirtiaryText }}
              label="Home"
              onPress={() => props.navigation.navigate("Home")}
            />
            <DrawerItem
              icon={() => (
                <Ionicons
                  name="ios-person"
                  size={22}
                  color={colors.thirtiaryText}
                />
              )}
              labelStyle={{ fontSize: 16, color: colors.thirtiaryText }}
              label="Profile"
              onPress={() => console.log("home clicked")}
            />
            <DrawerItem
              icon={() => (
                <EvilIcons name="gear" size={22} color={colors.thirtiaryText} />
              )}
              labelStyle={{ fontSize: 16, color: colors.thirtiaryText }}
              label="Settings"
              onPress={() => console.log("settings clicked")}
            />
          </Drawer.Section>

          <Drawer.Section
            showDivider={false}
            style={{
              flex: 1,
              borderTopColor: "#f4f4f4",
              borderTopWidth: 0.5,
            }}
          >
            <Title style={{color: colors.thirtiaryText, fontSize: 12, marginLeft: 15, fontWeight: '300'}}>
              Preferences
            </Title>
            <TouchableRipple>
              <View style={styles.preferences}>
                <Text style={{color: colors.thirtiaryText}}>Dark Mode</Text>
                <Switch onChange={toggleTheme} value={theme == "dark"} />
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default DrawerContent;

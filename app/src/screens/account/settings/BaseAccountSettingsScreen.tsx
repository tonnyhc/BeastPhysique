import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Screen from "../../../components/common/Screen";
import Button from "../../../components/common/Button";
import { useTheme } from "../../../contexts/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AccountSettingsParamsList } from "../../../Stacks/AccountSettingsStack";
import { useQuery } from "@tanstack/react-query";
import useProfileServices from "../../../hooks/services/useProfileServices";
import { emptyUserProfile } from "../../../utils/mapData";
import { ActivityIndicator } from "react-native-paper";
import AccountProfilePictureEditModal from "./AccountProfilePictureEditModal";
import { useTranslation } from "react-i18next";

const BaseAccountSettingsScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<StackNavigationProp<AccountSettingsParamsList>>();
  const { fetchProfile } = useProfileServices();
  const { refetch, data, isLoading } = useQuery({
    queryFn: fetchProfile,
    queryKey: ["user-profile"],
    initialData: emptyUserProfile,
  });

  const [profilePictureModal, setProfilePictureModal] =
    useState<boolean>(false);

  const properties: { key: string; value: string; navigate: () => void }[] = [
    {
      key: t('common.name'),
      value: data.full_name,
      navigate: () => navigation.navigate("NameScreen"),
    },
    {
      key: t('common.username'),
      value: data.user,
      navigate: () => navigation.navigate("UsernameScreen"),
    },
    {
      key: t('common.bio'),
      value: data.bio,
      navigate: () => navigation.navigate("BioScreen"),
    },
    {
      key: t('common.birthday'),
      value: data.birthday,
      navigate: () => navigation.navigate("BirthdayScreen"),
    },
  ];

  const { colors } = useTheme();
  const styles = StyleSheet.create({
    profilePicWrapper: {
      justifyContent: "center",
      alignItems: "center",
      paddingBottom: 16,
      borderBottomWidth: 0.5,
      borderBottomColor: colors.secondaryText,
    },
    form: { paddingTop: 16 },
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
      width: 100,
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
      <AccountProfilePictureEditModal
        onSuccessEdit={() => refetch()}
        closeModal={() => setProfilePictureModal(false)}
        visible={profilePictureModal}
      />
      {isLoading ? <ActivityIndicator /> : null}
      <View>
        <View style={styles.profilePicWrapper}>
          <TouchableOpacity onPress={() => setProfilePictureModal(true)}>
            <Image
              resizeMode="cover"
              style={styles.profilePic}
              source={{
                uri: data.picture,
              }}
            />
          </TouchableOpacity>

          <Button
            type="text"
            text={t("screens.account.edit_profile_picture")}
            onPress={() => setProfilePictureModal(true)}
          />
        </View>
      </View>

      {/* form */}
      <View style={styles.form}>
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

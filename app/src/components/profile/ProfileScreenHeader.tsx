import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import Button from "../common/Button";
import MoreDotsIcon from "../../icons/MoreDotsIcon";
import useProfileServices from "../../hooks/services/useProfileServices";
import { useQuery } from "@tanstack/react-query";
import { emptyUserProfile } from "../../utils/mapData";
import { useNavigation } from "@react-navigation/native";
import { ProfileScreenStackParamsList } from "../../Stacks/ProfileScreenStack";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import ProfilePicturePopUpModal from "./ProfilePicturePopUpModal";
import ProfileActionsModal from "./ProfileActionsModal";
import { Profile } from "../../ts/types";

interface ProfileScreenHeaderProps {
  profile_data: Profile;
}

const ProfileScreenHeader: React.FC<ProfileScreenHeaderProps> = ({
  profile_data,
}) => {
  const { colors } = useTheme();
  const navigation =
    useNavigation<StackNavigationProp<ProfileScreenStackParamsList>>();
  const { t } = useTranslation();
  const [expandedProfilePicture, setExpandedProfilePicture] =
    useState<boolean>(false);
  const [actionsModal, setActionsModal] = useState<boolean>(false);

  const styles = StyleSheet.create({
    wrapper: {
      paddingBottom: 12,
      borderBottomWidth: 0.5,
      borderBottomColor: colors.secondaryText,
    },
    upper_wrapper: {
      flexDirection: "row",
      gap: 12,
      // flex: 1
      height: "auto",
    },
    full_name_wrapper: {
      flexDirection: "row",
      gap: 6,
      justifyContent: "center",
      alignItems: "center",
    },

    profilePicture: {
      width: 100,
      height: 100,
      objectFit: "cover",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 100,
    },
    profileDetails: {
      flex: 1,
    },
    full_name_text: {
      fontSize: 20,
      fontFamily: "RobotoMedium",
      letterSpacing: -0.33,
    },
    username: {
      fontSize: 16,
      color: colors.secondaryText,
      fontFamily: "RobotoRegular",
    },
    followersRow: {
      flexDirection: "row",
      gap: 10,
      justifyContent: "space-between",
      paddingTop: 16,
      paddingBottom: 8,
    },
    followCount: {
      fontSize: 18,
      fontFamily: "RobotoMedium",
      color: colors.primaryText,
    },
    followText: {
      fontSize: 16,
      fontFamily: "RobotoRegular",
      color: colors.secondaryText,
    },
    followCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    bio: {
      paddingVertical: 10,
    },
    bioText: {
      fontSize: 16,
      fontFamily: "RobotoRegular",
      color: colors.primaryText,
    },
  });

  return (
    <>
      <ProfilePicturePopUpModal
        visible={expandedProfilePicture}
        closeModal={() => setExpandedProfilePicture(false)}
        picture_url={profile_data.picture}
      />
      <ProfileActionsModal
        visible={actionsModal}
        closeModal={() => setActionsModal(false)}
      />
      <View style={styles.wrapper}>
        <View style={styles.upper_wrapper}>
          <TouchableOpacity onPress={() => setExpandedProfilePicture(true)}>
            <Image
              style={styles.profilePicture}
              source={{
                uri: profile_data.picture,
              }}
            />
          </TouchableOpacity>
          <View style={styles.profileDetails}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={styles.full_name_wrapper}>
                <Text style={styles.full_name_text}>
                  {profile_data.full_name}
                </Text>
                {/* TODO: Add later on */}
                {/* <VerifyIcon size={18} color={colors.button} /> */}
              </View>
              <TouchableOpacity onPress={() => setActionsModal(true)}>
                <MoreDotsIcon size={24} color={colors.primaryText} />
              </TouchableOpacity>
            </View>
            <Text style={styles.username}>@ {profile_data.user}</Text>
            {/* TODO: Add later on */}
            {/* <View style={styles.followersRow}>
            <View style={styles.followCard}>
              <Text style={styles.followCount}>432</Text>
              <Text style={styles.followText}>Followings</Text>
            </View>
            <View style={styles.followCard}>
              <Text style={styles.followCount}>123</Text>
              <Text style={styles.followText}>Followers</Text>
            </View>
          </View> */}
            <View
              style={{
                paddingTop: 16,
              }}
            >
              <Button
                buttonStyles={{
                  // alignSelf: "flex-start",
                  paddingVertical: 8,
                }}
                onPress={() => navigation.navigate("EditProfile")}
                type="outlined"
                text={t("screens.profile.edit_profile")}
              />
            </View>
          </View>
        </View>
        <View style={styles.bio}>
          <Text style={styles.bioText}>{profile_data.bio}</Text>
        </View>
      </View>
    </>
  );
};

export default ProfileScreenHeader;

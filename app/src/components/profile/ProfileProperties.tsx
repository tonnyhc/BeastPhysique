import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Button from "../common/Button";
import { useTheme } from "../../contexts/ThemeContext";
import { ProfilePropertyCardProps } from "../../ts/types";
import ProfilePropertyCard from "./ProfilePropertyCard";

interface ProfilePropertiesProps {
  title: string;
  cards: ProfilePropertyCardProps[];
}

const ProfileProperties: React.FC<ProfilePropertiesProps> = ({
  title,
  cards,
}) => {
  const { colors } = useTheme();
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);
  const styles = StyleSheet.create({
    title: {
      fontSize: 18,
      fontFamily: "RobotoMedium",
      color: colors.primaryText,
    },
    titleRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    cardsWrapper: {
      paddingLeft: 20,
      gap: 13,
      marginTop: 10,
    },
  });

  return (
    <View>
      <View style={styles.titleRow}>
        <Text style={styles.title}>{title}</Text>
        <Button type="text" text="Edit" onPress={() => setIsOpenEditModal(true)} />
      </View>
      <View style={styles.cardsWrapper}>
        {cards.map((card) => (
          <ProfilePropertyCard
            key={card.heading}
            icon={card.icon}
            heading={card.heading}
            description={card.description}
          />
        ))}
      </View>
    </View>
  );
};

export default ProfileProperties;

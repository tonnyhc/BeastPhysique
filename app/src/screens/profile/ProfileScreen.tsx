import { View, Text, RefreshControl, Modal, Alert, Image } from "react-native";
import React, { ReactNode } from "react";
import Screen from "../../components/common/Screen";
import ProfileScreenHeader from "../../components/profile/ProfileScreenHeader";
import { useTheme } from "../../contexts/ThemeContext";
import PersonIcon from "../../icons/PersonIcon";
import ActivityLevelIcon from "../../icons/ActivityLevelIcon";
import useRefreshControl from "../../hooks/useRefreshControl";
import { ScrollView } from "react-native-gesture-handler";
import ProfileProperties from "../../components/profile/ProfileProperties";
import { PropertySection } from "../../ts/types";
import HeartIcon from "../../icons/HeartIcon";
import ScaleIcon from "../../icons/ScaleIcon";
import RulerIcon from "../../icons/RulerIcon";
import BurgerIcon from "../../icons/BurgerIcon";
import EggIcon from "../../icons/EggIcon";
import BreadIcon from "../../icons/BreadIcon";
import PizzaIcon from "../../icons/PizzaIcon";
import useProfileServices from "../../hooks/services/useProfileServices";
import { useQuery } from "@tanstack/react-query";
import { emptyUserProfile } from "../../utils/mapData";

const ProfileScreen: React.FC = () => {
  const { colors } = useTheme();
  const { fetchProfile } = useProfileServices();
  const { data: profileData, isLoading: isLoadingProfileData, refetch: refetchProfileData } = useQuery({
    queryFn: () => fetchProfile(),
    queryKey: ["user-profile"],
    initialData: emptyUserProfile,
  });
  const { onRefresh, refreshing } = useRefreshControl({
    refreshFn: () => {
      return refetchProfileData()
    },
    isLoading: false,
  });



  const propertiesMap: PropertySection[] = [
    {
      title: "Measures",
      cards: [
        {
          icon: <PersonIcon size={24} color={colors.helperText} />,
          heading: "Gender",
          description: "Man",
        },
        {
          icon: <RulerIcon size={24} color={colors.helperText} />,
          heading: "Height",
          description: "175",
        },
        {
          icon: <ScaleIcon size={24} color={colors.helperText} />,
          heading: "Weight",
          description: "85",
        },
      ],
    },
    {
      title: "Fitness",
      cards: [
        {
          icon: <HeartIcon size={24} color={colors.helperText} />,
          heading: "Goal",
          description: "Cut",
        },
        {
          icon: <ActivityLevelIcon size={24} color={colors.helperText} />,
          heading: "Activity Level",
          description: "Active",
        },
      ],
    },
    {
      title: "Nutrition",
      cards: [
        {
          icon: <BurgerIcon size={24} color={colors.helperText} />,
          heading: "Calories",
          description: "2300",
        },
        {
          icon: <EggIcon size={24} color={colors.helperText} />,
          heading: "Protein",
          description: "170",
        },
        {
          icon: <BreadIcon size={24} color={colors.helperText} />,
          heading: "Carbohydrates",
          description: "240",
        },
        {
          icon: <PizzaIcon size={24} color={colors.helperText} />,
          heading: "Fats",
          description: "80",
        },
      ],
    },
  ];
  return (
    <Screen>
      <ScrollView refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing}/> }>
        <ProfileScreenHeader profile_data={profileData}/>
      </ScrollView>
      {/* <ScrollView
        // refreshControl={
        //   <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        // }
        style={{ paddingHorizontal: 6, flexGrow: 1 }}
        contentContainerStyle={{ gap: 24, paddingBottom: 12 }}
      >
        <View style={{ gap: 23 }}>
          {propertiesMap.map((property, index) => (
            <ProfileProperties
              key={property.title}
              title={property.title}
              cards={property.cards}
            />
          ))}
        </View>
      </ScrollView> */}
    </Screen>
  );
};

export default ProfileScreen;

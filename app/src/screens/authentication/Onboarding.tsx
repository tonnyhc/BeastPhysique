import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Video, ResizeMode } from "expo-av";
import Screen from "../../components/common/Screen";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../../Stacks/AuthStack";
import LogoIcon from "../../icons/Logo";
import { useTheme } from "../../contexts/ThemeContext";
import Button from "../../components/common/Button";

const Onboarding: React.FC = () => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();
  const { colors } = useTheme();

  React.useEffect(() => {
    if (video) {
      video.current.playAsync();
    }
  }, [video]);

  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      justifyContent: "space-between",
    },
    logoWrapper: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    logoText: {
      fontFamily: "IntegralRegular",
      color: colors.primaryText,
      fontSize: 20,
      textTransform: "uppercase",
    },
    videoWrapper: {
      flex: 1,
      width: "100%",
      borderRadius: 10,
      overflow: "hidden",
      marginBottom: 60,
    },
    textOnVideo: {
      position: "absolute",
      color: colors.white,
      fontFamily: "RobotoMedium",
      fontSize: 20,
      bottom: 50,
      right: 0,
      left: 0,
      textAlign: 'center',
      textTransform: 'capitalize',
      paddingHorizontal: 30
    },
  });

  return (
    <Screen>
      <View style={styles.wrapper}>
        {/* logo */}
        <View style={styles.logoWrapper}>
          <LogoIcon size={32} color={colors.primaryText} />
          <Text style={styles.logoText}>BeastPhysique</Text>
        </View>
        {/* video */}
        <View style={styles.videoWrapper}>
          <Video
            ref={video}
            style={{ flex: 1 }}
            source={{
              uri: "https://static.vecteezy.com/system/resources/previews/033/025/828/mp4/ripped-african-male-bodybuilder-smiling-to-the-camera-after-lifting-barbell-video.mp4",
            }}
            useNativeControls={false}
            resizeMode={ResizeMode.COVER}
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
          <Text style={styles.textOnVideo}>
            Track your workouts like a true pro!
          </Text>
        </View>
        {/* buttons */}
        <View style={{ gap: 20 }}>
          <Button
            onPress={() => navigation.navigate("Register")}
            text="Get started"
          />
          <Button
            type="outlined"
            onPress={() => navigation.navigate("Login")}
            text="Sign in with an existing account"
          />
        </View>
      </View>
    </Screen>
  );
};

export default Onboarding;

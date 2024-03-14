import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Video, ResizeMode } from "expo-av";
import Screen from "../../components/common/Screen";
import TestButton from "../../components/common/TestButton";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../../Stacks/AuthStack";
import LogoIcon from "../../icons/Logo";
import { useTheme } from "../../contexts/ThemeContext";

const Onboarding: React.FC = () => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();
  const {colors} = useTheme()

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
        textTransform: "uppercase"
    }
  });

  return (
    <Screen>
      <View style={styles.wrapper}>
        {/* logo */}
        <View
          style={styles.logoWrapper}
        >
          <LogoIcon size={32} color={colors.primaryText} />
          <Text style={styles.logoText}>BeastPhysique</Text>
        </View>
        {/* video */}
        <View
          style={{
            flex: 1,
            width: "100%",
            borderRadius: 20,
            overflow: "hidden",
            marginBottom: 63,
          }}
        >
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
        </View>
        {/* buttons */}
        <View style={{ gap: 20 }}>
          <TestButton
            onPress={() => navigation.navigate("Register")}
            text="Get started"
          />
          <TestButton
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

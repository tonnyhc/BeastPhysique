import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import { useTheme } from "../contexts/ThemeContext";
import CloseButton from "../components/common/CloseButton";
import CreateExerciseNamingScreen from "../screens/exercises/CreateExerciseNamingScreen";
import Button from "../components/common/Button";
import { CreateExerciseProvider, useCreateExercise } from "../contexts/CreateExerciseContext";

interface CreateExerciseStackScreenProps {
  navigation: StackNavigationProp<any>;
}

export type CustomExerciseData = {
  name: string;
  cover_photo: string;
  information: string;
  video_tutorial: string;
  tips: string;
  publish: boolean;
};

const CreateExerciseStack = createStackNavigator();

const CreateExerciseStackScreen: React.FC<CreateExerciseStackScreenProps> = ({
  navigation,
}) => {
  const { colors } = useTheme();

  return (
    <CreateExerciseProvider>
      <CreateExerciseStack.Navigator
        screenOptions={{
          headerShown: true,
          headerTitle: "",
          headerTitleStyle: {
            color: colors.helperText,
          },
          headerBackTitleVisible: false,
          headerLeftContainerStyle: {
            paddingLeft: 12,
          },
          headerRightContainerStyle: {
            paddingRight: 12,
          },
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            backgroundColor: colors.bg,
          },
        }}
      >
        <CreateExerciseStack.Screen
          name="ExerciseNaming"
          component={CreateExerciseNamingScreen}
          options={({ navigation }) => ({
            headerShown: true,
            headerTitle: "Create exercise",
            headerLeft: (props) => (
              <CloseButton onPress={() => navigation.goBack()} />
            ),
            headerRight: (props) => {
                const {isCreateDisabled} = useCreateExercise();
              return (
                <Button
                  type="text"
                  text="Continue"
                  disabled={isCreateDisabled}
                  onPress={() => {}}
                />
              );
            },
            // (
            //   <Button
            //     type="text"
            //     text="Continue"
            //     disabled={exerciseData.name === ""}
            //     onPress={() => {}}
            //   />
            // ),
          })}
        />
        {/* <CreateExerciseStack.Screen
        component={ExerciseCreationModal}
        name="ExerciseNaming"
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: "Create exercise",
          headerLeft: (props) => (
            <CloseButton onPress={() => navigation.goBack()} />
          ),
        })}
      /> */}
      </CreateExerciseStack.Navigator>
    </CreateExerciseProvider>
  );
};

export default CreateExerciseStackScreen;

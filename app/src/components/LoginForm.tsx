import { AntDesign, Feather, FontAwesome5 } from "@expo/vector-icons";

import { AuthData, FormField, LoginBody, LoginReturnBody } from "../ts/types";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import ReusableInput from "./common/ReusableInput";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";

import { colors, lightColors } from "../utils/colors";
import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "../api/services/authentication";
import { AuthContext } from "../contexts/AuthContext";

type LoginError = {
  non_field_errors: string[];
  password?: string;
};

const LoginForm: React.FC = () => {
  const navigation = useNavigation();
  const [data, setData] = useState<LoginBody>({
    email_or_username: "",
    password: "",
  });
  const {userLogin} = useContext(AuthContext)
  const formFields: FormField[] = [
    {
      label: "Email or username",
      leftIcon: (
        <AntDesign
          name="mail"
          size={18}
          // color={colorScheme == "dark" ? "#DEE1E6FF" : "black"}
        />
      ),
      placeholder: "Enter email or username",
      value: data.email_or_username,
      onChange: (value) =>
        setData((oldData) => ({ ...oldData, email_or_username: value })),
    },
    {
      label: "Password",
      leftIcon: (
        <AntDesign
          name="lock"
          size={18}
          // color={colorScheme == "dark" ? "#DEE1E6FF" : "black"}
        />
      ),
      rightIcon: (
        <Feather
          name="eye-off"
          size={18}
          // color={colorScheme == "dark" ? "#DEE1E6FF" : "black"}
        />
      ),
      placeholder: "Enter password",
      isPassword: true,
      value: data.password,
      onChange: (value) =>
        setData((oldData) => ({ ...oldData, password: value })),
    },
  ];

  async function onLogin() {
    try{
      const response = await loginRequest(data);
      userLogin(data as AuthData);
      return navigation.navigate("Dashboard");
    } catch(e){
      Alert.alert(String(e))
    }
  }

  return (
    <View>
      {formFields.map((field) => (
        <View style={styles.inputWrapper} key={field.label}>
          <ReusableInput
            value={field.value}
            onChange={field.onChange}
            placeholder={field.placeholder}
            label={field.label}
            leftIcon={field.leftIcon}
            rightIcon={field.rightIcon}
            isPassword={field.isPassword}
          />
        </View>
      ))}
      <Text style={styles.forgotPass}>Forgot password?</Text>
      <View style={styles.actionBtns}>
        <TouchableOpacity onPress={onLogin} style={styles.submitBtn}>
          <Text style={styles.submitBtnText}>Sign In</Text>
        </TouchableOpacity>
        <Text style={styles.helperText}>OR LOG IN WITH</Text>
        <View style={styles.iconsWrapper}>
          <AntDesign
            name="google"
            size={24}
            // color={colorScheme == "dark" ? "#DEE1E6FF" : "black"}
          />
          <FontAwesome5
            name="facebook"
            size={24}
            // color={colorScheme == "dark" ? "#DEE1E6FF" : "black"}
          />
          <AntDesign
            name="apple-o"
            size={24}
            // color={colorScheme == "dark" ? "#DEE1E6FF" : "black"}
          />
        </View>
        <Text style={styles.helperText}>
          Don't have an account?{" "}
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.forgotPass}> Sign up </Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  inputWrapper: {
    marginBottom: 12,
  },
  forgotPass: {
    color: colors.blueText,
    fontWeight: "700",
    alignSelf: "flex-end",
    margin: 12,
    fontSize: 12,
  },
  actionBtns: {
    marginTop: 28,
    justifyContent: "center",
    gap: 16,
  },
  submitBtn: {
    paddingLeft: 16,
    paddingRight: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    height: 45,
    backgroundColor: colors.submitBtn,
  },
  submitBtnText: {
    color: colors.white,
    fontWeight: "700",
    fontFamily: "Acme",
  },
  helperText: {
    alignSelf: "center",
    fontSize: 12,
    fontWeight: "700",
    fontFamily: "Acme",
  },
  iconsWrapper: {
    flexDirection: "row",
    alignSelf: "center",
    gap: 32,
  },
});

{
  /* <View>
      {formFields.map((field) => (
        <View className="mb-3" key={field.label}>
          <ReusableInput
            value={field.value}
            onChange={field.onChange}
            placeholder={field.placeholder}
            label={field.label}
            leftIcon={field.leftIcon}
            rightIcon={field.rightIcon}
            isPassword={field.isPassword}
          />
        </View>
      ))}
      <Text className="text-blueText font-extrabold self-end my-3 text-xs dark:text-grayText">
        Forgot password?
      </Text>
      <View className="mt-7 justify-center gap-3">
        <TouchableOpacity className="px-4 items-center rounded-3xl h-11 justify-center bg-light-submitBtn">
          <Text className="text-base text-white font-extrabold font-acme">
            Sign Up
          </Text>
        </TouchableOpacity>
        <Text className="self-center text-xs font-extrabold font-acme text-helperText dark:dark-helperText">
          OR SIGN UP WITH
        </Text>
        <View className="flex-row self-center gap-8">
          <AntDesign
            name="google"
            size={24}
            color={colorScheme == "dark" ? "#DEE1E6FF" : "black"}
          />
          <FontAwesome5
            name="facebook"
            size={24}
            color={colorScheme == "dark" ? "#DEE1E6FF" : "black"}
          />
          <AntDesign
            name="apple-o"
            size={24}
            color={colorScheme == "dark" ? "#DEE1E6FF" : "black"}
          />
        </View>
        <Text className="self-center text-xs font-acme text-helperText font-extrabold">
          Don't have an account?{" "}
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text className="text-blueText font-extrabold self-center">
              {" "}
              Sign up{" "}
            </Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View> */
}

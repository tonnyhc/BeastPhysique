import { useColorScheme } from "nativewind";
import { AntDesign, Feather, FontAwesome5 } from "@expo/vector-icons";

import { FormField } from "../ts/types";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import ReusableInput from "./common/ReusableInput";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

import {colors, lightColors} from '../assets/colors'
import Section from "./common/Section";

const LoginForm: React.FC = () => {
  const { colorScheme } = useColorScheme();
  const navigation = useNavigation();
  const [data, setData] = useState({
    username_or_email: "",
    password: "",
  });
  const formFields: FormField[] = [
    {
      label: "Email or username",
      leftIcon: (
        <AntDesign
          name="mail"
          size={18}
          color={colorScheme == "dark" ? "#DEE1E6FF" : "black"}
        />
      ),
      placeholder: "Enter email or username",
      value: data.username_or_email,
      onChange: (value) => {
        setData((oldData) => ({ ...oldData, username_or_email: value }));
      },
    },
    {
      label: "Password",
      leftIcon: (
        <AntDesign
          name="lock"
          size={18}
          color={colorScheme == "dark" ? "#DEE1E6FF" : "black"}
        />
      ),
      rightIcon: (
        <Feather
          name="eye-off"
          size={18}
          color={colorScheme == "dark" ? "#DEE1E6FF" : "black"}
        />
      ),
      placeholder: "Enter password",
      isPassword: true,
      value: data.password,
      onChange: () => console.log("changed"),
    },
  ];

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
      <Text style={styles.forgotPass}>
        Forgot password?
      </Text>
      <View style={styles.actionBtns}>
        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.submitBtnText}>
            Sign Up
          </Text>
        </TouchableOpacity>
        <Text style={styles.helperText}>
          OR LOG IN WITH
        </Text>
        <View style={styles.iconsWrapper}>
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
        <Text style={styles.helperText}>
          Don't have an account?{" "}
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.forgotPass}>
              {" "}
              Sign up{" "}
            </Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  inputWrapper: {
    marginBottom: 12
  },
  forgotPass: {
    color: colors.blueText,
    fontWeight: '700',
    alignSelf: "flex-end",
    margin: 12,
    fontSize: 12
  },
  actionBtns: {
    marginTop: 28,
    justifyContent: 'center',
    gap: 16
  },
  submitBtn: {
    paddingLeft: 16,
    paddingRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    height: 45,
    backgroundColor: colors.submitBtn
  },
  submitBtnText: {
    color: colors.white,
    fontWeight: '700',
    fontFamily: "Acme"
  },
  helperText: {
    alignSelf: 'center',
    fontSize: 12,
    fontWeight: '700',
    fontFamily: "Acme",
  },
  iconsWrapper: {
    flexDirection: 'row',
    alignSelf: "center",
    gap: 32
  }
})


{/* <View>
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
    </View> */}
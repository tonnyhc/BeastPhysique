import { ReactNode, useState } from "react";
import { View, Text, Switch, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign, Feather, FontAwesome5 } from "@expo/vector-icons";
import ReusableInput from "./common/ReusableInput";
import { useColorScheme } from "nativewind";
import { FormField } from "../ts/types";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../assets/colors";

const RegisterForm: React.FC = () => {
  const { colorScheme } = useColorScheme();
  const navigation = useNavigation();
  const [data, setData] = useState({
    email: '',
    username: '',
    password: '',
    rep_pass: '',
  })
  const formFields: FormField[] = [
    {
      label: "Username",
      leftIcon: (
        <AntDesign
          name="user"
          size={18}
          color={colorScheme == "dark" ? "#DEE1E6FF" : "black"}
        />
      ),
      placeholder: "Enter username",
      value: data.username,
      onChange: () => console.log("changed")
    },
    {
      label: "Email",
      leftIcon: (
        <AntDesign
          name="mail"
          size={18}
          color={colorScheme == "dark" ? "#DEE1E6FF" : "black"}
        />
      ),
      placeholder: "Enter email",
      value: data.email,
      onChange: () => console.log("changed")
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
      onChange: () => console.log("changed")
    },
    {
      label: "Confirm password",
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
      placeholder: "Confirm password",
      isPassword: true,
      value: data.rep_pass,
      onChange: () => console.log("changed")
    },
  ];
  return (
    <View style={styles.formWrapper}>
      {formFields.map((field) => (
        <View style={styles.formFieldWrapper} key={field.label}>
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
      <View style={styles.termsConditions}>
        <Switch value={true} />
        <Text style={styles.termsConditionsText}>
          I agree with{" "}
          <Text style={styles.blueText}>
            Terms & Conditions
          </Text>
        </Text>
      </View>

      <View style={styles.actionBtns}>
        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.submitBtnText}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={styles.helperText}>
          OR SIGN UP WITH
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
          Already have an account?{" "}
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.blueText}>Sign in</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};
export default RegisterForm;

const styles = StyleSheet.create({
  formWrapper: {
    marginTop: 24,
  },
  formFieldWrapper: {
    marginBottom: 12
  },
  termsConditions: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 28
  },
  termsConditionsText: {
    flex: 1
  },
  blueText: {
    color: colors.blueText,
    fontWeight: '700'
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

{/* <View className="mt-6">
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
<View className="flex-row gap-2 items-center mt-3 mb-7">
  <Switch value={true} />
  <Text className="flex-1 dark:text-white">
    I agree with{" "}
    <Text className="text-blueText font-semibold">
      Terms & Conditions
    </Text>
  </Text>
</View>

<View className="mt-7 justify-center gap-3">
  <TouchableOpacity className="px-4 items-center rounded-3xl h-11 justify-center bg-light-submitBtn">
    <Text className="text-base text-white">Sign Up</Text>
  </TouchableOpacity>
  <Text className="self-center text-xs font-extrabold text-helperText dark:dark-helperText">
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
  <Text className="self-center text-xs text-helperText font-extrabold">
    Already have an account?{" "}
    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
      <Text className="text-blueText font-extrabold text-xs">Sign in</Text>
    </TouchableOpacity>
  </Text>
</View>
</View> */}

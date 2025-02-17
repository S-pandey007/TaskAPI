import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import React from "react";
import styles from "../style/RegistrationStyle";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";

import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next"; // Import translation hook
import i18n from "../i18n";

const Registration = () => {
  const navigation = useNavigation();
  const { t } = useTranslation(); // Translation Hook
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [errors, setErrors] = React.useState({});

  // Yup Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string().min(3, t("nameValidation")).required(t("requiredName")),
    email: Yup.string()
      .email(t("emailValidation"))
      .required(t("requiredEmail")),
    password: Yup.string()
      .min(6, t("minPassword"))
      .matches(/[A-Z]/, t("uppercase"))
      .matches(/[a-z]/, t("lowercase"))
      .matches(/[0-9]/, t("number"))
      .required(t("requiredPassword")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], t("confirmPassword"))
      .required(t("requiredConfirmPassword")),
  });

  const validateData = async (field, value) => {
    try {
      await validationSchema.validateAt(field, { [field]: value });
      setErrors((prev) => ({ ...prev, [field]: "" })); // Clear error if valid
    } catch (err) {
      setErrors((prev) => ({ ...prev, [field]: err.message })); // Set error message
    }
  };

  const handleSubmit = async () => {
    try {
      await validationSchema.validate(
        { name, email, password, confirmPassword },
        { abortEarly: false }
      );
      console.log("password is valid", password);

      // check  if user already exists
      const userDoc = await getDoc(doc(db, "TaskUsers", email));
      if (userDoc.exists()) {
        Alert.alert("Error", t("invalidCresentials"));
        console.log("User already exists");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // firbase auth and create new user
      await setDoc(doc(db, "TaskUsers", user.uid), {
        name: name,
        email: email,
        password: password,
        uid: user.uid,
      });
      // console.log("User created successfully:", user);
      await AsyncStorage.setItem("userId", user.uid);
      const userId = await AsyncStorage.getItem("userId");
      console.log("registration user local storeage : ", userId);
      navigation.navigate("Login");
    } catch (error) {
      const formattedErrors = {};
      error.inner.forEach((err) => {
        formattedErrors[err.path] = err.message;
      });
      setErrors(formattedErrors);
    }
  };

  // Function to change language dynamically
  const changeLanguage = async (lang) => {
    i18n.changeLanguage(lang); // Change language in i18n
    await AsyncStorage.setItem("appLanguage", lang); // Store selected language
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.innerContainer}>
          {/* Animation */}
          <LottieView
            source={require("../assets/animationJSON/registrationAnimationTask.json")}
            autoPlay
            loop
            style={styles.animation}
          />
          {/* Language Switcher */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            <Pressable onPress={() => changeLanguage("en")}>
              <Text style={{ marginHorizontal: 10 }}>🇺🇸 English</Text>
            </Pressable>
            <Pressable onPress={() => changeLanguage("hi")}>
              <Text style={{ marginHorizontal: 10 }}>🇮🇳 हिन्दी</Text>
            </Pressable>
            <Pressable onPress={() => changeLanguage("mr")}>
              <Text style={{ marginHorizontal: 10 }}>🇮🇳 मराठी</Text>
            </Pressable>
          </View>

          {/* User Registration Fields */}
          <Text style={styles.heading}>{t("register")}</Text>

          <View style={styles.inputContainer}>
            <View style={styles.innerInputContainer}>
              {/* <Text style={styles.label}>Name</Text> */}
              <TextInput
                value={name}
                onChangeText={setName}
                style={styles.input}
                placeholder={t("name")}
              />
            </View>

            <View style={styles.innerInputContainer}>
              {/* <Text style={styles.label}>Email</Text> */}
              <TextInput
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  validateData("email", text);
                }}
                style={styles.input}
                placeholder={t("email")}
                keyboardType="email-address"
              />
              {errors.email && (
                <Text style={{ color: "red" }}>{errors.email}</Text>
              )}
            </View>

            <View style={styles.innerInputContainer}>
              {/* <Text style={styles.label}>Password</Text> */}
              <TextInput
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  validateData("password", text);
                }}
                style={styles.input}
                placeholder={t("password")}
                secureTextEntry
              />
              {errors.password && (
                <Text style={{ color: "red" }}>{errors.password}</Text>
              )}
            </View>

            <View style={styles.innerInputContainer}>
              {/* <Text style={styles.label}>Confirm Password</Text> */}
              <TextInput
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  validateData("confirmPassword", text);
                }}
                style={styles.input}
                placeholder={t("password")}
                secureTextEntry
              />
              {errors.confirmPassword && (
                <Text style={{ color: "red" }}>{errors.confirmPassword}</Text>
              )}
            </View>
          </View>

          {/* Submit Button */}
          <Pressable onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>{t("register")}</Text>
          </Pressable>

          {/* Login Link for Registered Users */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>
              {t("already_registered")}{" "}
              <Pressable onPress={() => navigation.navigate("Login")}>
                <Text style={styles.loginLink}>{t("login")}</Text>
              </Pressable>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Registration;

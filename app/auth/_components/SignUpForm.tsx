import { useAuth } from "@/context/auth-context";
import { useTheme } from "@/context/theme-context";
import { SignUpFormProps } from "@/lib/types";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Formik } from "formik";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";

const musicSignUpValidation = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(40, "Maximum 40 characters")
    .required("Display name is required"),
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string()
    .min(6, "At least 6 characters")
    .max(20, "Maximum 20 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm your password"),
  acceptTerms: Yup.bool().oneOf(
    [true],
    "You must accept the terms & conditions"
  ),
});

const FONT = {
  title: 24,
  body: 14,
  small: 12,
  button: 16,
};

const ICON = {
  sm: 12,
};

const MusicSignUpPage = () => {
  const { signUpWithCredentials } = useAuth();
  const { theme } = useTheme();
  const [error, setError] = useState<string>("");

  const handleSignUp = async (values: SignUpFormProps) => {
    try {
      await signUpWithCredentials(values);
      setError("");
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.screen,
        { backgroundColor: theme.headerBackground },
      ]}
    >
      <View
        style={[
          styles.card,
          { backgroundColor: theme.surface, shadowColor: "#000" },
        ]}
      >
        <Text
          style={[styles.title, { color: theme.primary, fontSize: FONT.title }]}
        >
          Sign Up
        </Text>
        <Text
          style={[
            styles.subtitle,
            { color: theme.subText, fontSize: FONT.body },
          ]}
        >
          Join our community to solve quizzes.
        </Text>

        <Formik<SignUpFormProps>
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            acceptTerms: false,
          }}
          validationSchema={musicSignUpValidation}
          onSubmit={handleSignUp}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <View style={{ width: "100%" }}>
              <Text
                style={[
                  styles.label,
                  { color: theme.text, fontSize: FONT.body },
                ]}
              >
                Display Name
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.surface,
                    borderColor: theme.border,
                    color: theme.text,
                  },
                ]}
                placeholder="Your name or stage name"
                placeholderTextColor={theme.subText}
                value={values.name}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
              />
              {touched.name && errors.name && (
                <Text style={[styles.error, { fontSize: FONT.small }]}>
                  {errors.name}
                </Text>
              )}

              <Text
                style={[
                  styles.label,
                  { color: theme.text, fontSize: FONT.body },
                ]}
              >
                Email
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.surface,
                    borderColor: theme.border,
                    color: theme.text,
                  },
                ]}
                placeholder="Enter your email"
                placeholderTextColor={theme.subText}
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {touched.email && errors.email && (
                <Text style={[styles.error, { fontSize: FONT.small }]}>
                  {errors.email}
                </Text>
              )}

              <Text
                style={[
                  styles.label,
                  { color: theme.text, fontSize: FONT.body },
                ]}
              >
                Password
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.surface,
                    borderColor: theme.border,
                    color: theme.text,
                  },
                ]}
                placeholder="Password"
                placeholderTextColor={theme.subText}
                secureTextEntry
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
              />
              {touched.password && errors.password && (
                <Text style={[styles.error, { fontSize: FONT.small }]}>
                  {errors.password}
                </Text>
              )}

              <Text
                style={[
                  styles.label,
                  { color: theme.text, fontSize: FONT.body },
                ]}
              >
                Confirm Password
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.surface,
                    borderColor: theme.border,
                    color: theme.text,
                  },
                ]}
                placeholder="Confirm password"
                placeholderTextColor={theme.subText}
                secureTextEntry
                value={values.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={[styles.error, { fontSize: FONT.small }]}>
                  {errors.confirmPassword}
                </Text>
              )}

              <TouchableOpacity
                style={styles.termsRow}
                onPress={() =>
                  setFieldValue("acceptTerms", !values.acceptTerms)
                }
              >
                <View
                  style={[
                    styles.checkbox,
                    {
                      backgroundColor: values.acceptTerms
                        ? theme.primary
                        : theme.surface,
                      borderColor: values.acceptTerms
                        ? theme.primary
                        : theme.border,
                    },
                  ]}
                >
                  {values.acceptTerms && (
                    <Ionicons name="checkmark" size={ICON.sm} color="#ffffff" />
                  )}
                </View>
                <Text
                  style={[
                    styles.termsText,
                    { color: theme.subText, fontSize: FONT.small },
                  ]}
                >
                  I agree to the Terms of Service and Privacy Policy.
                </Text>
              </TouchableOpacity>
              {errors.acceptTerms && (
                <Text style={[styles.error, { fontSize: FONT.small }]}>
                  {errors.acceptTerms}
                </Text>
              )}

              {!!error && (
                <Text style={[styles.error, { fontSize: FONT.small }]}>
                  {error}
                </Text>
              )}

              <TouchableOpacity
                style={[styles.button, { backgroundColor: theme.primary }]}
                onPress={handleSubmit as any}
              >
                <Text style={[styles.buttonText, { fontSize: FONT.button }]}>
                  Sign Up
                </Text>
              </TouchableOpacity>

              <View style={styles.footerRow}>
                <Text
                  style={[
                    styles.footerText,
                    { color: theme.subText, fontSize: FONT.small },
                  ]}
                >
                  Already have an account?{" "}
                </Text>
                <Link
                  href={"/auth/sign-in"}
                  style={[styles.link, { color: theme.primary }]}
                >
                  Login
                </Link>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default MusicSignUpPage;

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 400,
    padding: 20,
    paddingVertical: 20,
  },
  card: {
    borderRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 20,
    width: "100%",
    maxWidth: 420,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 4,
  },
  title: {
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontWeight: "500",
    marginTop: 8,
    marginBottom: 4,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 15,
  },
  error: {
    color: "red",
    marginTop: 4,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 999,
    marginTop: 18,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  footerText: {},
  link: {
    textDecorationLine: "underline",
    fontWeight: "500",
  },
  termsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  termsText: {
    flex: 1,
  },
});

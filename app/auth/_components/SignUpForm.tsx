import { useAuth } from "@/context/auth-context";
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

// interface MusicSignUpFormValues {
//   name: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
//   // favoriteGenre: string;
//   // role: "listener" | "artist" | "";
//   acceptTerms: boolean;
// }

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

const MusicSignUpPage = () => {
  const { signUpWithCredentials } = useAuth();
  const [error, setError] = useState<string>("");

  const handleSignUp = async (values: SignUpFormProps) => {
    try {
      await signUpWithCredentials(values);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      {/* Card */}
      <View style={styles.card}>
        {/* Header */}
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>
          Join our community to solve quizzes.
        </Text>

        {/* Formik form */}
        <Formik<SignUpFormProps>
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            // favoriteGenre: "",
            // role: "",
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
              {/* Display Name */}
              <Text style={styles.label}>Display Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Your name or stage name"
                value={values.name}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
              />
              {touched.name && errors.name && (
                <Text style={styles.error}>{errors.name}</Text>
              )}

              {/* Email */}
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}

              {/* Password */}
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
              />
              {touched.password && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}

              {/* Confirm Password */}
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Confirm password"
                secureTextEntry
                value={values.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={styles.error}>{errors.confirmPassword}</Text>
              )}

              {/* Accept terms */}
              <TouchableOpacity
                style={styles.termsRow}
                onPress={() =>
                  setFieldValue("acceptTerms", !values.acceptTerms)
                }
              >
                <View
                  style={[
                    styles.checkbox,
                    values.acceptTerms && styles.checkboxChecked,
                  ]}
                >
                  {values.acceptTerms && (
                    <Ionicons name="checkmark" size={12} color="#ffffff" />
                  )}
                </View>
                <Text style={styles.termsText}>
                  I agree to the Terms of Service and Privacy Policy.
                </Text>
              </TouchableOpacity>
              {errors.acceptTerms && (
                <Text style={styles.error}>{errors.acceptTerms}</Text>
              )}

              {!!error && <Text style={styles.error}>{error}</Text>}

              {/* Button */}
              <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit as any}
              >
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>

              {/* Footer link */}
              <View style={styles.footerRow}>
                <Text style={styles.footerText}>Already have an account? </Text>
                <Link href={"/auth/sign-in"} style={styles.link}>
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
  // background
  screen: {
    flexGrow: 1,
    backgroundColor: "#543cda",
    alignItems: "center",
    justifyContent: "center",
    width: 400,
    padding: 20,
    paddingVertical: 20,
  },
  // card
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 20,
    width: "100%",
    maxWidth: 420,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 6,
    color: "#543cda",
  },
  subtitle: {
    textAlign: "center",
    color: "#6b7280",
    marginBottom: 20,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 10,
    backgroundColor: "#ffffff",
  },
  socialButtonText: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: "500",
    color: "#111827",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#e5e7eb",
  },
  dividerText: {
    marginHorizontal: 8,
    fontSize: 12,
    color: "#9ca3af",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 8,
    marginBottom: 4,
    color: "#111827",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#f9fafb",
    fontSize: 15,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    backgroundColor: "#543cda",
    paddingVertical: 14,
    borderRadius: 999,
    marginTop: 18,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  footerText: {
    fontSize: 13,
    color: "#4b5563",
  },
  link: {
    textDecorationLine: "underline",
    fontWeight: "500",
  },
  // select the role
  roleRow: {
    flexDirection: "row",
    gap: 8,
  },
  roleButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 999,
    paddingVertical: 8,
    marginTop: 4,
    backgroundColor: "#ffffff",
  },
  roleButtonActive: {
    backgroundColor: "#e5e7eb",
    borderColor: "#6b7280",
  },
  roleButtonText: {
    marginLeft: 6,
    fontSize: 13,
    color: "#6b7280",
  },
  roleButtonTextActive: {
    color: "#111827",
    fontWeight: "600",
  },
  // checkbox styles
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
    borderColor: "#d1d5db",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    backgroundColor: "#ffffff",
  },
  checkboxChecked: {
    backgroundColor: "#543cda",
    borderColor: "#543cda",
  },
  termsText: {
    flex: 1,
    fontSize: 12,
    color: "#4b5563",
  },
});

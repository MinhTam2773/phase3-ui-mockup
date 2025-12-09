import { useAuth } from '@/context/auth-context';
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

interface SignInFormValues {
  email: string;
  password: string;
}

const signInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password is at least 6 characters")
    .max(20, "Password must not pass 20 characters")
    .required(),
});

const SigninForm = () => {
  const { signInWithCredentials} = useAuth();
  const [error, setError] = useState<string>("");

  const handleLogin = async (values: SignInFormValues) => {
    try {
      await signInWithCredentials(values);
    } catch(e : any) {
      setError(e.message);
    }
  };
  
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      {/* Card */}
      <View style={styles.card}>
        {/* Header */}
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>
          Login to your account to continue solving quizzes.
        </Text>

        <Formik<SignInFormValues>
          initialValues={{ email: "", password: "" }}
          validationSchema={signInSchema}
          onSubmit={handleLogin}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={{ width: "100%" }}>
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
              <View style={styles.passwordHeader}>
                <Text style={styles.label}>Password</Text>
                <TouchableOpacity>
                  <Text style={styles.forgotPassword}>Forgot password?</Text>
                </TouchableOpacity>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                secureTextEntry
                autoCapitalize="none"
              />
              {touched.password && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}

              {/* Error message */}
              {error && (
                <Text style={styles.error}>{error}</Text>
              )}

              {/* Button */}
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleSubmit()}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>

              {/* Footer link */}
              <View style={styles.footerRow}>
                <Text style={styles.footerText}>No account? </Text>
                <Link href={'/auth/sign-up'} style={styles.link}>
                  Sign up
                </Link>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default SigninForm;

const styles = StyleSheet.create({
  // Background
  screen: {
    flexGrow: 1,
    backgroundColor: "#543cda",
    alignItems: "center",
    justifyContent: "center",
    width: 400,
    padding: 20,
    paddingVertical: 20,
  },
  // Card
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
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 8,
    marginBottom: 4,
    color: "#111827",
  },
  passwordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  forgotPassword: {
    fontSize: 13,
    fontWeight: "500",
    color: "#543cda",
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
    color: "#ef4444",
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
});
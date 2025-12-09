import { useAuth } from "@/context/auth-context";
import { useTheme } from "@/context/theme-context";
import { Link } from "expo-router";
import { Formik } from "formik";
import React, { useState } from "react";
import {
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
    .required("Password is required"),
});

const FONT = {
  title: 24,
  body: 14,
  small: 12,
  button: 16,
};

const SigninForm = () => {
  const { signInWithCredentials } = useAuth();
  const { theme } = useTheme();
  const [error, setError] = useState<string>("");

  const handleLogin = async (values: SignInFormValues) => {
    try {
      await signInWithCredentials(values);
      setError("");
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.surface, borderColor: theme.border },
      ]}
    >
      <Text
        style={[styles.title, { color: theme.primary, fontSize: FONT.title }]}
      >
        Welcome Back
      </Text>
      <Text
        style={[styles.subtitle, { color: theme.subText, fontSize: FONT.body }]}
      >
        Login with your email and password
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
          <>
            <Text
              style={[styles.label, { color: theme.text, fontSize: FONT.body }]}
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
              placeholder="Email"
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

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Text
                style={[
                  styles.label,
                  { color: theme.text, fontSize: FONT.body },
                ]}
              >
                Password
              </Text>
              <Text
                style={{
                  fontWeight: "500",
                  color: theme.primary,
                  fontSize: FONT.small,
                }}
              >
                Forgot your password?
              </Text>
            </View>
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
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              secureTextEntry
              autoCapitalize="none"
            />
            {touched.password && errors.password && (
              <Text style={[styles.error, { fontSize: FONT.small }]}>
                {errors.password}
              </Text>
            )}

            {!!error && (
              <Text style={[styles.error, { fontSize: FONT.small }]}>
                {error}
              </Text>
            )}

            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme.primary }]}
              onPress={() => handleSubmit()}
            >
              <Text style={[styles.buttonText, { fontSize: FONT.button }]}>
                Login
              </Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>

      <Text
        style={[
          styles.closingText,
          { color: theme.subText, fontSize: FONT.small },
        ]}
      >
        No account?{" "}
        <Link
          href={"/auth/sign-up"}
          style={[styles.link, { color: theme.primary }]}
        >
          Sign up
        </Link>
      </Text>
    </View>
  );
};

export default SigninForm;

const styles = StyleSheet.create({
  container: {
    width: 400,
    padding: 20,
    paddingVertical: 20,
    borderRadius: 20,
    borderWidth: 1,
  },
  title: {
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontWeight: "600",
    marginTop: 10,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginTop: 2,
  },
  error: {
    color: "red",
    marginTop: 4,
    marginBottom: 4,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
  },
  closingText: {
    textAlign: "center",
    marginTop: 19,
  },
  link: {
    textDecorationLine: "underline",
    fontWeight: "500",
  },
});

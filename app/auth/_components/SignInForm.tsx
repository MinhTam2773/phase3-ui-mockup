import { useAuth } from '@/context/auth-context';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
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
    .required(),
});

const SigninForm = () => {
  const {signInOAuth, signInWithCredentials} = useAuth();
  const [error, setError] = useState<string>("");

  const handleLogin = async (values: SignInFormValues) => {
    try {
      await signInWithCredentials(values);
    } catch(e : any) {
      setError(e.message);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>
        Login with your Apple or Google account
      </Text>

      <TouchableOpacity onPress={async () => await signInOAuth('facebook')} style={styles.oauthLoginContainer}>
        <Entypo name="facebook" size={20} color="black" />
        <Text style={styles.oauthLoginText}>Login with Facebook</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={async () => await signInOAuth('google')} style={styles.oauthLoginContainer}>
        <FontAwesome name="google" size={20} color="black" />
        <Text style={styles.oauthLoginText}>Login with Google</Text>
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <View style={styles.hr}></View>
        <Text style={{color: 'gray'}}>Or continue with</Text>
        <View style={styles.hr}></View>
      </View>

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
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {touched.email && errors.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}

            <View style={{flexDirection: "row", justifyContent: 'space-between', alignItems: 'flex-end'}}>
                <Text style={styles.label}>Password</Text>
                <Text style={{fontWeight: '500', color: '#543cda'}}>Forgot your password?</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              secureTextEntry
              autoCapitalize="none"
            />
            {touched.password && errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            {error &&
              <Text style={styles.error}>{error}</Text>
            }

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSubmit()}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>

      <Text style={styles.closingText}>No account? <Link href={'/auth/sign-up'} style={styles.link}>Sign up</Link></Text>
    </View>
  );
};

export default SigninForm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    width: 400,
    padding: 20,
    paddingVertical: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e6e6e9",
  },
  oauthLoginContainer: {
    flexDirection: "row",
    justifyContent: 'center',
    gap: 10,
    width: "100%",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    padding: 12,
    marginTop: 12,
    backgroundColor: "#ffffff",
    fontSize: 16,
  },
  oauthLoginText: {
    fontWeight: "600"
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
    color: '#543cda'
  },
  subtitle: {
    color: "gray",
    textAlign: "center",
    marginBottom: 20,
  },
  dividerContainer: {
    flexDirection: "row",
    marginTop: 30, 
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  }, 
  hr: {
    width: "32%",
    height: 1,
    backgroundColor: '#e9e8ed'
  },
  label: {
    fontWeight: '600',
    marginTop: 10,
  }, 
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    padding: 12,
    marginTop: 2,
    backgroundColor: "#ffffff",
    // marginBottom: 15,
  },
  error: {
    color: "red",
    fontSize: 13,
    marginTop: 4,
    marginBottom: 4,
  },
  button: {
    backgroundColor: "#543cda",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  closingText: {
    textAlign: 'center',
    marginTop: 19,
    fontSize: 13,
    color: "#4b5563",
  },
  link: {
    textDecorationLine: 'underline',
    fontWeight: "500",
    color: 'black'
  }
});

import Footer from "@/components/Footer";
import { AuthContextProvider } from "@/context/auth-context";
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <SafeAreaView style={styles.container}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: "transparent",
            },
          }}
        />
        <Footer />
      </SafeAreaView>
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});

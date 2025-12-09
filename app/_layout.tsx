import Footer from "@/components/Footer";
import { AuthContextProvider } from "@/context/auth-context";
import { ThemeProvider, useTheme } from "@/context/theme-context";
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthContextProvider>
        <ThemedLayout />
      </AuthContextProvider>
    </ThemeProvider>
  );
}

function ThemedLayout() {
  const { theme } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

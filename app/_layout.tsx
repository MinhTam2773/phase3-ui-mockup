import Footer from "@/components/Footer";
import { AuthContextProvider } from "@/context/auth-context";
import { ThemeProvider, useTheme } from "@/context/theme-context";
import { Stack, usePathname } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

function AppLayout() {
  const path = usePathname();
  const { theme } = useTheme();

  const isAuth = path.startsWith("/auth");
  const backgroundColor = isAuth ? theme.headerBackground : theme.background;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor,
      }}
    >
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "transparent",
          },
        }}
      />
      {!isAuth && <Footer />}
    </SafeAreaView>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthContextProvider>
        <AppLayout />
      </AuthContextProvider>
    </ThemeProvider>
  );
}

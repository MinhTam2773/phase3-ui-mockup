import Footer from "@/components/Footer";
import { AuthContextProvider } from "@/context/auth-context";
import { Stack, usePathname } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  const path = usePathname();
  const backgroundColor = path.startsWith("/auth") ? "#543cda" : "#ffffff"
  return (
    <AuthContextProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: `${backgroundColor}`,
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
        {!path.startsWith("/auth") && <Footer />}
      </SafeAreaView>
    </AuthContextProvider>
  );
}

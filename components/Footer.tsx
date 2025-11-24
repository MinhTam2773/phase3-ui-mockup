// app/components/Footer.tsx
import { Link, usePathname } from "expo-router";
import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import type { Href } from "expo-router";

const Footer = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <View style={styles.container}>
      {/* Study/Home Link */}
      <Link href={"/" as Href} asChild>
        <Pressable style={styles.iconContainer}>
          <Feather
            name="home"
            size={28}
            color={isActive("/") ? "#14b8a6" : "#9ca3af"}
          />
          <Text style={[styles.iconText, isActive("/") && styles.activeText]}>
            Study
          </Text>
        </Pressable>
      </Link>

      {/* Progress Link */}
      <Link href={"/progress" as Href} asChild>
        <Pressable style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="chart-bar"
            size={28}
            color={isActive("/progress") ? "#14b8a6" : "#9ca3af"}
          />
          <Text
            style={[
              styles.iconText,
              isActive("/progress") && styles.activeText,
            ]}
          >
            Progress
          </Text>
        </Pressable>
      </Link>

      {/* Profile Link */}
      <Link href={"/profile" as Href} asChild>
        <Pressable style={styles.iconContainer}>
          <Feather
            name="user"
            size={28}
            color={isActive("/profile") ? "#14b8a6" : "#9ca3af"}
          />
          <Text
            style={[styles.iconText, isActive("/profile") && styles.activeText]}
          >
            Profile
          </Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#111827",
    borderTopWidth: 1,
    borderTopColor: "#1f2937",
    paddingVertical: 12,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  iconContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    minWidth: 70,
  },
  iconText: {
    color: "#9ca3af",
    fontSize: 12,
  },
  activeText: {
    color: "#14b8a6",
  },
});

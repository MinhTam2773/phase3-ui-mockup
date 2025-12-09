import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import React from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import CircleProgress from "@/components/CircleProgress";
import { useAuth } from "@/context/auth-context";
import { formatDate } from "@/lib/utils";

// ----------------------------
//  SECTION 1: USER BASIC INFO
// ----------------------------
const ProfileHeaderSection = () => {
  const {user} = useAuth();
  return (
  <View style={styles.card}>
    <View style={styles.headerRow}>
      <View style={styles.avatar}>
        <Ionicons name="person" size={42} color="#543cda" />
      </View>
      <View>
        <Text style={styles.nickname}>{user?.user_metadata?.name}</Text>
        <Text style={styles.subText}>Joined {formatDate(user?.created_at) }</Text>
      </View>
    </View>
  </View>
); 
} 

// ----------------------------
//  SECTION 2: LEARNING SECTION
// ----------------------------
const LearningSection = () => (
  <View style={styles.card}>
    <Text style={styles.sectionTitle}>Learning Overview</Text>

    {/* Goal */}
    <View style={styles.goalBox}>
      <Text style={styles.goalText}>🎯 Goal: Finish 3 quizzes weekly</Text>
    </View>

    {/* Subjects */}
    <View style={{ marginTop: 10 }}>
      <Text style={styles.subSectionTitle}>Subjects</Text>

      <View style={styles.subjectTagBox}>
        <View style={styles.subjectTag}>
          <Text style={styles.subjectTagText}>Algebra</Text>
        </View>
        <View style={styles.subjectTag}>
          <Text style={styles.subjectTagText}>History</Text>
        </View>
        <View style={styles.subjectTag}>
          <Text style={styles.subjectTagText}>Biology</Text>
        </View>
      </View>
    </View>

    {/* Learning Summary */}
    <View style={{ marginTop: 20 }}>
      <Text style={styles.subSectionTitle}>Summary</Text>

      <View style={styles.summaryRow}>
        <CircleProgress
          percentage={90}
          size={100}
          strokeWidth={10}
          color="#543cda"
        />

        <View style={styles.summaryRight}>
          <Text style={styles.summaryNumber}>28</Text>
          <Text style={styles.summaryLabel}>Quizzes Taken</Text>

          <Text style={[styles.summaryNumber, { marginTop: 8 }]}>7d</Text>
          <Text style={styles.summaryLabel}>Streak</Text>
        </View>
      </View>
    </View>
  </View>
);

// ----------------------------
//  SECTION 3: SETTINGS SECTION
// ----------------------------
const SettingsSection = () => {
  const {signOut, user} = useAuth()
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await signOut();
        },
      },
    ]);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Settings</Text>

      {/* My Progress */}
      <Link href="/progress" asChild>
        <TouchableOpacity style={styles.menuRow}>
          <View style={styles.menuLeft}>
            <Ionicons name="bar-chart-outline" size={22} color="#543cda" />
            <Text style={styles.menuText}>My Progress</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </TouchableOpacity>
      </Link>

      {/* Account Info - Static */}
      <View style={styles.menuRow}>
        <View style={styles.menuLeft}>
          <Ionicons name="person-outline" size={22} color="#543cda" />
          <View>
            <Text style={styles.menuText}>Account</Text>
            <Text style={styles.accountEmail}>{user?.email}</Text>
          </View>
        </View>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>Active</Text>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        style={[styles.menuRow, { borderBottomWidth: 0 }]}
        onPress={handleLogout}
      >
        <View style={styles.menuLeft}>
          <Ionicons name="log-out-outline" size={22} color="#ef4444" />
          <Text style={[styles.menuText, { color: "#ef4444" }]}>Logout</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
      </TouchableOpacity>
    </View>
  );
};

// ----------------------------
// MAIN PROFILE PAGE
// ----------------------------
export default function ProfilePage() {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#f9fafb" }}
      contentContainerStyle={styles.container}
    >
      <ProfileHeaderSection />
      <LearningSection />
      <SettingsSection />
    </ScrollView>
  );
}

// ----------------------------
// STYLES
// ----------------------------
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingTop: 20,
    paddingBottom: 120, // so footer doesn't cover content
    gap: 20,
  },

  card: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 14,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
    gap: 14,
  },

  // SECTION 1: PROFILE HEADER
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  avatar: {
    height: 70,
    width: 70,
    borderRadius: 999,
    backgroundColor: "#d8e0ff",
    justifyContent: "center",
    alignItems: "center",
  },
  nickname: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
  },
  subText: {
    color: "#6b7280",
    fontSize: 14,
  },

  // SECTION 2: LEARNING
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
  },
  subSectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    color: "#374151",
  },
  goalBox: {
    padding: 12,
    backgroundColor: "#f3f4f6",
    borderRadius: 10,
  },
  goalText: {
    fontSize: 14,
    color: "#374151",
  },
  subjectTagBox: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  subjectTag: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#d8e0ff",
    borderRadius: 20,
  },
  subjectTagText: {
    color: "#543cda",
    fontWeight: "500",
    fontSize: 13,
  },

  summaryRow: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  summaryRight: {
    gap: 4,
  },
  summaryNumber: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },
  summaryLabel: {
    color: "#6b7280",
    fontSize: 13,
  },

  // SECTION 3: MENU
  menuRow: {
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#e5e7eb",
    borderBottomWidth: 1,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  menuText: {
    fontSize: 16,
    color: "#111827",
  },
  accountEmail: {
    fontSize: 13,
    color: "#9ca3af",
    marginTop: 2,
  },
  statusBadge: {
    backgroundColor: "#d1fae5",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#065f46",
  },
});

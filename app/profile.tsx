import CircleProgress from "@/components/CircleProgress";
import { useAuth } from "@/context/auth-context";
import { useTheme } from "@/context/theme-context";
import { formatDate } from "@/lib/utils";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import React from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const FONT = {
  title: 20,
  cardTitle: 18,
  body: 14,
  small: 12,
};

const ICON = {
  lg: 32,
  md: 24,
  sm: 20,
};

const ProfileHeaderSection = () => {
  const { user } = useAuth();
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.surface, borderColor: theme.border },
      ]}
    >
      <View style={styles.headerRow}>
        <View style={[styles.avatar, { backgroundColor: theme.pill }]}>
          <Ionicons name="person" size={ICON.lg} color={theme.primary} />
        </View>
        <View>
          <Text
            style={[
              styles.nickname,
              { color: theme.text, fontSize: FONT.cardTitle },
            ]}
          >
            {user?.user_metadata?.name ?? "User"}
          </Text>
          <Text
            style={[
              styles.subText,
              { color: theme.subText, fontSize: FONT.body },
            ]}
          >
            Joined {formatDate(user?.created_at)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const LearningSection = () => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.surface, borderColor: theme.border },
      ]}
    >
      <Text
        style={[
          styles.sectionTitle,
          { color: theme.text, fontSize: FONT.title },
        ]}
      >
        Learning Overview
      </Text>

      <View style={[styles.goalBox, { backgroundColor: theme.mutedSurface }]}>
        <Text
          style={[styles.goalText, { color: theme.text, fontSize: FONT.body }]}
        >
          🎯 Goal: Finish 3 quizzes weekly
        </Text>
      </View>

      <View style={{ marginTop: 10 }}>
        <Text
          style={[
            styles.subSectionTitle,
            { color: theme.text, fontSize: FONT.cardTitle },
          ]}
        >
          Subjects
        </Text>

        <View style={styles.subjectTagBox}>
          {["Algebra", "History", "Biology"].map((s) => (
            <View
              key={s}
              style={[styles.subjectTag, { backgroundColor: theme.pill }]}
            >
              <Text
                style={[
                  styles.subjectTagText,
                  { color: theme.primary, fontSize: FONT.small },
                ]}
              >
                {s}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={{ marginTop: 20 }}>
        <Text
          style={[
            styles.subSectionTitle,
            { color: theme.text, fontSize: FONT.cardTitle },
          ]}
        >
          Summary
        </Text>

        <View style={styles.summaryRow}>
          <CircleProgress
            percentage={90}
            size={100}
            strokeWidth={10}
            color={theme.primary}
          />

          <View style={styles.summaryRight}>
            <Text
              style={[
                styles.summaryNumber,
                { color: theme.text, fontSize: FONT.cardTitle },
              ]}
            >
              28
            </Text>
            <Text
              style={[
                styles.summaryLabel,
                { color: theme.subText, fontSize: FONT.small },
              ]}
            >
              Quizzes Taken
            </Text>

            <Text
              style={[
                styles.summaryNumber,
                { color: theme.text, fontSize: FONT.cardTitle, marginTop: 8 },
              ]}
            >
              7d
            </Text>
            <Text
              style={[
                styles.summaryLabel,
                { color: theme.subText, fontSize: FONT.small },
              ]}
            >
              Streak
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const SettingsSection = () => {
  const { signOut, user } = useAuth();
  const { theme, mode, setMode } = useTheme();

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

  const isEyeCareOn = mode === "eyeCare";

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.surface, borderColor: theme.border },
      ]}
    >
      <Text
        style={[
          styles.sectionTitle,
          { color: theme.text, fontSize: FONT.title },
        ]}
      >
        Settings
      </Text>

      <Link href="/progress" asChild>
        <TouchableOpacity style={styles.menuRow}>
          <View style={styles.menuLeft}>
            <Ionicons
              name="bar-chart-outline"
              size={ICON.md}
              color={theme.primary}
            />
            <Text
              style={[
                styles.menuText,
                { color: theme.text, fontSize: FONT.body },
              ]}
            >
              My Progress
            </Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={ICON.sm}
            color={theme.subText}
          />
        </TouchableOpacity>
      </Link>

      <View style={styles.menuRow}>
        <View style={styles.menuLeft}>
          <Ionicons
            name="person-outline"
            size={ICON.md}
            color={theme.primary}
          />
          <View>
            <Text
              style={[
                styles.menuText,
                { color: theme.text, fontSize: FONT.body },
              ]}
            >
              Account
            </Text>
            <Text
              style={[
                styles.accountEmail,
                { color: theme.subText, fontSize: FONT.small },
              ]}
            >
              {user?.email}
            </Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: "#d1fae5" }]}>
          <Text
            style={[
              styles.statusText,
              { color: "#065f46", fontSize: FONT.small },
            ]}
          >
            Active
          </Text>
        </View>
      </View>

      {/* Eye-care mode toggle */}
      <View style={styles.menuRow}>
        <View style={styles.menuLeft}>
          <Ionicons name="eye-outline" size={ICON.md} color={theme.primary} />
          <View>
            <Text
              style={[
                styles.menuText,
                { color: theme.text, fontSize: FONT.body },
              ]}
            >
              Eye-care mode
            </Text>
            <Text
              style={[
                styles.accountEmail,
                { color: theme.subText, fontSize: FONT.small },
              ]}
            >
              {isEyeCareOn ? "On · Eye-care theme" : "Off · Default theme"}
            </Text>
          </View>
        </View>
        <Switch
          value={isEyeCareOn}
          onValueChange={(v) => setMode(v ? "eyeCare" : "default")}
        />
      </View>

      <TouchableOpacity
        style={[styles.menuRow, { borderBottomWidth: 0 }]}
        onPress={handleLogout}
      >
        <View style={styles.menuLeft}>
          <Ionicons
            name="log-out-outline"
            size={ICON.md}
            color={theme.danger}
          />
          <Text
            style={[
              styles.menuText,
              { color: theme.danger, fontSize: FONT.body },
            ]}
          >
            Logout
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={ICON.sm} color={theme.subText} />
      </TouchableOpacity>
    </View>
  );
};

export default function ProfilePage() {
  const { theme } = useTheme();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={styles.container}
    >
      <ProfileHeaderSection />
      <LearningSection />
      <SettingsSection />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingTop: 20,
    paddingBottom: 120,
    gap: 20,
  },
  card: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
    gap: 14,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  avatar: {
    height: 70,
    width: 70,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },
  nickname: {
    fontWeight: "600",
  },
  subText: {},
  sectionTitle: {
    fontWeight: "600",
  },
  subSectionTitle: {
    fontWeight: "600",
    marginBottom: 6,
  },
  goalBox: {
    padding: 12,
    borderRadius: 10,
  },
  goalText: {},
  subjectTagBox: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  subjectTag: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  subjectTagText: {
    fontWeight: "500",
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
    fontWeight: "700",
  },
  summaryLabel: {},
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
  menuText: {},
  accountEmail: {
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontWeight: "600",
  },
});

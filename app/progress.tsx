import CircleProgress from "@/components/CircleProgress";
import { useTheme } from "@/context/theme-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

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

const ProgressPage = () => {
  const { theme } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={styles.headerContainer}>
        <Ionicons name="options" size={ICON.md} color="transparent" />
        <Text
          style={[styles.header, { color: theme.text, fontSize: FONT.title }]}
        >
          My Progress
        </Text>
        <Ionicons
          name="options"
          size={ICON.md}
          color={theme.text}
          style={styles.optionIcon}
        />
      </View>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: theme.background },
        ]}
      >
        <View
          style={[
            styles.progressContainer,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}
        >
          <Text
            style={{
              fontSize: FONT.title,
              fontWeight: "600",
              color: theme.text,
            }}
          >
            Average Score
          </Text>
          <CircleProgress
            percentage={90}
            color={theme.primary}
            size={140}
            strokeWidth={12}
          />
        </View>

        <View style={{ gap: 10 }}>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View
              style={[
                styles.statisticCard,
                {
                  backgroundColor: theme.surface,
                  borderColor: theme.border,
                  flex: 1,
                },
              ]}
            >
              <Text
                style={[
                  styles.statisticHeader,
                  { color: theme.subText, fontSize: FONT.body },
                ]}
              >
                Quizzes Taken
              </Text>
              <Text
                style={[styles.statistic, { color: theme.text, fontSize: 26 }]}
              >
                28
              </Text>
            </View>

            <View
              style={[
                styles.statisticCard,
                {
                  backgroundColor: theme.surface,
                  borderColor: theme.border,
                  flex: 1,
                },
              ]}
            >
              <Text
                style={[
                  styles.statisticHeader,
                  { color: theme.subText, fontSize: FONT.body },
                ]}
              >
                Streak
              </Text>
              <Text
                style={[styles.statistic, { color: theme.text, fontSize: 26 }]}
              >
                7d
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.statisticCard,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ]}
          >
            <Text
              style={[
                styles.statisticHeader,
                { color: theme.subText, fontSize: FONT.body },
              ]}
            >
              Achievement
            </Text>
            <Text
              style={[styles.statistic, { color: theme.text, fontSize: 26 }]}
            >
              20
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "column", gap: 10 }}>
          <Text
            style={[
              styles.subheader,
              { color: theme.text, fontSize: FONT.title },
            ]}
          >
            Progress by Topic
          </Text>

          <View
            style={[
              styles.card,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ]}
          >
            <View style={{ flexDirection: "row", gap: 10 }}>
              <View style={[styles.topicIcon, { backgroundColor: theme.pill }]}>
                <MaterialCommunityIcons
                  name="math-integral"
                  size={ICON.lg}
                  color={theme.primary}
                />
              </View>
              <View style={{ justifyContent: "center", gap: 4 }}>
                <Text
                  style={[
                    styles.cardHeader,
                    { color: theme.text, fontSize: FONT.cardTitle },
                  ]}
                >
                  Algebra
                </Text>
                <Text
                  style={[
                    styles.cardSubheader,
                    { color: theme.subText, fontSize: FONT.body },
                  ]}
                >
                  90% Mastery
                </Text>
              </View>
            </View>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: "90%", backgroundColor: theme.primary },
                ]}
              />
            </View>
          </View>

          <View
            style={[
              styles.card,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ]}
          >
            <View style={{ flexDirection: "row", gap: 10 }}>
              <View style={[styles.topicIcon, { backgroundColor: theme.pill }]}>
                <MaterialIcons
                  name="history-edu"
                  size={ICON.lg}
                  color={theme.primary}
                />
              </View>
              <View style={{ justifyContent: "center", gap: 4 }}>
                <Text
                  style={[
                    styles.cardHeader,
                    { color: theme.text, fontSize: FONT.cardTitle },
                  ]}
                >
                  History
                </Text>
                <Text
                  style={[
                    styles.cardSubheader,
                    { color: theme.subText, fontSize: FONT.body },
                  ]}
                >
                  20% Mastery
                </Text>
              </View>
            </View>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: "20%", backgroundColor: theme.primary },
                ]}
              />
            </View>
          </View>

          <View
            style={[
              styles.card,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ]}
          >
            <View style={{ flexDirection: "row", gap: 10 }}>
              <View style={[styles.topicIcon, { backgroundColor: theme.pill }]}>
                <MaterialIcons
                  name="biotech"
                  size={ICON.lg}
                  color={theme.primary}
                />
              </View>
              <View style={{ justifyContent: "center", gap: 4 }}>
                <Text
                  style={[
                    styles.cardHeader,
                    { color: theme.text, fontSize: FONT.cardTitle },
                  ]}
                >
                  Biology
                </Text>
                <Text
                  style={[
                    styles.cardSubheader,
                    { color: theme.subText, fontSize: FONT.body },
                  ]}
                >
                  67% Mastery
                </Text>
              </View>
            </View>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: "67%", backgroundColor: theme.primary },
                ]}
              />
            </View>
          </View>
        </View>

        <View style={{ gap: 10, marginTop: 10 }}>
          <Text
            style={[
              styles.subheader,
              { color: theme.text, fontSize: FONT.title },
            ]}
          >
            Recent Activity
          </Text>

          <View
            style={[
              styles.card,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ]}
          >
            <View>
              <Text
                style={[
                  styles.cardHeader,
                  { color: theme.text, fontSize: FONT.cardTitle },
                ]}
              >
                Calculus Basics
              </Text>
              <Text
                style={[
                  styles.cardSubheader,
                  { color: theme.subText, fontSize: FONT.body },
                ]}
              >
                October 28, 2025
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Text
                style={{
                  fontSize: FONT.cardTitle,
                  fontWeight: "700",
                  color: theme.primary,
                }}
              >
                95%
              </Text>
              <AntDesign name="star" size={ICON.sm} color="#feff00" />
            </View>
          </View>

          <View
            style={[
              styles.card,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ]}
          >
            <View>
              <Text
                style={[
                  styles.cardHeader,
                  { color: theme.text, fontSize: FONT.cardTitle },
                ]}
              >
                Organic Chemistry Intro
              </Text>
              <Text
                style={[
                  styles.cardSubheader,
                  { color: theme.subText, fontSize: FONT.body },
                ]}
              >
                October 28, 2025
              </Text>
            </View>
            <Text
              style={{
                fontSize: FONT.cardTitle,
                fontWeight: "700",
                color: theme.text,
              }}
            >
              67%
            </Text>
          </View>

          <View
            style={[
              styles.card,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ]}
          >
            <View>
              <Text
                style={[
                  styles.cardHeader,
                  { color: theme.text, fontSize: FONT.cardTitle },
                ]}
              >
                World War II Events
              </Text>
              <Text
                style={[
                  styles.cardSubheader,
                  { color: theme.subText, fontSize: FONT.body },
                ]}
              >
                November 21, 2025
              </Text>
            </View>
            <Text
              style={{
                fontSize: FONT.cardTitle,
                fontWeight: "700",
                color: theme.text,
              }}
            >
              81%
            </Text>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

export default ProgressPage;

const styles = StyleSheet.create({
  container: {
    gap: 24,
    paddingHorizontal: 12,
    marginTop: 20,
    paddingBottom: 40,
  },
  header: {
    textAlign: "center",
    fontWeight: "600",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  optionIcon: {
    marginRight: 5,
  },
  progressContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    padding: 24,
    borderWidth: 1,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 2,
  },
  statisticCard: {
    paddingHorizontal: 14,
    paddingVertical: 18,
    borderWidth: 1,
    borderRadius: 12,
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 2,
  },
  statisticHeader: {
    fontWeight: "500",
  },
  statistic: {
    fontWeight: "700",
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    borderWidth: 1,
    borderRadius: 12,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 2,
  },
  topicIcon: {
    padding: 6,
    borderRadius: 12,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  progressBar: {
    backgroundColor: "#e6e6e6",
    width: 120,
    height: 10,
    borderRadius: 20,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
  },
  subheader: {
    fontWeight: "700",
  },
  cardHeader: {
    fontWeight: "600",
  },
  cardSubheader: {},
});

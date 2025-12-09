/*
Happy Study Mock-Up Interface

Group HappyStudy
Authors: Mikael Ly, Minh Tam Nguyen, Xiaomei He

*/
import CategoryCard from "@/components/CategoryCard";
import { useAuth } from "@/context/auth-context";
import { useTheme } from "@/context/theme-context";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Link, useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const FONT = {
  titleXL: 28,
  title: 20,
  cardTitle: 18,
  body: 14,
  small: 12,
};

const ICON = {
  xl: 42,
  lg: 32,
  md: 24,
  sm: 20,
};

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const { theme } = useTheme();

  const displayName = user?.user_metadata?.name ?? "there";

  return (
    <ScrollView
      style={[styles.mainContainer, { backgroundColor: theme.background }]}
    >
      {/* Header */}
      <View
        style={[
          styles.headerContainer,
          { backgroundColor: theme.headerBackground },
        ]}
      >
        <View style={styles.userProfileContainer}>
          <View
            style={[styles.userProfileImage, { backgroundColor: theme.pill }]}
          >
            <Ionicons name="person" size={ICON.md} color={theme.primary} />
          </View>
          <Text
            style={[
              styles.userProfileText,
              { color: theme.headerText, fontSize: FONT.body },
            ]}
          >
            Hi, {displayName}!
          </Text>
        </View>

        <Text
          style={[
            styles.headerText,
            { color: theme.headerText, fontSize: FONT.titleXL },
          ]}
        >
          HappyStudy
        </Text>
        <Text
          style={[
            styles.subHeaderText,
            { color: theme.headerText, fontSize: FONT.body },
          ]}
        >
          Ready to continue studying?
        </Text>

        <View style={statsStyles.statsMainContainer}>
          <View
            style={[statsStyles.statsBox, { backgroundColor: theme.primary }]}
          >
            <FontAwesome name="trophy" size={ICON.lg} color={theme.accent} />
            <Text
              style={[
                statsStyles.statsMainText,
                { color: "#ffffff", fontSize: FONT.body },
              ]}
            >
              7 Days
            </Text>
            <Text
              style={[
                statsStyles.statsSubText,
                { color: "#ffffff", fontSize: FONT.small },
              ]}
            >
              Streak
            </Text>
          </View>

          <View
            style={[statsStyles.statsBox, { backgroundColor: theme.primary }]}
          >
            <Entypo name="area-graph" size={ICON.lg} color={theme.accent} />
            <Text
              style={[
                statsStyles.statsMainText,
                { color: "#ffffff", fontSize: FONT.body },
              ]}
            >
              90%
            </Text>
          </View>
        </View>

        <Link href={"/progress"}>
          <Text
            style={{
              ...styles.subHeaderText,
              color: theme.headerText,
              fontSize: FONT.body,
              textDecorationLine: "underline",
              marginTop: 4,
            }}
          >
            Wanna check your progress?
          </Text>
        </Link>
      </View>

      {/* Main Body */}
      <View
        style={[styles.bodyContainer, { backgroundColor: theme.background }]}
      >
        <Link
          href={{
            pathname: `/quizzes/quiz-input`,
          }}
          asChild
        >
          <TouchableOpacity
            style={{
              backgroundColor: theme.primary,
              paddingVertical: 10,
              borderRadius: 20,
              borderWidth: 2,
              borderColor: theme.primary,
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: FONT.cardTitle,
                color: "#ffffff",
                fontWeight: "600",
              }}
            >
              Begin Random Quiz
            </Text>
          </TouchableOpacity>
        </Link>

        <Text
          style={[
            styles.bodyHeader,
            { color: theme.text, fontSize: FONT.title, marginBottom: 8 },
          ]}
        >
          Continue Learning
        </Text>

        {/* Calculus Basics */}
        <TouchableOpacity
          style={[
            styles.bodyElement,
            {
              backgroundColor: theme.surface,
              borderColor: theme.border,
            },
          ]}
        >
          <View style={{ flexDirection: "row", gap: 10 }}>
            <MaterialCommunityIcons
              name="math-integral-box"
              size={ICON.lg}
              color="#ff0000ff"
              style={{ alignSelf: "center" }}
            />
            <View style={{ alignItems: "flex-start", gap: 4 }}>
              <Text
                style={[
                  styles.bodyElementText,
                  { color: theme.text, fontSize: FONT.cardTitle },
                ]}
              >
                Calculus Basics
              </Text>
              <Text
                style={{
                  paddingLeft: 4,
                  color: theme.subText,
                  fontSize: FONT.body,
                }}
              >
                19/20 Questions
              </Text>
              <View style={[styles.progressBar, { marginLeft: 4 }]}>
                <View
                  style={{
                    ...styles.progressFill,
                    backgroundColor: "#ff0000ff",
                    width: "95%",
                  }}
                />
              </View>
            </View>
          </View>
          <Entypo
            name="chevron-right"
            size={ICON.sm}
            color={theme.subText}
            style={{ alignSelf: "center" }}
          />
        </TouchableOpacity>

        {/* History */}
        <TouchableOpacity
          style={[
            styles.bodyElement,
            {
              backgroundColor: theme.surface,
              borderColor: theme.border,
            },
          ]}
        >
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Entypo
              name="globe"
              size={ICON.lg}
              color={theme.primary}
              style={{ alignSelf: "center" }}
            />
            <View style={{ alignItems: "flex-start", gap: 4 }}>
              <Text
                style={[
                  styles.bodyElementText,
                  { color: theme.text, fontSize: FONT.cardTitle },
                ]}
              >
                History
              </Text>
              <Text
                style={{
                  paddingLeft: 4,
                  color: theme.subText,
                  fontSize: FONT.body,
                }}
              >
                18/20 Questions
              </Text>
              <View style={[styles.progressBar, { marginLeft: 4 }]}>
                <View
                  style={{
                    ...styles.progressFill,
                    backgroundColor: theme.primary,
                    width: "90%",
                  }}
                />
              </View>
            </View>
          </View>
          <Entypo
            name="chevron-right"
            size={ICON.sm}
            color={theme.subText}
            style={{ alignSelf: "center" }}
          />
        </TouchableOpacity>

        <Text
          style={[
            styles.bodyHeader,
            { color: theme.text, fontSize: FONT.title, marginTop: 16 },
          ]}
        >
          Explore Categories
        </Text>

        <View style={categories.categoriesRow}>
          <CategoryCard topic="Science" numberQuizzes="20+" />
          <CategoryCard topic="History" numberQuizzes="20+" />
        </View>
        <View style={categories.categoriesRow}>
          <CategoryCard
            topic="Elden Theory"
            numberQuizzes="15"
            onPress={() =>
              router.push({
                pathname: `/quizzes/[quizId]`,
                params: { quizId: "d051862d-2250-4997-9de9-ce796655621d" },
              })
            }
          />
          <CategoryCard topic="Ring Theory" numberQuizzes="10" />
        </View>
        <View style={categories.categoriesRow}>
          <CategoryCard topic="Biology" numberQuizzes="20+" />
          <CategoryCard topic="Trivia" numberQuizzes="20+" />
        </View>
        <View style={categories.categoriesRow}>
          <CategoryCard topic="Calculus" numberQuizzes="20+" />
          <CategoryCard topic="Computer Science" numberQuizzes="20" />
        </View>
      </View>

      <View style={{ paddingBottom: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerContainer: {
    alignItems: "center",
    padding: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    gap: 8,
  },
  headerText: {
    fontWeight: "700",
    textAlign: "center",
  },
  subHeaderText: {
    textAlign: "center",
  },
  userProfileContainer: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  userProfileImage: {
    height: 50,
    width: 50,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },
  userProfileText: {
    fontWeight: "500",
  },
  bodyContainer: {
    margin: 10,
    flexGrow: 1,
    gap: 10,
  },
  bodyHeader: {
    fontWeight: "600",
  },
  bodyElement: {
    padding: 12,
    borderRadius: 16,
    justifyContent: "space-between",
    flexDirection: "row",
    borderWidth: 1,
  },
  bodyElementText: {
    fontWeight: "600",
  },
  progressBar: {
    backgroundColor: "#e6e6e6",
    width: 220,
    height: 10,
    borderRadius: 20,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
  },
});

const statsStyles = StyleSheet.create({
  statsMainContainer: {
    flexDirection: "row",
    gap: 10,
    paddingTop: 10,
    paddingBottom: 6,
    justifyContent: "space-evenly",
    width: "100%",
  },
  statsBox: {
    flex: 1,
    borderRadius: 16,
    padding: 14,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  statsMainText: {
    textAlign: "center",
    fontWeight: "600",
  },
  statsSubText: {
    textAlign: "center",
  },
});

const categories = StyleSheet.create({
  categoriesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
});

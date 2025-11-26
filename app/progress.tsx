import CircleProgress from "@/components/CircleProgress";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const ProgressPage = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.headerContainer}>
        {/* Invisible placeholder icon (balances spacing) */}
        <Ionicons name="options" size={24} color="transparent" />
        <Text style={styles.header}>My Progress</Text>
        <Ionicons
          name="options"
          size={24}
          color="black"
          style={styles.optionIcon}
        />
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Progress chart  */}
        <View style={styles.progressContainer}>
          <Text style={{ fontSize: 20, fontWeight: "500" }}>Average Score</Text>
          <CircleProgress
            percentage={90}
            color="#543cda"
            size={140}
            strokeWidth={12}
          />
        </View>

        {/* Statistics  */}
        <View style={{ gap: 10 }}>
          <View style={{ flexDirection: "row", gap: 10 }}>
            {/* Quizzes Taken */}
            <View style={{ ...styles.statisticCard, flex: 1 }}>
              <Text style={styles.statisticHeader}>Quizzes Taken</Text>
              <Text style={styles.statistic}>28</Text>
            </View>
            {/* Streak */}
            <View style={{ ...styles.statisticCard, flex: 1 }}>
              <Text style={styles.statisticHeader}>Streak</Text>
              <Text style={styles.statistic}>7d</Text>
            </View>
          </View>
          {/* Achievement */}
          <View style={styles.statisticCard}>
            <Text style={styles.statisticHeader}>Achievement</Text>
            <Text style={styles.statistic}>20</Text>
          </View>
        </View>

        {/* Progress by topic */}
        <View style={{ flexDirection: "column", gap: 10 }}>
          <Text style={styles.subheader}>Progress by Topic</Text>
          {/* Algebra  */}
          <View style={styles.card}>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <View style={styles.topicIcon}>
                <MaterialCommunityIcons
                  name="math-integral"
                  size={32}
                  color="#543cda"
                />
              </View>
              <View style={{ justifyContent: "center", gap: 5 }}>
                <Text style={styles.cardHeader}>Algebra</Text>
                <Text style={styles.cardSubheader}>90% Mastery</Text>
              </View>
            </View>
            <View style={styles.progressBar}>
              <View style={{ ...styles.progressFill, width: "90%" }}></View>
            </View>
          </View>
          {/* History   */}
          <View style={styles.card}>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <View style={styles.topicIcon}>
                <MaterialIcons name="history-edu" size={32} color="#543cda" />
              </View>
              <View style={{ justifyContent: "center", gap: 5 }}>
                <Text style={styles.cardHeader}>History</Text>
                <Text style={styles.cardSubheader}>20% Mastery</Text>
              </View>
            </View>
            <View style={styles.progressBar}>
              <View style={{ ...styles.progressFill, width: "20%" }}></View>
            </View>
          </View>
          {/* Biology  */}
          <View style={styles.card}>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <View style={styles.topicIcon}>
                <MaterialIcons name="biotech" size={32} color="#543cda" />
              </View>
              <View style={{ justifyContent: "center", gap: 5 }}>
                <Text style={styles.cardHeader}>Biology</Text>
                <Text style={styles.cardSubheader}>67% Mastery</Text>
              </View>
            </View>
            <View style={styles.progressBar}>
              <View style={{ ...styles.progressFill, width: "67%" }}></View>
            </View>
          </View>
        </View>

        {/* Recent Activity  */}
        <View style={{gap: 10}}>
          <Text style={styles.subheader}>Recent Activity</Text>
          {/* Calculus Basics */}
          <View style={styles.card}>
            <View>
              <Text style={styles.cardHeader}>Calculus Basics</Text>
              <Text style={styles.cardSubheader}>October 28, 2025</Text>
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
                style={{ fontSize: 20, fontWeight: "700", color: "#543cda" }}
              >
                95%
              </Text>
              <AntDesign name="star" size={20} color="#feff00" />
            </View>
          </View>
          {/* Organic Chemistry Intro */}
          <View style={styles.card}>
            <View>
              <Text style={styles.cardHeader}>Calculus Basics</Text>
              <Text style={styles.cardSubheader}>October 28, 2025</Text>
            </View>
            <Text style={{ fontSize: 20, fontWeight: "700"}}>
              67%
            </Text>
          </View>
          {/* World War II Events */}
          <View style={styles.card}>
            <View>
              <Text style={styles.cardHeader}>World War II Events</Text>
              <Text style={styles.cardSubheader}>November 21, 2025</Text>
            </View>
            <Text style={{ fontSize: 20, fontWeight: "700"}}>
              81%
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProgressPage;

const styles = StyleSheet.create({
  container: {
    gap: 30,
    paddingHorizontal: 10,
    marginTop: 30,
    backgroundColor: 'white',
    paddingBottom: 100
  },
  header: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
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
    borderColor: "#e5e7eb",
    backgroundColor: "#ffffff",
    borderRadius: 12,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2, // Android shadow
  },
  statisticCard: {
    padding: 12,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2, // Android shadow
  },
  statisticHeader: {
    fontSize: 16,
    fontWeight: "500",
    color: "gray",
  },
  statistic: {
    fontSize: 32,
    fontWeight: "700",
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2, // Android shadow
  },
  topicIcon: {
    backgroundColor: "#d8e0ff",
    padding: 5,
    borderRadius: 10,
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
    zIndex: 0,
  },
  progressFill: {
    backgroundColor: "#543cda",
    height: "100%",
  },
  subheader: {
    fontSize: 20,
    fontWeight: "700",
  },
  cardHeader: {
    fontSize: 20,
    fontWeight: "600",
  },
  cardSubheader: {
    color: "gray",
  },
});

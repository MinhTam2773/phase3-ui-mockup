/*
Happy Study Mock-Up Interface

Group HappyStudy
Authors: Mikael Ly, Minh Tam Nguyen, Xiaomei He

*/

import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Home() {
  return (
    <ScrollView style={styles.mainContainer}>
      {/* Header */}
      <View style={styles.headerContainer}>
        {/* Profile Pic + Name */}
        <View style={styles.userProfileContainer}>
          {/* Profile Pic */}
          <View>
            <AntDesign name="user" size={24} color="black"/>
          </View>
          {/* Greeting + Name */}
          <Text style={styles.userProfileText}> Hi, User! </Text>
        </View>

        {/* Header Text/Title */}
        <Text style={styles.headerText}>
          HappyStudy
        </Text>
        <Text style={styles.subHeaderText}>
          Ready to continue studying?
        </Text>
        {/* Stats Container */}
        <View style={statsStyles.statsMainContainer}>
          {/* Streak */}
          <View style={statsStyles.statsBox}>
            <FontAwesome name="trophy" size={40} color="#ffd900ff" />
            <Text style={statsStyles.statsMainText}> 7 Days </Text>
            <Text style={statsStyles.statsSubText}> Streak </Text>

          </View>

          {/* Average Score */}
          <View style={statsStyles.statsBox}>
            <Entypo name="area-graph" size={40} color="#ffd900ff" />
            <Text style={statsStyles.statsMainText}> 10.3% </Text>

          </View>

        </View>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {

  }, 
  headerContainer: {
    alignItems: 'center',
    backgroundColor: "#543cdbff",
    padding: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  }, 
  headerText: {
    fontWeight: "bold",
    fontSize: 35,
    textAlign: 'center',
    color: "#ffff"
  },
  subHeaderText: {
    fontSize: 15,
    textAlign: 'center',
    color: "#ffff"

  },
  userProfileContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start'

  },
  userProfileText: {
    color: "#ffff",
    fontSize: 18

  }
  

})

const statsStyles = StyleSheet.create({
  statsMainContainer: {
    flexDirection: 'row',
    gap: 10,
    padding: 10,
    justifyContent: 'space-evenly',
    width: '100%'

  },
  statsBox: {
    flex: 1,
    backgroundColor: "#715bf0ff",
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  statsMainText: {
    textAlign: 'center',
    color: "#ffffffff",
    fontWeight: 'bold'

  },
  statsSubText: {
    textAlign: 'center',
    color: "#ffffffff",
    fontWeight: 'thin'
  }
})
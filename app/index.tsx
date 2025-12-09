/*
Happy Study Mock-Up Interface

Group HappyStudy
Authors: Mikael Ly, Minh Tam Nguyen, Xiaomei He

*/

import CategoryCard from '@/components/CategoryCard';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Link, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  
  const router = useRouter();


  return (
    <ScrollView style={styles.mainContainer}>
      {/* Header */}
      <View style={styles.headerContainer}>
        {/* Profile Pic + Name */}
        <View style={styles.userProfileContainer}>
          {/* Profile Pic */}
          <View style={styles.userProfileImage}>
            <Ionicons name="person" size={24} color="#543cda" />
          </View>
          {/* Greeting + Name */}
          <Text style={styles.userProfileText}> Hi, Alex! </Text>
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
            <Text style={statsStyles.statsMainText}> 90% </Text>

          </View>
        </View>
          <Link href={'/progress'}> 
            <Text style={{...styles.subHeaderText, textDecorationLine:'underline'}}>Wanna check your progress?</Text>
          </Link>
      </View>

      {/* Main Body */}
      <View style={styles.bodyContainer}>
        {/* Begin Random Quiz button (Defaults to ID 1 for now, Elden Theory)*/}
        <Link href={{pathname: `/quizzes/[quizId]`, params: { quizId: String(1)}}} asChild> 
          <TouchableOpacity style={{backgroundColor: "#715bf0ff", padding: 5, borderRadius: 20, borderWidth: 2, borderColor: "#543cda"}}>
            <Text style={{textAlign: 'center', fontSize: 20, color: "#ffff"}}>Begin Random Quiz</Text>
          </TouchableOpacity>
        </Link>

        {/* Calculus Basics */}
        <Text style={styles.bodyHeader}> Continue Learning </Text>
        <TouchableOpacity style={styles.bodyElement}>
          <View style={{flexDirection: 'row'}}>
            {/* Topic Icon */}
            <MaterialCommunityIcons name="math-integral-box" size={40} color="#ff0000ff" style={{alignSelf: 'center'}}/>
            <View style={{alignItems:'flex-start'}}>
              {/* Topic Header */}
              <Text style={styles.bodyElementText}> Calculus Basics </Text>
              {/* Questions Done */}
              <Text style={{paddingLeft: 10}}>19/20 Questions</Text>
              {/* Progress Bar */}
              <View style={{...styles.progressBar, marginLeft: 10}}>
                <View style={{...styles.progressFill, backgroundColor: '#ff0000ff', width: '95%'}}></View>
              </View>
            </View>
          </View>
          <Entypo name="chevron-right" size={15} color="black" style={{alignSelf: 'center'}}/>
        </TouchableOpacity>

        {/* History */}
        <TouchableOpacity style={styles.bodyElement}>
          <View style={{flexDirection: 'row'}}>
            {/* Topic Icon */}
            <Entypo name="globe" size={40} color="#543cda" style={{alignSelf: 'center'}}/>
            <View style={{alignItems:'flex-start'}}>
              {/* Topic Header */}
              <Text style={styles.bodyElementText}> History </Text>
              {/* Questions Done */}
              <Text style={{paddingLeft: 10}}>18/20 Questions</Text>
              {/* Progress Bar */}
              <View style={{...styles.progressBar, marginLeft: 10}}>
                <View style={{...styles.progressFill, backgroundColor: '#543cda', width: '90%'}}></View>
              </View>
            </View>
          </View>
          <Entypo name="chevron-right" size={15} color="black" style={{alignSelf: 'center'}}/>
        </TouchableOpacity>

        {/* Categories Section */}
        <Text style={styles.bodyHeader}> Explore Categories </Text>
        <View style={categories.categoriesRow}>
          <CategoryCard topic="Science" numberQuizzes='20+'/>
          <CategoryCard topic="History" numberQuizzes='20+'/>
        </View>
        <View style={categories.categoriesRow}>
            <CategoryCard topic="Elden Theory" numberQuizzes='15' onPress={()=>
               router.push({pathname: `/quizzes/[quizId]`, params: { quizId: String(1)}})}/>
          <CategoryCard topic="Ring Theory" numberQuizzes='10'/>
          
        </View>
        <View style={categories.categoriesRow}>
          <CategoryCard topic="Biology" numberQuizzes='20+'/>
          <CategoryCard topic="Trivia" numberQuizzes='20+'/>
        </View>
        <View style={categories.categoriesRow}>
          <CategoryCard topic="Calculus" numberQuizzes='20+'/>
          <CategoryCard topic="Computer Science" numberQuizzes='20'/>
        </View>

      </View>
      
      {/* Padding for the bottom */}
        <View style={{paddingBottom: 100}}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white'
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5

  },
  userProfileImage: {
    height: 50,
    width: 50,
    borderRadius: 999,
    backgroundColor: "#d8e0ff",
    justifyContent: "center",
    alignItems: "center",

  },
  userProfileText: {
    color: "#ffff",
    fontSize: 16

  },
  bodyContainer: {
    margin: 10,
    flexGrow: 1,
    gap: 5,
    backgroundColor: 'white'
  },
  bodyHeader: {
    fontSize: 16,

  },
  bodyElement: {
    backgroundColor: "#ffffffff",
    padding: 10,
    borderRadius: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  bodyElementText: {
    fontWeight: 'bold',
    fontSize: 18,
    padding: 5,
    paddingBottom: 0
  },
  progressBar: {
    backgroundColor: "#e6e6e6",
    width: 220,
    height: 10,
    borderRadius: 20,
    overflow: "hidden",
    zIndex: 0,
  },
  progressFill: {
    height: "100%",
  },
  

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

const categories = StyleSheet.create({
  categoriesRow: {
    flexDirection: 'row', 
    justifyContent:'space-between'
  },
})
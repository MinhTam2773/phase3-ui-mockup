import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
    topic: string
    numberQuizzes: string,
    onPress?: () => void;
}

const CategoryCard = ({topic, numberQuizzes, onPress}: Props) => {

  return (
    <TouchableOpacity style={categories.categoriesCard} onPress={onPress}>
        <View style={{alignContent: 'center'}}>
            <Text style={categories.categoriesHeader}>{topic}</Text>
            <Text style={categories.categoriesSubHeader}>{numberQuizzes} quizzes</Text>
        </View>
    </TouchableOpacity>
  )
}

export default CategoryCard

const categories = StyleSheet.create({
  categoriesContainer: {
    flexDirection: 'row', 
    justifyContent:'space-between'
  },
  categoriesCard: {
    backgroundColor: "#ffffffff",
    padding: 15,
    borderRadius: 20,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: "#e5e7eb",
    flex: 1,
    justifyContent: 'center',
  },
  categoriesHeader: {
    textAlign:'center', 
    fontSize: 18,
    fontWeight: 'semibold'
  }, 
  categoriesSubHeader: {
    textAlign:'center', 
    fontSize: 12
  }
})
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ProfilePage = () => {
    const {userId} = useLocalSearchParams();
  return (
    <View>
      <Text>ProfilePage, user id: {userId}</Text>
    </View>
  )
}

export default ProfilePage

const styles = StyleSheet.create({})
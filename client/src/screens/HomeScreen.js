import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/homeStyles';

const HomeScreen = ({ route }) => {
  const { role } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome, {role}!</Text>
    </View>
  );
};

export default HomeScreen;

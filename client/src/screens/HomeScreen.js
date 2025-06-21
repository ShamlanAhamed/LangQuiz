import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeScreen = ({ route }) => {
  const { role } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome, {role}!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 22 },
});

export default HomeScreen;

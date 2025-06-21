import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; //not in app navigator changed to app.js
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

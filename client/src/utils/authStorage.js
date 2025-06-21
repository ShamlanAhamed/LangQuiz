import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (err) {
    console.error('Error storing token', err);
  }
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem('token');
  } catch (err) {
    return null;
  }
};

export const logout = async () => {
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('user');
};

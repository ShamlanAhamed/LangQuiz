import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center' },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 6 },
  error: { color: 'red', marginBottom: 10 },
  button: { backgroundColor: '#007bff', padding: 12, borderRadius: 6, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

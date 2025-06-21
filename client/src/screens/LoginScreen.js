import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import RolePicker from '../components/RolePicker';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(4, 'Too Short!').required('Required'),
  role: Yup.string().required('Select a role'),
});

const LoginScreen = ({ navigation }) => {
  const [error, setError] = useState('');

  const handleLogin = (values) => {
    const { email, password, role } = values;

    // Mock validation (replace with API call)
    if (email === 'admin@test.com' && password === '1234' && role === 'Admin') {
      navigation.navigate('Home', { role });
    } else if (role === 'Staff' || role === 'User') {
      navigation.navigate('Home', { role });
    } else {
      setError('Invalid credentials or role');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Role-Based Login</Text>
      <Formik
        initialValues={{ email: '', password: '', role: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
            />
            {errors.email && touched.email && <Text style={styles.error}>{errors.email}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {errors.password && touched.password && <Text style={styles.error}>{errors.password}</Text>}

            <RolePicker selectedRole={values.role} onRoleChange={(role) => setFieldValue('role', role)} />
            {errors.role && touched.role && <Text style={styles.error}>{errors.role}</Text>}

            {error && <Text style={styles.error}>{error}</Text>}

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center' },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 6 },
  error: { color: 'red', marginBottom: 10 },
  button: { backgroundColor: '#007bff', padding: 12, borderRadius: 6, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default LoginScreen;

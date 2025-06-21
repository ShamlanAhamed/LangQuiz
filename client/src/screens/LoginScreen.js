import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import RolePicker from '../components/RolePicker';
import styles from '../styles/loginStyles';
import API from '../api/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(4, 'Too Short!').required('Required'),
  role: Yup.string().required('Select a role'),
});

const LoginScreen = () => {
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const handleLogin = async (values) => {
    try {
      const res = await API.post('/auth/login', {
        email: values.email,
        password: values.password,
      });

      const { token, user } = res.data;

      // Role validation match
      if (user.role !== values.role.toLowerCase()) {
        setError('Selected role does not match account role.');
        return;
      }

      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      navigation.navigate('Home', { role: user.role });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || 'Login failed');
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

export default LoginScreen;

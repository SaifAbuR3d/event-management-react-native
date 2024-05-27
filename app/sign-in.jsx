import { useEffect, useState } from 'react';
import { Stack, router } from 'expo-router';
import LoginScreen from "react-native-login-screen";
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

import { API_URL } from '@env'
const apiUrl = API_URL;

export default function SignIn() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    axios.post(`${apiUrl}/api/auth/login`, {
      email,
      password
    }).then((response) => {
      if (response.data.token) {
        const token = response.data.token;
        SecureStore.setItemAsync('token', token);
        router.replace({ pathname: '/welcome', params: { token } });
      }
    }).catch((error) => {
      alert('An error occurred. Please try again.');
      setErrorMessage(error.response.data.detail);
    });
  };

  useEffect(() => {
    const checkToken = async () => {
      const token = await SecureStore.getItemAsync('token');
      if (token) {
        router.replace({ pathname: '/welcome', params: { token } });
      }
    }

    checkToken();
  }, []);


  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false
        }}
      />
      <LoginScreen
        onLoginPress={handleLogin}
        loginButtonText={'Continue'}
        onEmailChange={setEmail}
        disableSignup
        disableSocialButtons
        disableDivider
        onPasswordChange={setPassword}
      />
    </>
  );
};

// authcheck.tsx
import React, { useContext, useEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { AuthContext } from './authcontext';
import { useNavigation } from '@react-navigation/native';

export default function AuthCheck ({ children }){
  const { user, loading } = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    if (!loading && !user) {
      return () => clearTimeout(timer);
      navigation.navigate('login'); // Redirect to login if not authenticated
    }
    const timer = setTimeout(() => {
      navigation.navigate('home');

      // router.replace("/home")
    }, 3000);

     // Cleanup the timer
  }, [loading, user]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#46c67c" />
        <Text>Hello</Text>
      </View>
    );
  }

  return children;
};

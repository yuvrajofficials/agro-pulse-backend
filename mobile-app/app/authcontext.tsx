// authcontext.tsx
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('authToken');
      const expiry = await AsyncStorage.getItem('authExpiration');

      if (token && expiry && Date.now() < parseInt(expiry)) {
        setUser(token);
      } else {
        handleLogout();
      }
      setLoading(false);
      router.push("/home");
    };

    checkLoginStatus();
  }, []);


  const handleLogout = async () => {
    await AsyncStorage.clear();
    setUser("");
  };

  return (
    <AuthContext.Provider value={{ user, loading, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

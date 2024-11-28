import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { auth } from "../firebase.config"; // Adjust this import as per your setup
import { useNavigation } from "@react-navigation/native";
import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "expo-router";
import AuthCheck from "./authcheck";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const router = useRouter()
  // Handle Login with Email/Password
  const handleEmailLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();
      const expirationTime = Date.now() + 3600 * 1000; // 1-hour token validity

      // Store token and expiration time in AsyncStorage
      await AsyncStorage.setItem("authToken", token);
      await AsyncStorage.setItem("authExpiration", expirationTime.toString());
      const tokenget = await AsyncStorage.getItem("authToken");
      const expiry = await AsyncStorage.getItem("authExpiration");

      Alert.alert("Login Successful", "Welcome back!");
     console.log({tokenget,expiry})
      router.push('/home'); // Adjust to your app's home screen route
    } catch (error) {
      Alert.alert("Login Error", error.message);
    }
  };

  // const handleEmailLogin = async () => {
  //     try {
  //       const userCredential = await signInWithEmailAndPassword(auth, email, password);
  //       const token = await userCredential.user.getIdToken();
  //       const expirationTime = Date.now() + 3600 * 1000; // Token valid for 1 hour

  //       await handleLogin(token, expirationTime);
  //       navigation.navigate('home');
  //     } catch (error) {
  //       Alert.alert('Login Error', error.message);
  //     }
  //   };
  //       // Handle Social Login
  const handleSocialLogin = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      const expirationTime = Date.now() + 3600 * 1000;

      await AsyncStorage.setItem("authToken", token);
      await AsyncStorage.setItem("authExpiration", expirationTime.toString());

      Alert.alert("Login Successful", "Welcome back!");
      router.replace("/home");
    } catch (error) {
      Alert.alert("Social Login Error", error.message);
    }
  };

  // Auto-Logout on Token Expiration
  useEffect(() => {
    const interval = setInterval(async () => {
      const expiration = await AsyncStorage.getItem("authExpiration");
      if (expiration && Date.now() > parseInt(expiration)) {
        handleLogout();
      }
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, []);

  // Handle Logout
  const handleLogout = async () => {
    await auth.signOut();
    await AsyncStorage.removeItem("authToken");
    await AsyncStorage.removeItem("authExpiration");
    Alert.alert("Session Expired", "Please log in again.");
    navigation.navigate("login");
  };

  // Listen for User Authentication State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        handleLogout();
      }
    });

    return () => unsubscribe();
  }, []);

  return (
  
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Image
          style={styles.logo}
          source={require("../assets/images/App_Logo.png")}
        />
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Welcome to AgroPulse</Text>

        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          style={styles.input}
          autoCapitalize="none"
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity onPress={handleEmailLogin}>
          <LinearGradient colors={["#00B685", "#46c67c"]} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text
          style={styles.registerText}
          onPress={() => navigation.navigate("register")}
        >
          New to AgroPulse? Create an account!
        </Text>
        <View style={styles.moreSigninContainer}>
          <View style={styles.moreSigninItem}></View>
          <Text style={styles.dividingLetter}>Sign In Options </Text>
          <View style={styles.moreSigninItem}></View>
        </View>

        <View style={styles.socialIcons}>
          <TouchableOpacity
            onPress={() => handleSocialLogin(new GoogleAuthProvider())}
            style={styles.socialButton}
          >
            <AntDesign name="google" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSocialLogin(new GithubAuthProvider())}
            style={styles.socialButton}
          >
            <AntDesign name="github" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSocialLogin(new FacebookAuthProvider())}
            style={styles.socialButton}
          >
            <Ionicons name="logo-facebook" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 20,
    justifyContent: "center",
  },
  scrollContainer: {
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 40,
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
    color: "#333",
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    color: "#46c67c",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 40,
    textAlign: "center",
  },
  input: {
    height: 60,
    borderColor: "grey",
    fontSize: 17,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    width: "100%",
    backgroundColor: "#f6f7f9",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    marginVertical: 15,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  registerText: {
    textAlign: "center",
    fontSize: 14,
    color: "#46c67c",
    marginTop: 20,
  },
  dividingLetter: {
    textAlign: "center",
    fontSize: 18,
    color: "#aaa",
    marginVertical: 20,
    marginHorizontal: 5,
  },
  moreSigninContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  moreSigninItem: {
    width: "100%",
    marginHorizontal: 5,
    height: 1,
    backgroundColor: "grey",
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
  socialButton: {
    backgroundColor: "#333",
    borderRadius: 25,
    padding: 12,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

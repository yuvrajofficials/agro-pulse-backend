import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, Animated } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient"; // Import for gradient background
import { AuthContext } from "./authcontext";

export default function SplashScreen() {
  const router = useRouter();

  // Animations
  const fadeAnim = new Animated.Value(0); // Initial opacity for fade-in effect
  const scaleAnim = new Animated.Value(0.5); // Initial scale for logo animation

  useEffect(() => {
    // Fade-in text animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    // Logo scaling animation
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    // Navigate to the home screen after 3 seconds
    
  }, [router, fadeAnim, scaleAnim]);

  return (
    <LinearGradient
      colors={["#00B685", "#46c67c"]} // Green gradient
      // colors={["#46c67c", "#2e9d62"]} // Green gradient
      //  colors={["#fff", "#fff"]} // Green gradient
      style={styles.container}
    >
      {/* Animated Logo */}
      <Animated.Image
        source={require("../assets/images/App_Logo_bg.png")} // Replace with your own logo
        style={[styles.image, { transform: [{ scale: scaleAnim }] }]}
      />

      {/* Animated Text */}
      <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
        Welcome to AgroPulse
      </Animated.Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 15, // Rounded corners for the logo
    resizeMode: "contain", // Maintain aspect ratio
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    fontFamily: "Arial", // Default font; use custom fonts if necessary
    marginTop: 10,
  },
});

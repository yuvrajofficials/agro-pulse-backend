import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import NavigationTab from './Utils/NavigationTab';
import { useRouter } from 'expo-router';
import disease from "../assets/JSONs/wheat-disease.json"
import { AuthContext } from './authcontext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const diseases = disease.wheatDiseases
// const diseases = [
//   {
//     id: 1,
//     name: 'Powdery Mildew',
//     description: 'A fungal disease causing white powdery spots on leaves.',
//     image: 'https://example.com/path/to/powdery-mildew.jpg',
//   },
//   {
//     id: 2,
//     name: 'Rust',
//     description: 'An orange-brown fungal infection that affects leaves and stems.',
//     image: 'https://example.com/path/to/rust.jpg',
//   },
//   {
//     id: 3,
//     name: 'Leaf Blotch',
//     description: 'A disease causing irregular brown spots on leaves.',
//     image: 'https://example.com/path/to/leaf-blotch.jpg',
//   },
// ];

export default function WheatDiseaseLandingPage() {
  console.log("came at home")
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weatherEmoji, setWeatherEmoji] = useState("🌡️");


  const router = useRouter();

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     router.push('/splashscreen'); // Navigate to home screen after splash
  //   }, 0); // Display splash screen for 3 seconds

  //   return () => clearTimeout(timer); // Cleanup the timer
  // }, [router]);


  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      const location = await Location.getCurrentPositionAsync({});
      fetchWeatherData(location.coords.latitude, location.coords.longitude);
    } else {
      setLoading(false);
    }
  };

  const fetchWeatherData = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&current_weather=true`
      );
      const temperature = response.data.current_weather.temperature;
      setWeather(temperature);
      setWeatherEmoji(getWeatherEmoji(temperature));
      setLoading(false);
    } catch (error) {
      console.error('Weather data fetch error:', error);
      setWeather(null);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.clear();
    router.replace("/login")
  };
  const getWeatherEmoji = (temperature) => {
    if (temperature <= 10) return "❄️";
    if (temperature >= 30) return "🔥";
    return "🌤️";
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={['#00B685', '#46c67c']} style={styles.headerContainer}>
          <Text style={styles.logoTitle}>AGROPULSE</Text>
          <Text style={styles.headerDescription}>
            Empowering Farmers with AI-Driven Wheat Disease Detection
          </Text>
          <View style={styles.weatherContainer}>
            {loading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : weather !== null ? (
              <Text style={styles.weatherText}>{weather}°C {weatherEmoji}</Text>
            ) : (
              <Text style={styles.weatherText}>Weather data unavailable</Text>
            )}
          </View>
        </LinearGradient>

        <View style={styles.aboutContainer}>
          <Text style={styles.aboutTitle}>About AgroPulse</Text>
          <Text style={styles.aboutDescription}>
            AgroPulse is an intuitive mobile app designed to empower users in identifying wheat diseases quickly and accurately using AI and machine learning.
          </Text>
        </View>

        // In a protected screen or a logout button

        <View style={styles.containerView}>
      <View style={styles.headerView}>
        <Text style={styles.sectionTitle}>Common Wheat Diseases</Text>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.diseaseScroll}>
          {diseases.map((disease) => (
            <View key={disease.id} style={styles.diseaseCard}>
              <Image source={{ uri: disease.image }} style={styles.diseaseImage} />
              <View style={styles.diseaseInfo}>
                <Text style={styles.diseaseName}>{disease.name}</Text>
                <Text style={styles.diseaseDescription}>{disease.description}</Text>
                <TouchableOpacity
                  style={styles.learnMoreButton}
                  onPress={() => router.push(`/learnmore/${disease.id}`)}
                >
                  <Text style={styles.learnMoreButtonText}>Learn More ? </Text>
                </TouchableOpacity>


              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.featuresContainer}>
          <Text style={styles.sectionTitle}>Key Features</Text>
          <View style={styles.feature}>
            <Text style={styles.featureTitle}>🌱 AI-Powered Detection</Text>
            <Text style={styles.featureDescription}>
              Identify diseases with high accuracy by analyzing images of your wheat crops.
            </Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureTitle}>📊 Disease Tracking</Text>
            <Text style={styles.featureDescription}>
              Monitor and manage the health of your crops over time.
            </Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureTitle}>🌍 Weather Integration</Text>
            <Text style={styles.featureDescription}>
              Stay informed with real-time weather data specific to your location.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Navbar at the bottom */}
      <View style={styles.navbarComp}>
        <NavigationTab />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 20,
  },
  scrollContainer: {
    paddingBottom: 80, // Add space at the bottom to avoid content overlapping with navbar
  },
  headerContainer: {
    padding: 25,
    borderRadius: 15,
    marginBottom: 30,
    alignItems: 'center',
  },
  logoTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  containerView: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  headerView: {
    flexDirection: "row", // Arrange items in a row
    justifyContent: "space-between", // Space between the items
    alignItems: "center", // Align items vertically centered
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  logoutBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#46c67c",
    borderRadius: 8,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  headerDescription: {
    fontSize: 16,
    color: '#DFF5EC',
    textAlign: 'center',
  },
  weatherContainer: {
    marginTop: 10,
  },
  weatherText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '600',
  },
  aboutContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  aboutTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
  },
  aboutDescription: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  diseaseScroll: {
    marginBottom: 25,
    padding: 10,
  },
  diseaseCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    width: 220,
    marginRight: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  diseaseImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  diseaseName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  learnMoreButton: {
    backgroundColor: '#46c67c',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  learnMoreButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  featuresContainer: {
    marginBottom: 25,
  },
  feature: {
    marginBottom: 15,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#46c67c',
  },
  navbarComp: {
    padding: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10, // Ensures navbar stays on top of other content
  },
});

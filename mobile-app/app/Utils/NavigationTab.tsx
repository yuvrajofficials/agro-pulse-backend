import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MatIcon from "react-native-vector-icons/MaterialCommunityIcons"
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function NavigationTab() {
  return (
    <LinearGradient colors={['#00B685', '#46c67c']} style={styles.container}>
      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <Link href="/home" asChild>
          <TouchableOpacity style={styles.navButton}>
            <AntIcon name="home" size={24} color="#fff" />
            <Text style={styles.navLabel}>Home</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/capture" asChild>
          <TouchableOpacity style={styles.navButton}>
            <AntIcon name="search1" size={24} color="#fff" />
            <Text style={styles.navLabel}>Detect</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/chatassistant" asChild>
          <TouchableOpacity style={styles.navButton}>
            <MatIcon name="assistant" size={24} color="#fff" />
            <Text style={styles.navLabel}>Assistant</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    // Ensure the gradient covers the bottom navigation and any padding/margin is applied correctly.
    paddingVertical: 10,
    marginTop: 20,
    borderRadius: 10,
    elevation: 5,
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 15,
    // Add some padding or margins if needed to ensure the layout is spaced correctly.
  },
  navButton: {
    alignItems: 'center',
  },
  navLabel: {
    color: '#fff',
    fontSize: 12,
    marginTop: 3,
    fontFamily: 'Poppins',
  },
});

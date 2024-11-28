import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function LearnMore({ route }) {
  // Safely access route and params
  const disease = route?.params?.disease;

  if (!disease) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No disease information provided.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: disease.image }} style={styles.image} />
      <Text style={styles.title}>{disease.name}</Text>
      <Text style={styles.description}>{disease.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'justify',
  },
});

import React from 'react';
import { useRouter, usePathname } from 'expo-router'; // Adjusted import
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import diseaseData from '../../assets/JSONs/wheat-disease.json';

export default function LearnMore() {
  const router = useRouter();
  const pathname = usePathname(); // Get the current path
  const id = pathname.split('/').pop(); // Extract the `id` from the path

  // Find the disease information by ID
  const disease = diseaseData.wheatDiseases.find((d) => d.id?.toString() === id);

  if (!disease) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Disease information not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: disease.image }} style={styles.image} />
      <Text style={styles.title}>{disease.name}</Text>
      <Text style={styles.description}>{disease.description}</Text>
      <Text style={styles.subtitle}>Found In:</Text>
      <Text style={styles.info}>{disease.foundIn}</Text>
      <Text style={styles.subtitle}>Seasons:</Text>
      <Text style={styles.info}>{disease.seasons}</Text>
      <Text style={styles.subtitle}>Pathogen:</Text>
      <Text style={styles.info}>{disease.pathogen}</Text>
      <Text style={styles.subtitle}>Symptoms:</Text>
      {disease.symptoms.map((symptom, index) => (
        <Text key={index} style={styles.listItem}>• {symptom}</Text>
      ))}
      <Text style={styles.subtitle}>Prevention:</Text>
      {disease.prevention.map((prevention, index) => (
        <Text key={index} style={styles.listItem}>• {prevention}</Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
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
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
    marginTop: 10,
  },
  info: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  listItem: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
    paddingLeft: 10,
  },
});

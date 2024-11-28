// app/about.js
import { Text, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>About screen</Text>
      <Link href="/" style={styles.button}>
        Go back to Home screen
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 24,
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
    marginTop: 10,
  },
});

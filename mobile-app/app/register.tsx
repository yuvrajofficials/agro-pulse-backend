import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { createUserWithEmailAndPassword } from "firebase/auth"; // Use the modular SDK function
import { auth, db } from "../firebase.config"; // Ensure this imports the configured `auth` object
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [cfpassword, setCfPassword] = useState("");
  const [crpassword, setCrPassword] = useState("");
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (cfpassword !== crpassword) {
      Alert.alert("Passwords do not match!");
      return;
    }

    try {
      // Pass `auth` as the first parameter
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        cfpassword
      );
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        name,
        phone,
        address,
        email,
      });
      Alert.alert("Success", "Account created successfully!");
      navigation.navigate("login"); // Redirect to login after successful registration
    } catch (error) {
      Alert.alert("Registration Error", error.message);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView contentContainerStyle={styles.scrollContainer}  showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>Create your account</Text>

        {/* Form Inputs */}
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Full Name"
          style={styles.input}
        />
        <TextInput
          value={phone}
          onChangeText={setPhone}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          style={styles.input}
        />
        <TextInput
          value={address}
          onChangeText={setAddress}
          placeholder="Address"
          style={styles.input}
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />
        <TextInput
          value={cfpassword}
          onChangeText={setCfPassword}
          placeholder="Create Password"
          secureTextEntry
          style={styles.input}
        />
        <TextInput
          value={crpassword}
          onChangeText={setCrPassword}
          placeholder="Confirm Password"
          secureTextEntry
          style={styles.input}
        />

        {/* Register Button */}
        <TouchableOpacity onPress={handleRegister}>
          <LinearGradient colors={["#00B685", "#46c67c"]} style={styles.button}>
            <Text style={styles.buttonText}>Register</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Login Link */}
        <Text
          style={styles.loginText}
          onPress={() => navigation.navigate("login")}
        >
          Already have an account? Login here!
        </Text>

        {/* OR Text and Social Login */}
        <View style={styles.moreSigninContainer}>
          <View style={styles.moreSigninItem}></View>
          <Text style={styles.dividingLetter}>Sign In Options </Text>
          <View style={styles.moreSigninItem}></View>
        </View>
        <View style={styles.socialIcons}>
          <TouchableOpacity style={styles.socialButton}>
            <AntDesign name="google" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <AntDesign name="github" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-facebook" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 20,
    paddingVertical: 40,
    justifyContent: "center",
  },
  scrollContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    color: "#333",
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  subtitle: {
    color: "#46c67c",
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 60,
    borderColor: "grey",
    fontSize: 17,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: "100%",
    backgroundColor: "#f6f7f9",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
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
  loginText: {
    textAlign: "center",
    fontSize: 14,
    color: "#46c67c",
    marginTop: 15,
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
    marginTop: 10,
  },
  socialButton: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 50,
    margin: 5,
  },
});

export default Register;

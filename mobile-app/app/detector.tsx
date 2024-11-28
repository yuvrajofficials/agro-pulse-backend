import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image ,ScrollView  } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import NavigationTab from "./Utils/NavigationTab";

export default function DiseaseDetect() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [imageUri, setImageUri] = useState(null);
  const [imageFile, setImageFile] = useState(null);



  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <TouchableOpacity onPress={requestPermission} style={styles.messageBtn}>
          <Text style={styles.messageBtnText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const selectImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Photo library access is required to select an image.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Correct API usage
      quality: 1,
      allowsEditing: false,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
      setImageFile(result.assets[0].uri); // Ensure consistency
    } else {
      alert("No image selected.");
    }
  };

  const captureImage = async () => {
    if (imageUri) {
      console.log("Captured Image URI:", imageUri);
      const formData = new FormData();
      formData.append("file", {
        uri: imageUri,
        name: "plant_image.jpg",
        type: "image/jpeg",
      });

      try {
        const serverUrl = "http://192.168.1.2:8000/predict"; // Update this IP
        const response = await axios.post(serverUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Response from server:", response.data);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      console.log("No image URI found!");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>Identify</Text>
     
      <CameraView style={styles.camera} facing={facing}>
        <Text style={styles.instruction}>
          Place the plant a little away from the camera.
        </Text>

        <View style={styles.overlay}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={toggleCameraFacing}
            >
              <Ionicons name="camera-reverse" size={28} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={captureImage}
            >
              <Ionicons name="search" size={48} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={selectImage}>
              <Ionicons name="images" size={28} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>

      {imageUri && (
        <View style={styles.imagePreviewContainer}>
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />
          <TouchableOpacity onPress={captureImage} style={styles.tickButton}>
            <Ionicons name="checkmark-circle" size={40} color="green" />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.bottomContainerMargin}></View>
      <View style={styles.navbarComp}>
        <NavigationTab />
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },
  header: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    paddingVertical: 10,
  },
  instruction: {
    color: "#fff",
    fontSize: 14,
    position: "absolute",
    top: 20,
    textAlign: "center",
    width: "100%",
  },
  camera: {
    flex: 1,
    borderRadius: 10,
    overflow: "hidden",
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 10,
    
  },
  iconButton: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 30,
    padding: 12,
  },
  captureButton: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 50,
    padding: 20,
  },
  imagePreviewContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  tickButton: {
    marginTop: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 30,
    padding: 12,
  },
  navbarComp: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  message: {
    color: "#fff",
  },
  messageBtn: {
    backgroundColor: "green",
  },
  messageBtnText: {
    color: "#fff",
  },
});

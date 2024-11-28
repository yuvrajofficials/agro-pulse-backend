import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import NavigationTab from "./Utils/NavigationTab";

export default function DiseaseDetect() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera.
        </Text>
        <TouchableOpacity onPress={requestPermission} style={styles.messageBtn}>
          <Text style={styles.messageBtnText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const selectImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Photo library access is required to select an image.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: false,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    } else {
      alert("No image selected.");
    }
  };

  const captureImage = async () => {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    if (!cameraPermission.granted) {
      alert("Camera access is required to capture an image.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    } else {
      alert("Image capture canceled.");
    }
  };
  const postImage = async () => {
    if (!imageUri) {
      alert("No image selected or captured!");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", {
        uri: imageUri,
        name: "plant_image.jpg",
        type: "image/jpeg",
      });

      const serverUrl = "http://3.88.88.249:8090/predict/"; // Use the correct FastAPI endpoint
      const response = await axios.post(serverUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(`Prediction Result: ${response.data.predicted_disease}`);
      console.log("Response from server:", response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
   
      <Text style={styles.header}>Identify</Text>

      <Text style={styles.instruction}>
        Place the plant a little away from the camera.
      </Text>

   

      {imageUri ? <>
        <View style={styles.imagePreviewContainer}>
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />
          <View  style={styles.predictBtnView}>

          <TouchableOpacity onPress={postImage} style={styles.predictBtn}>
           

            <Ionicons name="search" size={40} style={styles.predictBtnIcon}/>
            <Text style={styles.predictBtnText}>Detect</Text>
            
          </TouchableOpacity>
          </View>
        </View>
        </> : <> <CameraView style={styles.cameraView} >
        </CameraView></>
      }
      {loading && <Text style={styles.loading}>Uploading...</Text>}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={toggleCameraFacing}
        >
          <Ionicons name="camera-reverse" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.captureButton} onPress={captureImage}>
          <Ionicons name="camera" size={48} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={selectImage}>
          <Ionicons name="images" size={28} color="white" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.navbarComp}>
        <NavigationTab />
      </View>

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
    textAlign: "center",
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
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
    marginTop: 20,
  },
  imagePreview: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  cameraView:{
    width: 400,
    height: 600,
  },
  tickButton: {
    marginTop: 10,
  },
  loading: {
    color: "yellow",
    textAlign: "center",
    marginVertical: 10,
  },
  navbarComp: {
    padding:20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10, // Ensures navbar stays on top of other content
  },
  message: {
    color: "#fff",
    textAlign: "center",
    marginVertical: 20,
  },
  messageBtn: {
    backgroundColor: "green",
    borderRadius: 8,
    padding: 10,
    alignSelf: "center",
  },
  messageBtnText: {
    color: "#fff",
    textAlign: "center",
  },
  predictBtn:{
    flex:1,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center"
  },
  predictBtnView:{
    padding:5,
    backgroundColor:"#fff",
    width:200,
    height:70,
    borderRadius:10,
    margin:10,
    marginTop:40,
    
  },
  predictBtnText:{
    marginHorizontal:5,
    width:100,
   color:"#000",
   fontSize:30,
  },
  predictBtnIcon:{
    backgroundColor:"#000",
    color:"#fff",
    borderRadius:10,
    padding:10,

  }
});

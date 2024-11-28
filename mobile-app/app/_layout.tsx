// app/_layout.js
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { AuthProvider } from "./authcontext";
import AuthCheck from "./authcheck";

export default function Layout() {
  return (
    <AuthProvider>
      <AuthCheck>
        <Stack>
          <Stack.Screen
            name="splashscreen"
            options={{ title: "Splash", headerShown: false }}
          />

          <Stack.Screen
            name="index"
            options={{ title: "Home", headerShown: false }}
          />
          <Stack.Screen
            name="authcheck"
            options={{ title: "authcheck", headerShown: false }}
          />
          <Stack.Screen
            name="home"
            options={{ title: "Home", headerShown: false }}
          />
          <Stack.Screen name="about" options={{ title: "About" }} />
          <Stack.Screen
            name="detector"
            options={{ title: "Detector", headerShown: false }}
          />
          <Stack.Screen name="login" options={{ title: "Login" ,headerShown: false}} />
          <Stack.Screen name="register" options={{ title: "Register",headerShown: false }} />
          <Stack.Screen
            name="capture"
            options={{ title: "Capture", headerShown: false }}
          />
        
          <Stack.Screen
            name="learnmore/[id]"
            options={{ title: "Detailed Information" }}
          /> 
          <Stack.Screen
          name="chatassistant"
          options={{ title: "chatassistant Information", headerShown: false }}
        />
        </Stack>
      </AuthCheck>
    </AuthProvider>
  );
}

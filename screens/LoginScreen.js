import React, { useEffect, useState, useContext } from "react";
import { View, Text, Image, TouchableOpacity,Button } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/FontAwesome';


WebBrowser.maybeCompleteAuthSession();
//web: 130862412940-fensis5t7bpu8mh577puuplpidd95cao.apps.googleusercontent.com

//aquí lo cambie de function a const  - Naomy
export const LoginScreen=({ navigation }) => {

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "130862412940-fensis5t7bpu8mh577puuplpidd95cao.apps.googleusercontent.com",
  });

  useEffect(() => {
    handleEffect();
  }, [response]);

  async function handleEffect() {
    const user = await getLocalUser();
    console.log("user", user);
    if (!user) {
      if (response?.type === "success") {
        getUserInfo(response.authentication.accessToken);
      }
    } else {

      console.log("loaded locally");
      navigation.navigate('menuHamburguesa');
    }
  }

  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@user");
    if (!data) return null;
    return JSON.parse(data);
  };

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));

      navigation.navigate('menuHamburguesa');
    } catch (error) {
      // Add your own error handler here
    }
  };

  const handleGoogleLogin = () => {
    promptAsync();
  };

 return (
  <View style={styles.view}>

      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={require("../assets/logoDossier.png")} style={styles.image} />
        </View>
        {request ? (
          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleGoogleLogin}
          >
            <View style={styles.buttonContainer}>
              <Text style={styles.googleButtonText}>Ingresar con Google</Text>
              <Icon name="google" size={30} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
        ) : (
          <Text style={styles.text}>No se ha iniciado sesión</Text>
        )}
      </View>
        {/* 
        Elimine este boton - Naomy
        <Button title="Limpiar datos (debes recargar la app)" 
        onPress={async () => await AsyncStorage.removeItem("@user")}/>
        */}
     
    
  </View>
);

  
}

const styles = {
  view: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#000000",
    justifyContent: "center",
  },
  container: {
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color:"white"
  },
  card: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 370,
    height: 160,
    resizeMode: "contain",
  },
  googleButton: {
    backgroundColor: "#771011",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  googleButtonText: {
    fontSize: 20,
    color: "#FFFFFF",
    textAlign: "center",
    marginRight:10
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
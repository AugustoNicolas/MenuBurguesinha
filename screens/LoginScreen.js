import React, { useEffect, useState, useContext } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

export function LoginScreen({ navigation }) {

 return (
  <View style={styles.view}>

      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={require("../assets/logoDossier.png")} style={styles.image} />
        </View>
          <TouchableOpacity
            style={styles.googleButton}
            onPress={() => navigation.replace('menuHamburguesa')}
          >
            <View style={styles.buttonContainer}>
              <Text style={styles.googleButtonText}>Ingresar con Google</Text>
              <Icon name="google" size={30} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
        
      </View>

    
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
    height: 200,
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

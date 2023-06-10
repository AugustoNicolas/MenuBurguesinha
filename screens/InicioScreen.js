import React,{useState}from "react";
import { useCallback } from 'react';
import { StyleSheet, Text, View, Button, Image, Pressable, Linking, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFonts } from 'expo-font';

export const InicioScreen = () => {
    const [fontsLoaded] = useFonts({
        Forum: require('../assets/Fonts/Forum-Regular.ttf')
    })

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
          await SplashScreen.hideAsync();
        }
      }, [fontsLoaded]);
    
      if (!fontsLoaded) {
        return null;
      }
  return (
    <View style={styles.view} onLayout={onLayoutRootView}>
      <Image source={require("../assets/fuego.jpg")} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={[styles.title,{fontFamily: 'Forum'}]}>Caracteristicas</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.text,{fontFamily: 'Forum'}]}>Loremipsumdolorsitamet,consectetueradipiscingelit,mdolorsitamet,consectetueradipiscinge lit,m do l  orsitamet,consectetueradipiscinge onsectetueradonsectetuerad
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title,{fontFamily: 'Forum'}]}>Horarios</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.text,{fontFamily: 'Forum'}]}>Loremipsumdolorsitamet,consectetueradipiscingelit,mdolorsitamet,consectetueradipiscinge lit,m do l  orsitamet,consectetueradipiscinge onsectetueradonsectetuerad
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 326,
    height: 326,
    borderRadius: 10,
  },
  title: {
    fontSize: 35,
    color: "#FFFFFF",
    textAlign: "left",
    marginBottom: 10,
  },
  text:{
    fontSize: 20,
    color: "#FFFFFF",
    textAlign: "left",
    marginBottom: 10,
  },
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:"#000000"
  },
  textContainer: {
    width: "100%",
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 10,
  }
});
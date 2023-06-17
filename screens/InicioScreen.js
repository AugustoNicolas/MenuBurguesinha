import React, { useState, useEffect, useRef } from 'react';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { StyleSheet, Text, View, Button, Image, Pressable, Linking, TouchableOpacity, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import {getReservaById} from '../helpers/Reservas'

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const InicioScreen = () => {


    //************* Code para las notificaciones ************ */

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
  
    useEffect(() => {
      registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
  
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
  
      });
  
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });
  
      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }, []);
  
  
    useEffect(() => {
      const subscription = Notifications.addNotificationResponseReceivedListener(response => {
        const { screen, params,nombre, detalle, vencimiento, nota } = response.notification.request.content.data;
        const item = {params,nombre, detalle, vencimiento, nota}
        console.log(item)
        navigation.navigate(screen, {
          item : item
        });
      });
    
      return () => subscription.remove();
  
    }, []);
    
  
      //*************  ************ */

      useEffect(() => { 
        viewReservas();
      }, []);
      
      const viewReservas = async () => {
        const reservasHoy = await getReservaById();
        if (reservasHoy && reservasHoy.length > 1) {
          await schedulePushNotification();
        }      
      }

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
      <ScrollView>
        <View style={styles.containerImage}>
          <Image source={require("../assets/fuego.jpg")} style={styles.image} />
        </View>
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  containerImage:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    
  },
  image: {
    width: 370,
    height: 300,
    borderRadius: 10,
    resizeMode: "contain",
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




/// Metodos para las notificaciones 

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "No olvides que hoy es la reseva! ⌚",
      //body: item.nombre,
      sound: 'default'
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}
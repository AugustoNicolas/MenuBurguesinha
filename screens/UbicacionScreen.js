import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import * as Location from 'expo-location';

export const UbicacionScreen = () => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Solicitar permisos de ubicación
    requestLocationPermission();
  }, []);

const requestLocationPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Permiso de Ubicación',
          message: 'Esta aplicación requiere acceso a tu ubicación.',
          buttonNeutral: 'Preguntar luego',
          buttonNegative: 'Cancelar',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getUserLocation();
      } else {
        console.log('Permiso de ubicación denegado');
      }
    } catch (err) {
      console.warn(err);
    }
  } else if (Platform.OS === 'ios') {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      getUserLocation();
    } else {
      console.log('Permiso de ubicación denegado');
    }
  }
};

const getUserLocation = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;
      setUserLocation({ latitude, longitude });
    } else {
      console.log('Permiso de ubicación denegado');
    }
  } catch (error) {
    console.warn(error);
  }
};
  const calculateDistance = () => {
    const restaurantLocation = {
      latitude: -17.768432,
      longitude: -63.188644,
    };

    if (userLocation) {
      const R = 6371; // Radio de la Tierra en kilómetros
      const lat1 = userLocation.latitude;
      const lon1 = userLocation.longitude;
      const lat2 = restaurantLocation.latitude;
      const lon2 = restaurantLocation.longitude;

      const dLat = toRadians(lat2 - lat1);
      const dLon = toRadians(lon2 - lon1);

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;

      return distance.toFixed(2); // Distancia en kilómetros con 2 decimales
    }

    return null;
  };

  const toRadians = angle => {
    return angle * (Math.PI / 180);
  };
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -17.768432,
          longitude: -63.188644,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: -17.733987719878737,
            longitude: -63.16939445991823,
          }}
          title="Restaurante Escuela - Dossier"
          description="6to anillo banzer, RN 4, Santa Cruz de la Sierra"
        />
      </MapView>

      <View style={styles.infoContainer}>
        <Text style={styles.distanceText}>
          {userLocation ? `Distancia: ${calculateDistance()} km` : 'Obteniendo ubicación...'}
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  infoContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  distanceText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

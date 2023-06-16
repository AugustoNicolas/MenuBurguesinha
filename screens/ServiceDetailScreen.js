import React from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export const ServiceDetailScreen = ({route, navigation}) => {
  const { servicioId } = route.params;


  return (
    <View style={styles.container}>
      {/* Imagen */}
      <Image
        source={require('../assets/IMG_0154.jpg')}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Contenido */}
      <View style={styles.content}>
        <Text style={styles.title}>Nombre del Plato</Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mattis lorem sed
          maximus cursus. Etiam vehicula velit et leo maximus venenatis. Sed sed massa a
          ipsum efficitur gravidaa.
        </Text>

        {/* Separador */}
        <View style={styles.separator} />

        {/* Fecha del servicio */}
        <Text style={styles.date}>Fecha del servicio: 12 de Mayo, 2023</Text>

        {/* Botón de reserva */}
        <TouchableOpacity style={styles.button} onPress={() =>navigation.navigate('ReservasScreen', {servicioId})}>
          <Text style={styles.buttonText}>Reservar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  image: {
    flex: 1,
    height: null,
    width: null,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    color: 'white',
    fontSize: 16,
    marginBottom: 20,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginBottom: 20,
    
  },
  date: {
    color: 'white',
    fontSize: 16,
    marginBottom: 20,
    fontWeight: 'bold',
    backgroundColor:'red',
    padding:5,
    
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

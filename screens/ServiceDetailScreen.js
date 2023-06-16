import React from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';

export const ServiceDetailScreen = ({route, navigation}) => {
  const { servicioId } = route.params;
  const { menu, fecha_init } = route.params;

  return (
    <View style={styles.container}>
      {/* Slider */}
      <Swiper style={styles.slider} showsPagination={false}>
        {menu.map((plato, index) => (
          <View key={index} style={styles.slide}>
            
            <Image source={{ uri: `data:image/jpeg;base64,${plato.foto}` }} style={styles.slideImage} resizeMode="cover" />
            <Text style={styles.slideTitle}>{plato.nombre}</Text>
            <Text style={styles.description}>Detalle: {plato.detalle}</Text>
          </View>
        ))}
      </Swiper>

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
        <Text style={styles.date}>Fecha de Servicio: {fecha_init}</Text>

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
  slider: {
    height: 500,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideImage: {
    width: '100%',
    height: '100%',
  },
  slideTitle: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
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
    marginBottom: 30, // Separar más el detalle del plato
    textAlign: 'left',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginBottom: 20,
  },
  date: {
    color: 'white',
    fontSize: 18, // Aumentar el tamaño de la fecha
    marginBottom: 30, // Separar más la fecha del slider
    fontWeight: 'bold',
    backgroundColor: 'red',
    padding: 5,
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
  }
});

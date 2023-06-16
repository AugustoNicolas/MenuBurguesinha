import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import moment from 'moment';

export const ItemReserva = ({ item }) => {
  const formattedDate = moment(item.servicio.fecha_init).format('DD/MM/YYYY HH:mm:ss');

  return (
    <View style={styles.container}>
      <Pressable style={styles.button}>
        <View style={styles.innerContainer}>
          <Text style={styles.label}>Servicio:</Text>
          <Text style={styles.text}>{item.servicio.tematica}</Text>
          <Text style={styles.label}>Fecha:</Text>
          <Text style={styles.text}>{formattedDate}</Text>
          <Text style={styles.label}>Cantidad de personas reservadas:</Text>
          <Text style={styles.text}>{item.cupos}</Text>
        </View>
      </Pressable>
      <View style={styles.separator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    borderRadius: 8,
    height: 100,
  },
  button: {
    borderRadius: 5,
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap', // Agregado para permitir envolver los elementos
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    textAlign: 'center',
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: 'gray',
  },
});

import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

export const ItemServicios = ({fecha_init,foto,tematica,cupos_disponibles,onPress}) => {
  return (
    <View style={styles.container}>

      {/* Body */}
        <TouchableOpacity
          style={styles.servicesContainer}
          onPress={onPress}
        >
          <Text style={styles.serviceDate}>{fecha_init}</Text>
          <Image
            source={foto}
            style={styles.image}
          />
          <View style={styles.imageOverlay}>
            <Text style={styles.imageTitle}>{tematica}</Text>
            <Text style={styles.imagePrice}>{cupos_disponibles} cupos</Text>
          </View>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    backgroundColor: 'black',
    paddingVertical: 20,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    marginRight: 10,
  },
  headerMonth: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 'auto',
  },
  body: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  servicesContainer: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    padding: 20,
  },
  serviceDate: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
    backgroundColor:'red',
    padding:10,
    fontWeight: 'bold',
    
  },
  image: {
    width: 350,
    height: 250,
    resizeMode: 'cover',
    borderRadius:5,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageTitle: {
    marginTop:-20,
    color: 'white',
    fontSize: 26,
    flex: 1,
    padding: 5,
  },
  imagePrice: {
    marginTop:-20,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
    padding:5,
  },
});

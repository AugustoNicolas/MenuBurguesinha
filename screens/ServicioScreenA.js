import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { ItemServicios } from '../components/ItemServicios';
import { getListaServicios } from '../helpers/Servicios';

export const ServiciosScreen = ({ navigation }) => {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    fetchServicios();
  }, []);

  const fetchServicios = async () => {
    const listaServicios = await getListaServicios();
    if (listaServicios) {
      setServicios(listaServicios);
    }
  };

  const ItemListaServicios = (itemData) => {
    const PressHandler = () => {
      navigation.navigate('ServiceDetail', {
        servicioId: itemData.item._id,
        menu: itemData.item.menu,
        fecha_init: formattedDate
      });
    };

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.getMonth() + 1; // Los meses en JavaScript comienzan en 0
      const year = date.getFullYear();
      
      // Asegúrate de agregar un 0 al día y al mes si tienen un solo dígito
      const formattedDay = day < 10 ? `0${day}` : day;
      const formattedMonth = month < 10 ? `0${month}` : month;
    
      // Retorna la fecha en el formato deseado
      return `${formattedDay}/${formattedMonth}/${year}`;
    };
    
    const originalDate = itemData.item.fecha_init;
    const formattedDate = formatDate(originalDate);
    console.log(formattedDate); // Resultado: "20/06/2023"
    
    return (
      <ItemServicios
        fecha_init={formattedDate}
        foto={itemData.item.foto}
        tematica={itemData.item.tematica}
        cupos_disponibles={itemData.item.cupos_disponibles}
        onPress={PressHandler}
      />
    );
  };

  const getCurrentMonth = () => {
    const months = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
    ];

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    return months[currentMonth];
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Servicios del mes</Text>
        <Text style={styles.headerMonth}>{getCurrentMonth()}</Text>
      </View>
      {/* Body */}
      <View contentContainerStyle={styles.body}>
        <FlatList
          data={servicios}
          keyExtractor={(item) => item._id}
          renderItem={ItemListaServicios}
          numColumns={1}
        />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingBottom:30,
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
    backgroundColor: 'red',
    padding: 10,
    fontWeight: 'bold',
  },
  image: {
    width: 350,
    height: 250,
    resizeMode: 'cover',
    borderRadius: 5,
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

import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { userContext } from '../context/userContext';

import { ItemReserva} from '../components/ItemReserva'
export const MisReservasScreen = ({navigation}) => {
    const { reservas, searchReservas } = useContext(userContext);

    useEffect(() => {
        searchReservas();
      }, []);

    const ItemListaCategoria = (ItemData) => { 
        const item = ItemData.item
        return <ItemReserva item={item} />
    }

    return (
        <View style={styles.container}>
          <FlatList
            data={reservas}
            keyExtractor={(item) => item._id}
            renderItem={ItemListaCategoria}
            numColumns={1}
          />
        </View>
      );
      
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    panel: {
      margin: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  
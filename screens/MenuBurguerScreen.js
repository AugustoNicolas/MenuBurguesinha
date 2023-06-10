import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';

import { InicioScreen } from './InicioScreen';
import { UbicacionScreen } from './UbicacionScreen';
import { ReservasScreen } from './ReservasScreenMisa';
import { ServiciosScreen } from './ServicioScreenA';
import { MenuScreen } from './MenuScreen'
import { ContactanosScreen } from './ContactanosScreen';
import {ServiceDetailScreen} from './ServiceDetailScreen';
import {DetallePlato} from './DetallePlato'

const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ navigation }) => {
  const renderDrawerItem = (label, iconName, screenName) => {
    return (
      <DrawerItem
        label={() => (
          <View style={styles.drawerItemContainer}>
            <Icon name={iconName} size={20} style={styles.drawerItemIcon} />
            <Text style={styles.drawerItemLabel}>{label}</Text>
          </View>
        )}
        onPress={() => navigation.navigate(screenName)}
        style={styles.drawerItem}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Icon name="user-circle" size={80} style={styles.profileIcon} />
        <Text style={styles.profileName}>John Doe</Text>
      </View>

      <DrawerContentScrollView>
        {renderDrawerItem('Inicio', 'home', 'Inicio')}
        {renderDrawerItem('Ubicación', 'map-marker', 'Ubicación')}
        {renderDrawerItem('Pedido', 'plus-circle', 'Pedido')}
        {renderDrawerItem('Reservas', 'calendar-plus-o', 'Reservas')}
        {renderDrawerItem('Menú', 'star', 'Menú')}
        {renderDrawerItem('Contáctanos', 'phone', 'Contáctanos')}
      </DrawerContentScrollView>
    </View>
  );
};

export const MenuBurguerScreen = ({ navigation }) => {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator
        initialRouteName="Inicio"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="Inicio" component={InicioScreen} options={{
          headerStyle:{
            backgroundColor:'black',
          },
          headerTintColor:'white',
          headerTitleAlign: 'center',
          contentStyle:{
            backgroundColor:'black'
          }
          }}/>
        <Drawer.Screen name="Ubicación" component={UbicacionScreen} options={{
          headerStyle:{
            backgroundColor:'black',
          },
          headerTintColor:'white',
          headerTitleAlign: 'center',
          contentStyle:{
            backgroundColor:'black'
          }
          }}/>
        <Drawer.Screen name="Pedido" component={ReservasScreen} options={{
          headerStyle:{
            backgroundColor:'black',
          },
          headerTintColor:'white',
          headerTitleAlign: 'center',
          contentStyle:{
            backgroundColor:'black'
          }
          }}/>
        <Drawer.Screen name="Reservas" component={ServiciosScreen} options={{
          headerStyle:{
            backgroundColor:'black',
          },
          headerTintColor:'white',
          headerTitleAlign: 'center',
          contentStyle:{
            backgroundColor:'black'
          }
          }}/>
        <Drawer.Screen name="Menú" component={DetallePlato} options={{
          headerStyle:{
            backgroundColor:'black',
          },
          headerTintColor:'white',
          headerTitleAlign: 'center',
          contentStyle:{
            backgroundColor:'black'
          }
          }}/>
        <Drawer.Screen name="Contáctanos" component={ContactanosScreen} options={{
          headerStyle:{
            backgroundColor:'black',
          },
          headerTintColor:'white',
          headerTitleAlign: 'center',
          contentStyle:{
            backgroundColor:'black'
          }
          }}/>
          <Drawer.Screen name="ServiceDetail" component={ServiceDetailScreen} options={{
          headerStyle:{
            backgroundColor:'black',
          },
          headerTintColor:'white',
          headerTitleAlign: 'center',
          contentStyle:{
            backgroundColor:'black'
          }
          }}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  profileContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  profileIcon: {
    color: 'white',
    marginBottom: 10,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  drawerItem: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  drawerItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  drawerItemIcon: {
    marginRight: 10,
    color: 'white',
  },
  drawerItemLabel: {
    fontSize: 16,
    color: 'white',
  },
});

import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image,TouchableOpacity, Alert,Button } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from "@react-native-async-storage/async-storage";


import { InicioScreen } from './InicioScreen';
import { UbicacionScreen } from './UbicacionScreen';
import { ReservasScreen } from './ReservasScreenMisa';
import { ServiciosScreen } from './ServicioScreenA';
import { MenuScreen } from './MenuScreen'
import { ContactanosScreen } from './ContactanosScreen';
import {ServiceDetailScreen} from './ServiceDetailScreen';
import {DetallePlato} from './DetallePlato'
import {AddPlato} from './AddPlato'



const Drawer = createDrawerNavigator();

export const CustomDrawerContent = ( { navigateToLogin } ) => {//navigateToLogin nos permitira una navegación a nivel de stack.navigator
  const navigation=useNavigation()   //navigation para navegar entre screens de cajon (drawer)
  //*********************************** */
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {   //obteniendo datos del user para mostrarlos en el menu
    const data = await AsyncStorage.getItem("@user");
    if (data) {
      const userData = JSON.parse(data);
      setUser(userData);
    }
  };

  const getLocalUser = async () => {  
    const data = await AsyncStorage.getItem("@user");
    if (!data) return null;
    return JSON.parse(data);
  };
  async function handleEffect() {
    const user = await getLocalUser();        //Toda esta parte es para probar que se pasa el usuario
    console.log("user", user);
  }

  const handleLogout = async () => {
    await AsyncStorage.removeItem("@user");
    navigateToLogin(); // Navegar a la pantalla de login después del logout
  };
  
//******************** */

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

      {/* Codigo para mostrar datos del usuario -Naomy */}

      <View style={styles.profileContainer}>
        {user && user.picture ? (
          <Image source={{ uri: user.picture }} style={styles.profileIcon} />
        ) : (
          <Icon name="user-circle" size={80} style={styles.profileIcon} />
        )}
        {user && user.name ? (
          <Text style={styles.profileName}>{user.name}</Text>
        ) : (
          <Text style={styles.profileName}>John Doe</Text>
        )}
        <Button title="Datos de Usuario" onPress={handleEffect} />
      </View>

      <DrawerContentScrollView>
        {renderDrawerItem('Inicio', 'home', 'Inicio')}
        {renderDrawerItem('Ubicación', 'map-marker', 'Ubicación')}
        {/* {renderDrawerItem('Pedido', 'plus-circle', 'Pedido')} */}
        {renderDrawerItem('Reservas', 'calendar-plus-o', 'Reservas')}
        {renderDrawerItem('Menú', 'star', 'Menú')}
        {renderDrawerItem('Contáctanos', 'phone', 'Contáctanos')}
        {renderDrawerItem('Agregar plato', 'pencil', 'AddPlato')}
        <DrawerItem      //este es el item del login
        label="Log Out"
        icon={() => (
          <Icon name="sign-out" size={20} color={"white"} />
        )}
        labelStyle={{ color: 'white' }}
        onPress={handleLogout} 
        />
      </DrawerContentScrollView>
    </View>
  );
};

export const MenuBurguerScreen = ({navigation}) => {
  const navigateToLogin = () => {
    navigation.navigate('Login')    //navegando al login
  };
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator
        initialRouteName="Inicio"
        drawerContent={(props) => <CustomDrawerContent {...props} navigateToLogin={navigateToLogin} />} //aquí agregué el parámetro 'navigateToLogin' para que se pueda hacer navigate desde el CustomDrawer -Naomy
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
          <Drawer.Screen name="AddPlato" component={AddPlato} options={{
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
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  profileIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'gray',
    marginBottom: 10,
  },
  profileName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
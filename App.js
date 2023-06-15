import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { UsersProvider } from './context/userContext';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {LoginScreen} from './screens/LoginScreen'

import { MenuBurguerScreen } from './screens/MenuBurguerScreen';
{/*
import { InicioScreen } from './screens/InicioScreen';
import { PedidoScreen } from './screens/PedidoScreen'
import { ReservasScreen } from './screens/ReservasScreen';
import { UbicacionScreen } from './screens/UbicacionScreen';
import { MenuScreen } from './screens/MenuScreen';
import { ContactanosScreen } from './screens/ContactanosScreen';
 */}


const Stack=createStackNavigator();
export default function App() {
  return (
    
    <UsersProvider>
    <NavigationContainer style={styles.container}>
      <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen}
          options={{
            headerShown: false
          }} 
        />
          <Stack.Screen name="menuHamburguesa" component={MenuBurguerScreen} 
          options={{
            headerShown: false
          }} 
        />


    </Stack.Navigator>
    </NavigationContainer>
    </UsersProvider>
  )}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

import React, {useState, useContext} from "react";
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, Pressable } from "react-native";
import DateTimePicker  from '@react-native-community/datetimepicker';
import {getFechaServicio} from '../helpers/Servicio'

import { postReserva } from "../helpers/Reservas";
import { userContext } from '../context/userContext';
import { color } from "react-native-reanimated";


export const ReservasScreen = ({route,navigation}) => {

const [errormsg, seterrormsg] = useState(false);

//=====================Id del servicio==================\\
console.log(route.params)
const { servicioId } = route.params;
//=====================Usuario Logeado==================\\

    const {userInfo} = useContext(userContext)
    const {name,email,_id}= userInfo
//======================================================\\


//=====================FUENTES==================\\
    const [fontsLoaded] = useFonts({
        Forum: require('../assets/Fonts/Forum-Regular.ttf')
    })
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
          await SplashScreen.hideAsync();
        }
      }, [fontsLoaded]);
//======================================================\\


//=========Contador de cupos===========\\
    const [count, setCount] = useState(0);
    const increment = () => {
        setCount(count + 1);
    };

    const decrement = () => {
        setCount(count - 1);
    };
//======================================================\\
    const reserva = {
        usuario: _id,
        servicio:servicioId,
        fecha:new Date('2023-06-16T08:55:28.914Z'),
        cupos:count
    }
    console.log(reserva)

    const createReserva = async () =>{
        
        const response = await postReserva(reserva);
        if (response !== null) {
        alert('Reserva Realizada')
        navigation.navigate('Inicio');
        } else {
        alert('no')
        seterrormsg(true);
    }
    }



    return(
     <View style={styles.view} onLayout={onLayoutRootView}>
        <View style={styles.infoTextContainer}>
            <Text style={[styles.infoText,{fontFamily: 'Forum'}]}>Nombre y apellido</Text>
            <TextInput style={styles.textInput} value={name} disabled/>
        </View>
        <View style={styles.infoTextContainer}>
            <Text style={[styles.infoText,{fontFamily: 'Forum'}]}>E-mail</Text>
            <TextInput style={styles.textInput} value={email}/>
        </View>
        <View style={styles.infoTextContainer}>
            <Text style={[styles.infoText,{fontFamily: 'Forum'}]}>Reserva de mesa</Text>
        </View>
        <View >
            <View style={styles.buttonContainer}>
                <Text style={[styles.infoText,{fontFamily: 'Forum'},{paddingRight:60}]}>Cantidad</Text>
                <TouchableOpacity style={styles.button} onPress={decrement} disabled={count === 0}>
                    <Text style={[styles.infoText,{paddingHorizontal:"5%"}]}>-</Text>
                </TouchableOpacity > 
                <Text style={[styles.infoText,{marginHorizontal: "15%"}]}>{count}</Text>
                <TouchableOpacity style={styles.button} onPress={increment} >
                    <Text style={[styles.infoText,{paddingHorizontal:"5%"}]}>+</Text>   
                </TouchableOpacity>
            </View>
            <View style={styles.infoTextContainerBtn} >
        <TouchableOpacity style={styles.contentBtn2} onPress={createReserva}>
          <Text style={styles.buttonText2}>Realizar Reserva</Text>
        </TouchableOpacity>
      </View>
        </View>
        {errormsg && <Text style={[styles.error, { fontFamily: 'Forum' }]}>Error al conectar con la base de datos</Text>}
     </View>
    )
}
const styles = StyleSheet.create({
    backgroundReserva: {
        backgroundColor:'#C0BFB2',
      },
      button: {
        backgroundColor: '#C0BFB2', 
        padding: 5,
        borderRadius: 5,
        margin:5
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'red'
      },
    view: {
        flex: 1,
        backgroundColor: "#000000",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    
    textInput: {
        height: 30,
        backgroundColor: '#C0BFB2',
        borderRadius: 12,
        borderWidth: 1,
        paddingHorizontal: 10,
      },
      container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '50%',
  },
    textInputLarge: {
        height: 100,
        backgroundColor: '#C0BFB2',
        borderRadius: 8,
        borderWidth: 1,
        paddingHorizontal: 10,
      },
    infoTextContainer: {
      width: "100%",
      paddingLeft: 30,
      paddingRight: 30,
      marginBottom: 10,
    },
    infoText: {
        fontSize: 20,
        color: "#FFFFFF",
        marginTop: 10,
        textAlign: "left",
    },
    contentBtn2: {
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        margin: 20,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        fontFamily: 'Forum',
      },
    infoTextContainerBtn : {
    alignItems: "center",
    justifyContent: "center",
    },
    buttonText2: {
        color: '#141414',
        fontSize: 18,
      },
      error: {
        color: '#8B0000',
        fontSize: 24,
        fontFamily: 'Forum',
      },
});
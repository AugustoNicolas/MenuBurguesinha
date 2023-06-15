import React, {useState} from "react";
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StyleSheet, Text, View, Button, Image, TextInput } from "react-native";
import * as ImagePicker from 'expo-image-picker';

import {postPlato} from '../helpers/Platos'

export const AddPlato = ({navigation}) => {

  const [imagenTarea, setImagenTarea] = useState(null);
  const [nombre, setNombre] = useState("");
  const [nombreError, setNombreError] = useState(false);
  const [descripcion, setdescripcion] = useState("");
  const [descripcionError, setdescripcionError] = useState(false);

  const [detalle, setDetalle] = useState("")

  const handlerNombre = (txt) => {
    setNombre(txt);
    setNombreError(txt.trim() === "" || txt === null);
  };
  const handlerDescripcion = (txt) => {
    setdescripcion(txt);
    setdescripcionError(txt.trim() === "" || txt === null);
  };
  

  const [fontsLoaded] = useFonts({
      Forum: require('../assets/Fonts/Forum-Regular.ttf')
  })

const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const handleSeleccionarImagen = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (granted) {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.cancelled) {
        setImagenTarea(result.uri);
      }
    } else {
      alert('Se requiere permiso para acceder a la galería de fotos');
    }
  };

  const handleUpData = async () => {
    console.log(imagenTarea)
    plato = {
      nombre: nombre,
      detalle: descripcion,
      estado: 1,
      foto: imagenTarea
    }
    response = await postPlato()
    console.log(response)
  }

return(
 <View style={styles.view} onLayout={onLayoutRootView}>
    <View style={styles.infoTextContainer}>
        <Text style={[styles.infoText,{fontFamily: 'Forum'}]}>Nombre del plato: </Text>
        <TextInput style={nombreError ? styles.textIncorrecto : styles.textCorrecto} onChangeText={handlerNombre} />
    </View>
    <View style={styles.infoTextContainer}>
        <Text style={[styles.infoText,{fontFamily: 'Forum'}]}>Deatlles: </Text>
        <TextInput 
        style={[descripcionError ? styles.textIncorrecto : styles.textCorrecto , styles.textInputLarge ]}
        multiline={true}
        onChangeText={handlerDescripcion}/>
    </View>
    <View style={styles.infoTextContainer}>
        <Button title="Seleccionar imagen" onPress={handleSeleccionarImagen} />
        {imagenTarea && <Image source={{ uri: imagenTarea }} style={{ width: 200, height: 200 }} />}
    </View>
    <View style={styles.infoTextContainer}>
        <Button title="Agregar Plato" onPress={() => handleUpData()} />
    </View>
 </View>
)
};

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
      justifyContent: "center",
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
  iconContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 10,
      paddingHorizontal: 40, 
  },
  iconButton: {
      alignItems: "center",
  },
  iconButtonCenter: {
      alignItems: "center",
      flex: 1, 
      justifyContent: "center",
  },
  iconText: {
      fontSize: 15,
      color: "#FFFFFF",
      textAlign: "center",
  },
  imageContainer: {
      alignItems: "center",
  },
  image: {
      width: 326,
      height: 326,
  },
  paragraph: {
      fontSize: 18,
      color: "#FFFFFF",
      textAlign: "left",
      marginBottom: 10,
  },
  line: {
      width: "100%",
      height: 1,
      backgroundColor: "#FFFFFF",
  },
  textCorrecto: {
    height: 30,
    backgroundColor: '#C0BFB2',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderColor: '#C0BFB2'  , // Cambia el color del borde si hay un error
  },
  textIncorrecto: {
    height: 30,
    backgroundColor: '#C0BFB2',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderColor: 'red' // Cambia el color del borde si hay un error
  },
  
  
  
});
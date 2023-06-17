import React, { useState,useContext } from "react";
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StyleSheet, Text, View, Image, TextInput, Pressable } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { userContext } from '../context/userContext';

import { postPlato } from '../helpers/Platos';

export const AddPlato = ({ navigation }) => {

  
  const {loadPlatos}=useContext(userContext)

  const [imagenTarea, setImagenTarea] = useState(null);
  const [nombre, setNombre] = useState("");
  const [nombreError, setNombreError] = useState(false);
  const [descripcion, setdescripcion] = useState("");
  const [descripcionError, setdescripcionError] = useState(false);
  const [errormsg, seterrormsg] = useState(false);

  const [detalle, setDetalle] = useState("");

  const handlerNombre = (txt) => {
    setNombre(txt);
    setNombreError(txt.trim() === "" || txt === null);
  };

  const handlerDescripcion = (txt) => {
    setdescripcion(txt);
    setdescripcionError(txt.trim() === "" || txt === null);
  };

  const [fontsLoaded] = useFonts({
    Forum: require('../assets/Fonts/Forum-Regular.ttf'),
    Pavanam: require('../assets/Fonts/Pavanam-Regular.ttf')
  });

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
      if (!result.canceled) {
        setImagenTarea(result.uri);
      }
    } else {
      alert('Se requiere permiso para acceder a la galería de fotos');
    }
  };

  const handleUpData = async () => {
    const imageToBase64 = async (uri) => {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return base64;
    };

    let plato;

    if (imagenTarea) {
      const base64Image = await imageToBase64(imagenTarea);
      plato = {
        nombre: nombre,
        detalle: descripcion,
        estado: 1,
        foto: base64Image
      };
    } else {
      plato = {
        nombre: nombre,
        detalle: descripcion,
        estado: 1,
      };
    }

    const response = await postPlato(plato);

    if (response !== null) {
      loadPlatos()
      navigation.navigate('Inicio');
    } else {
      seterrormsg(true);
    }
  };

  return (
    <View style={styles.view} onLayout={onLayoutRootView}>
      <View style={styles.infoTextContainer}>
        <Text style={[styles.infoText, { fontFamily: 'Forum' }]}>Nombre del plato: </Text>
        <TextInput style={nombreError ? styles.textIncorrecto : styles.textCorrecto} onChangeText={handlerNombre} />
      </View>
      <View style={styles.infoTextContainer}>
        <Text style={[styles.infoText, { fontFamily: 'Forum' }]}>Detalles: </Text>
        <TextInput
          style={[descripcionError ? styles.textIncorrecto : styles.textCorrecto, styles.textInputLarge]}
          multiline={true}
          onChangeText={handlerDescripcion}
        />
      </View>
      <View style={styles.infoTextContainerBtn}>
        <Pressable style={styles.contentBtn} onPress={handleSeleccionarImagen}>
          <Text style={styles.buttonText}>Seleccionar imagen</Text>
        </Pressable>
        {imagenTarea && <Image source={{ uri: imagenTarea }} style={styles.image} />}
      </View>
      <View style={styles.infoTextContainerBtn}>
        <Pressable style={styles.contentBtn2} onPress={handleUpData}>
          <Text style={styles.buttonText2}>Agregar Plato</Text>
        </Pressable>
      </View>
      {errormsg && <Text style={[styles.error, { fontFamily: 'Forum' }]}>Error al conectar con la base de datos</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  infoTextContainer: {
    width: "100%",
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 10,
  }, 
  infoTextContainerBtn : {
    alignItems: "center",
    justifyContent: "center",
  },
  infoText: {
    fontSize: 20,
    color: "#FFFFFF",
    marginTop: 10,
    textAlign: "left",
  },
  textInputLarge: {
    height: 100,
    backgroundColor: '#C0BFB2',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  contentBtn: {
    backgroundColor: '#771011',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    fontFamily: 'Forum',
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
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
  buttonText2: {
    color: '#141414',
    fontSize: 18,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  textCorrecto: {
    height: 30,
    backgroundColor: '#C0BFB2',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderColor: '#C0BFB2',
  },
  textIncorrecto: {
    height: 30,
    backgroundColor: '#C0BFB2',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderColor: 'red',
  },
  error: {
    color: '#8B0000',
    fontSize: 24,
    fontFamily: 'Forum',
  },
});

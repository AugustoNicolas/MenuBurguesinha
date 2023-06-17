import React, { useContext, useEffect, useState } from 'react';
import { View, TextInput, Button, Text, FlatList, Image, Pressable, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import {  postServicios } from '../helpers/Servicio';
import { userContext } from '../context/userContext';



export const AddServicioScreen = ({navigation}) => {

  useEffect(() => {
    loadPlatos();
    console.log(userInfo)
  }, []);


  const {userInfo , fetchServicios, platos, loadPlatos}=useContext(userContext)

  const [tematica, setTematica] = useState('');
  const [fechaInit, setFechaInit] = useState(new Date().toISOString().split('T')[0]);
  const [fechaFin, setFechaFin] = useState(new Date().toISOString().split('T')[0]);
  const [cupos, setCupos] = useState('');
  const [showDatePickerInit, setShowDatePickerInit] = useState(false);
  const [showDatePickerFin, setShowDatePickerFin] = useState(false);
  const [platosVisible, setPlatosVisible] = useState(false);
  const [selectedPlatoId, setSelectedPlatoId] = useState(null);
  const [platosSeleccionados, setPlatosSeleccionados] = useState([]);
  const [imagenTarea, setImagenTarea] = useState(null);
  

  

  const handleFechaInitChange = (event, selectedDate) => {
    setShowDatePickerInit(false);
    const currentDate = selectedDate || new Date();
    currentDate.setHours(0, 0, 0, 0);
    const formattedDate = currentDate.toISOString().split('T')[0];
    setFechaInit(formattedDate);
  };

  const handleFechaFinChange = (event, selectedDate) => {
    setShowDatePickerFin(false);
    const currentDate = selectedDate || new Date();
    currentDate.setHours(0, 0, 0, 0);
    const formattedDate = currentDate.toISOString().split('T')[0];
    setFechaFin(formattedDate);
  };

  const togglePlatosVisible = () => {
    setPlatosVisible(!platosVisible);
  };

  const handlePlatoPress = (platoId) => {
    const isSelected = platosSeleccionados.includes(platoId);
    if (isSelected) {
      const updatedPlatos = platosSeleccionados.filter((plato) => plato !== platoId);
      setPlatosSeleccionados(updatedPlatos);
    } else {
      setPlatosSeleccionados([...platosSeleccionados, platoId]);
    }
  };

  const handleGuardar = async () => {
    const imageToBase64 = async (uri) => {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return base64;
    };
    const base64Image = await imageToBase64(imagenTarea);
    if (platosSeleccionados.length > 0) {
      const servicioData = {
        tematica: tematica,
        fecha_init: new Date(fechaInit),
        fecha_fin: new Date(fechaFin),
        cupos: parseInt(cupos),
        cupos_disponibles: parseInt(cupos),
        usuario_creador: userInfo._id, // Reemplaza con el ID del usuario creador
        foto: base64Image, // Puedes utilizar la foto del primer plato seleccionado
        menu: platosSeleccionados,
      };
      postServicios(servicioData)
        .then((responseData) => {
          console.log('Servicio guardado exitosamente:', responseData);
          fetchServicios()
          navigation.navigate('Inicio');
        })
        .catch((error) => {
          console.error('Error al guardar el servicio:', error);
        });
    } else {
      console.log('No se ha seleccionado ningún plato');
    }
  };

  const platoStyle = (platoId) => {
    const isSelected = platosSeleccionados.includes(platoId);
    return isSelected ? styles.platoSelected : styles.platoNormal;
  };

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
  

  return (
    <SafeAreaView>
      <TextInput placeholder="Tematica" value={tematica} onChangeText={setTematica} />
      <TextInput
        placeholder="Cupos"
        value={cupos}
        onChangeText={setCupos}
        keyboardType="numeric"
      />

      <Button title="Seleccionar fecha inicial" onPress={() => setShowDatePickerInit(true)} />
      <Text>{fechaInit}</Text>

      <Button title="Seleccionar fecha final" onPress={() => setShowDatePickerFin(true)} />
      <Text>{fechaFin}</Text>

      {showDatePickerInit && (
        <DateTimePicker
          value={new Date(fechaInit)}
          mode="date"
          display="default"
          onChange={handleFechaInitChange}
        />
      )}

      {showDatePickerFin && (
        <DateTimePicker
          value={new Date(fechaFin)}
          mode="date"
          display="default"
          onChange={handleFechaFinChange}
        />
      )}

      <Text>Platos:</Text>
      <Button title={platosVisible ? 'Ocultar platos' : 'Mostrar platos'} onPress={togglePlatosVisible} />
      {platosVisible && (
      <FlatList
        data={platos}
        keyExtractor={(item) => item._id}
        horizontal={true}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePlatoPress(item._id)} style={platoStyle(item._id)}>
            <View>
              <Text style={platoStyle(item._id)}>{item.nombre}</Text>
              <Image style={{ width: 100, height: 100 }} source={{ uri: `data:image/jpeg;base64,${item.foto}` }} />
            </View>
          </TouchableOpacity>
        )}
      />
    )}

    <Text>Platos seleccionados:</Text>
    {platosSeleccionados.map((platoId) => {
      const plato = platos.find((item) => item._id === platoId);
      if (plato) {
        return <Text key={plato._id}>{plato.nombre}</Text>;
      }
      return null;
    })}

      {selectedPlatoId && (
        <Text>Plato seleccionado: {selectedPlatoId}</Text>
      )}

      <View style={styles.infoTextContainerBtn}>
          <Pressable style={styles.contentBtn} onPress={handleSeleccionarImagen}>
            <Text style={styles.buttonText}>Seleccionar imagen</Text>
          </Pressable>
          {imagenTarea && <Image source={{ uri: imagenTarea }} style={styles.image} />}
      </View>
      <Button title="Guardar" onPress={handleGuardar} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  platoNormal: {
    marginRight: 10,
  },
  platoSelected: {
    marginRight: 10,
    color: 'green',
  },
  infoTextContainerBtn : {
    alignItems: "center",
    justifyContent: "center",
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
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 10,
    margin: 20
  },
});

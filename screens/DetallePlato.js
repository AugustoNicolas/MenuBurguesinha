import React, {useState, useEffect} from "react";
import * as Font from 'expo-font';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, Image, ScrollView} from "react-native";
import DateTimePicker  from '@react-native-community/datetimepicker';

export const DetallePlato = ({navigation}) => {
  const loadFonts = async () => {
    await Font.loadAsync({
      Pavanam: require('../assets/Fonts/Pavanam-Regular.ttf'),
      Forum: require('../assets/Fonts/Forum-Regular.ttf'),
    });
  };
  useEffect(() => {
    loadFonts();
  }, []);
    const [show, setShow] = useState(false)
  const [daten, setdaten] = useState(new Date())

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || daten;
        setdaten(currentDate);
        setShow(false)
        let temDate = new Date(currentDate)
        let fDate = temDate.getDate() + '/'+(temDate.getMonth() + 1) + '/' + temDate.getFullYear();
        setText(fDate)
      }
      const handleImageSelection = () => {
        navigation.navigate('ServiceDetail')};
    return(
      <ScrollView>
     <View style={styles.view}>
        
        <View style={styles.infoTextContainer}>
            <Text style={[styles.infoText,{fontFamily: 'Forum'}]}>Menu</Text>
        </View>
        <View style={styles.infoTextContainer}>
            <TouchableOpacity style={styles.button} onPress={() => setShow(true)} title='Seleccionar Fecha'>
                <Text style={styles.infoText}>FECHA</Text>   
            </TouchableOpacity>
            {show && (
            <DateTimePicker 
            value={daten} 
            onChange={onChange}
            display='spinner'
            mode='date'
            /> 
            )} 
        </View>
        <View style={styles.infoTextContainer}>
            <Text style={[styles.infoText,{fontFamily: 'Forum'}]}>{daten ? daten.toLocaleDateString('es-ES') : ''}</Text>
            <Text style={[styles.infoText,{fontFamily: 'Pavanam'}]}>El dia {daten ? daten.toLocaleDateString('es-ES') : ''} te presentamos el menu</Text>
        </View>
          
        <View style={styles.infoTextContainer}>
            <TouchableOpacity onPress={handleImageSelection}>
            <Image source={require('../assets/IMG_0136.jpg')} style={styles.image}/>
            </TouchableOpacity>
              <View style={styles.overlayContainer}>
                <View style={styles.overlayTextContainer}>
                    <Text style={styles.overlayText}>Nombre del plato</Text>
                </View>
              </View>
        </View>
        <View style={styles.infoTextContainer}>
          <Image source={require('../assets/IMG_0152.jpg')} style={styles.image}/>
            <View style={styles.overlayContainer}>
                <View style={styles.overlayTextContainer}>
                  <Text style={styles.overlayText}>Nombre del plato</Text>
                  </View>
                </View>
        </View>
        <View style={styles.infoTextContainer}>
          <Image source={require('../assets/IMG_0154.jpg')} style={styles.image}/>
            <View style={styles.overlayContainer}>
                <View style={styles.overlayTextContainer}>
                  <Text style={styles.overlayText}>Nombre del plato</Text>
                  </View>
                </View>
        </View>
        <View style={styles.infoTextContainer}>
          <Image source={require('../assets/IMG_0160.jpg')} style={styles.image}/>
            <View style={styles.overlayContainer}>
                <View style={styles.overlayTextContainer}>
                  <Text style={styles.overlayText}>Nombre del plato</Text>
                  </View>
                </View>
        </View>
      </View>
      </ScrollView>
    )
}
const styles = StyleSheet.create({
    backgroundReserva: {
        backgroundColor:'#C0BFB2',
      },
      button: {
        backgroundColor: '#C0BFB2', 
        alignItems: 'center',
        padding: 2,
        paddingBottom: 12,
        borderRadius: 5,
        margin:5,
        marginLeft:40,
        marginRight:40
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
        fontSize: 20,
        color: "#FFFFFF",
        marginTop: 10,
        textAlign: "left",
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
    image: {
        width: 326,
        height: 250,
        borderRadius:20,
      },
      overlayContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      overlayTextContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingVertical: '3%',
        paddingHorizontal: '34%',
      },
      overlayText: {
        color: '#FFFFFF',
        fontSize: 16,
      },
});
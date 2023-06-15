import React, {useState} from "react";
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput } from "react-native";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export const AddPlato = ({navigation}) => {

  const [fontsLoaded] = useFonts({
    Forum: require('../assets/Fonts/Forum-Regular.ttf')
})
const [count, setCount] = useState(0);

const increment = () => {
    setCount(count + 1);
};

const decrement = () => {
    setCount(count - 1);
};

const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  
return(
 <View style={styles.view} onLayout={onLayoutRootView}>
    <View style={styles.infoTextContainer}>
        <Text style={[styles.infoText,{fontFamily: 'Forum'}]}>Nombre del plato: </Text>
        <TextInput style={styles.textInput}/>
    </View>
    <View style={styles.infoTextContainer}>
        <Text style={[styles.infoText,{fontFamily: 'Forum'}]}>Deatlles: </Text>
        <TextInput 
        style={styles.textInputLarge}
        multiline={true}/>
    </View>
    <View style={styles.infoTextContainer}>
        <Button 
            title="Agregar foto"
            onPress={() => {
              const options = {
                title: 'Titulo del picker',
                cancelButtonTitle: 'Cancelar',
                takePhotoButtonTitle: 'Tomar Foto',
                chooseFromLibraryButtonTitle: 'Abrir Galeria',
              };
              launchImageLibrary(options, (res) => {
                console.log({ res });
              });
            }}
            
            />
    </View>
    {/* <View style={styles.infoTextContainer}>
        <Text style={[styles.infoText,{fontFamily: 'Forum'}]}>Reserva de plato</Text>
        <View style={styles.buttonContainer}> 
            <Picker>
                <Picker.Item label="Mes" />
            </Picker>
            <Picker>
                <Picker.Item label="Dia" />
            </Picker>
        </View>
        
    </View> */}
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
});
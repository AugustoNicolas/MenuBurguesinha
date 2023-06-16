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
        return (
          <ScrollView>
            <View style={styles.view}>
              <View style={styles.infoTextContainer}>
                <Text style={[styles.infoText, { fontFamily: "Forum" }]}>Menu</Text>
              </View>
              <View style={styles.infoTextContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setShow(true)}
                  title="Seleccionar Fecha"
                >
                  <Text style={styles.infoText}>FECHA</Text>
                </TouchableOpacity>
                {show && (
                  <DateTimePicker
                    value={daten}
                    onChange={onChange}
                    display="spinner"
                    mode="date"
                  />
                )}
              </View>
              <View style={styles.infoTextContainer}>
                <Text
                  style={[
                    styles.infoText,
                    { fontFamily: "Forum" },
                  ]}
                >
                  {daten ? daten.toLocaleDateString("es-ES") : ""}
                </Text>
                <Text
                  style={[
                    styles.infoText,
                    { fontFamily: "Pavanam" },
                  ]}
                >
                  El dia {daten ? daten.toLocaleDateString("es-ES") : ""} te presentamos el menu
                </Text>
              </View>
              <View style={styles.infoTextContainer}>
                <TouchableOpacity onPress={handleImageSelection}>
                  <Image
                    source={require("../assets/IMG_0136.jpg")}
                    style={styles.image}
                  />
                </TouchableOpacity>
                <View style={styles.overlayContainer}>
                  <View style={styles.overlayTextContainer}>
                    <Text style={styles.overlayText}>Nombre del plato</Text>
                  </View>
                </View>
              </View>
              <View style={styles.infoTextContainer}>
                <Image
                  source={require("../assets/IMG_0152.jpg")}
                  style={styles.image}
                />
                <View style={styles.overlayContainer}>
                  <View style={styles.overlayTextContainer}>
                    <Text style={styles.overlayText}>Nombre del plato</Text>
                  </View>
                </View>
              </View>
              <View style={styles.infoTextContainer}>
                <Image
                  source={require("../assets/IMG_0154.jpg")}
                  style={styles.image}
                />
                <View style={styles.overlayContainer}>
                  <View style={styles.overlayTextContainer}>
                    <Text style={styles.overlayText}>Nombre del plato</Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        );
      };
      
      const styles = StyleSheet.create({
        view: {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 50,
          backgroundColor: "#fff",
        },
        infoTextContainer: {
          marginBottom: 20,
          alignItems: "center",
        },
        infoText: {
          fontSize: 18,
          color: "#000",
          fontFamily: "Pavanam",
        },
        button: {
          alignItems: "center",
          backgroundColor: "#DDDDDD",
          padding: 10,
          marginBottom: 10,
        },
        image: {
          width: 200,
          height: 200,
          resizeMode: "cover",
        },
        overlayContainer: {
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          justifyContent: "center",
          alignItems: "center",
        },
        overlayTextContainer: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          padding: 10,
        },
        overlayText: {
          color: "#fff",
          fontSize: 18,
          fontWeight: "bold",
        },
      });
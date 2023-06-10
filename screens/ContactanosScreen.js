import React from "react";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

export const ContactanosScreen = () => {
  const navigation = useNavigation();

  const handleInstagramPress = () => {
    const url = "https://www.instagram.com/restaurante.escuela.udi/";
    Linking.openURL(url);
  };

  const handleWhatsappPress = () => {
    const url =
      "https://api.whatsapp.com/send/?phone=71399694&text=%C2%A1Estoy+interesado%21&type=phone_number&app_absent=0";
    Linking.openURL(url);
  };

  const handleFacebookPress = () => {
    const url = "https://www.facebook.com/Restaurante.Escuela.UDI.by.Dossier";
    Linking.openURL(url);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("@user");
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={styles.view}>
      <View style={styles.iconContainer}>
        <View style={styles.iconButton}>
          <TouchableOpacity onPress={handleInstagramPress}>
            <Icon name="instagram" size={50} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.iconText}>Instagram</Text>
        </View>

        <View style={styles.iconButtonCenter}>
          <TouchableOpacity onPress={handleWhatsappPress}>
            <Icon name="whatsapp" size={50} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.iconText}>WhatsApp</Text>
        </View>

        <View style={styles.iconButton}>
          <TouchableOpacity onPress={handleFacebookPress}>
            <Icon name="facebook-official" size={50} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.iconText}>Facebook</Text>
        </View>
      </View>
      <View style={styles.line}></View>
      <View style={styles.infoTextContainer}>
        <Text style={styles.infoText}>Vive la experiencia Dossier</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={require("../assets/IMG_5843.jpg")} style={styles.image} />
      </View>
      <View style={styles.infoTextContainer}>
        <Text style={styles.paragraph}>
          Ave Maria, gratia plena, Dominus Tecum. Benedicta Tu in mulieribus, et benedictus fructus ventris Tui, Iesus. Sancta
          Maria, Mater Dei, ora pro nobis peccatoribus, nunc, et in hora mortis nostrae.
        </Text>
      </View>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Desloguearse</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
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
  logoutButton: {
    marginTop: 10,
  },
  logoutButtonText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
};

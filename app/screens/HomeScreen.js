import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  TextInput,
  Modal,
  Button,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-simple-toast";

import addressesApi from "./../api/adress";
import AppActivityIndicator from "../components/AppActivityIndicator";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import Playlist from "../components/Playlist";
import routes from "../navigation/routes";
import useLocation from "../hooks/useLocation";
import useApi from "../hooks/useApi";

export default function HomeScreen() {
  const origin = useLocation();
  const codeInfoApi = useApi(addressesApi.getCodeInfos);
  navigation = useNavigation();

  const [code, setCode] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [destination, setDestination] = useState();
  const [audioUri, setAudioUri] = useState("");

  // code = DAK-PA-HGY-331E
  const updateSearch = async () => {
    const response = await codeInfoApi.request(code);
    if (!response.ok) {
      Toast.show(
        "Ce code n'est pas répertorié dans la base de donnée!",
        Toast.LONG
      );
      return;
    }
    const { latitude, longitude, uri } = response.data;
    if (latitude && longitude)
      setDestination({ latitude: latitude, longitude: longitude });
    else {
      Toast.show(
        "Ce code n'est pas répertorié dans la base de donnée!",
        Toast.LONG
      );
      return;
    }
    if (uri) setAudioUri(uri);
  };

  const goToMap = () => {
    console.info("Destination", destination);
    if (destination)
      navigation.navigate(routes.MAP, {
        origin,
        destination,
      });
    else alert("Un problème est survenu...");
  };

  if (!origin) return <AppActivityIndicator visible={true} />;

  return (
    <>
      <AppActivityIndicator visible={codeInfoApi.loading} />
      <View style={styles.container}>
        {/* <Header /> */}
        <ImageBackground
          style={styles.image}
          source={require("./../assets/road2.webp")}
        >
          <Animatable.View
            animation="slideInRight"
            duration={500}
            style={styles.searchContainer}
          >
            <Ionicons name="ios-search" size={24} color="black" />
            <TextInput
              clearButtonMode="while-editing"
              placeholder="Entrer le code"
              onEndEditing={(e) => setCode(e.nativeEvent.text)}
              style={styles.searchInput}
              autoCapitalize="characters"
            />
          </Animatable.View>
          {code && (
            <AppButton
              icon="account-search"
              title="Trouver"
              onPress={() => updateSearch()}
            />
          )}
          {destination && (
            <AppButton icon="map" title="Carte" onPress={() => goToMap()} />
          )}
          {audioUri !== "" && (
            <AppButton
              icon="voice"
              title="Écouter vocal"
              onPress={() => setModalVisible(true)}
            />
          )}
        </ImageBackground>

        <Modal visible={modalVisible} animationType="slide">
          <Button title="Close" onPress={() => setModalVisible(false)} />
          <Playlist audioUri={audioUri} />
        </Modal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center", // main axis
    alignItems: "center", // secondary axis
  },
  image: {
    width: "100%",
    height: "100%",
    flex: 8,
  },
  searchContainer: {
    height: 50,
    backgroundColor: "white",
    flexDirection: "row",
    padding: 10,
    marginTop: 60,
    marginLeft: 2,
    alignItems: "center",
    borderRadius: 50,
  },
  searchInput: {
    fontSize: 24,
    marginLeft: 15,
  },
});

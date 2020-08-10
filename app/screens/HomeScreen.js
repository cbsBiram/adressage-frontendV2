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
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import Header from "../sections/Header";
import Playlist from "../components/Playlist";
import routes from "../navigation/routes";
import useLocation from "../hooks/useLocation";
import UploadScreen from "./UploadScreen";
import AppActivityIndicator from "../components/AppActivityIndicator";

export default function HomeScreen() {
  const currentPosition = useLocation();
  navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [where, setWhere] = useState();
  const [audioUri, setAudioUri] = useState("");
  const [progress, setProgress] = useState(0);
  const [uploadVisible, setUploadVisible] = useState(0);

  // code = DAK-PA-HGY-1093B
  const updateSearch = async (code) => {
    const response = await addressesApi.getCodeInfos(code, (progress) =>
      setProgress(progress)
    );
    if (!response.ok) {
      Toast.show(
        "Ce code n'est pas répertorié dans la base de donnée!",
        Toast.LONG
      );
      return;
    }
    const { latitude, longitude, uri } = response.data;
    setWhere({ latitude: latitude, longitude: longitude });
    if (uri) setAudioUri(uri);
    console.log("Audio URI:", audioUri);
  };

  const goToMap = () => {
    if (where)
      navigation.navigate(routes.MAP, {
        currentPosition,
        where,
      });
    else alert("Un problème est survenu...");
  };

  if (!currentPosition) return <AppActivityIndicator visible={true} />;

  return (
    <View style={styles.container}>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
      <Header />

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
            placeholder="Search"
            returnKeyType="search"
            onSubmitEditing={(e) => updateSearch(e.nativeEvent.text)}
            style={styles.searchInput}
            autoCapitalize="characters"
          />
        </Animatable.View>
        {audioUri !== "" && (
          <>
            <AppButton
              icon="map"
              title="Rechercher"
              onPress={() => goToMap()}
            />
            <AppButton
              icon="voice"
              title="Écouter vocal"
              onPress={() => setModalVisible(true)}
            />
          </>
        )}
      </ImageBackground>

      <Modal visible={modalVisible} animationType="slide">
        <Button title="Close" onPress={() => setModalVisible(false)} />
        <Playlist audioUri={audioUri} />
      </Modal>
    </View>
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

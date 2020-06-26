import React from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import Toast from "react-native-simple-toast";

import Header from "../sections/Header";
import colors from "../config/colors";
import { getCodeInfos } from "../services/addressServices";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      positionCode: { longitude: null, latitude: null },
      where: { lat: null, lng: null },
    };
  }

  componentDidMount() {
    let geoOptions = {
      enableHighAccuracy: true,
      timeOut: 10000,
      maximumAge: 5000,
    };
    this.setState({ ready: false });
    navigator.geolocation.getCurrentPosition(
      this.geoSuccess,
      this.geoFailure,
      geoOptions
    );
  }

  geoSuccess = (position) => {
    this.setState({
      ready: true,
      where: { lat: position.coords.latitude, lng: position.coords.longitude },
    });
  };

  geoFailure = (err) => {
    this.setState({ error: err.message });
  };

  // code = DAK-PA-HGY-1093B

  updateSearch = (query) => {
    getCodeInfos(query).then(({ data }) => {
      if (data.longitude && data.latitude) {
        this.setState({
          positionCode: { longitude: data.longitude, latitude: data.latitude },
        });

        const { where } = this.state;
        const { navigation } = this.props;

        navigation.navigate("MapScreen", {
          userPosition: { userLatitude: where.lat, userLongitude: where.lng },
          codePosition: {
            codeLatitude: data.latitude,
            codeLongitude: data.longitude,
          },
        });
      } else
        Toast.show(
          "Ce code n'est pas répertorié dans la base de données !",
          Toast.LONG
        );
    });
  };

  render() {
    let { where } = this.state;

    if (!where.lat || !where.lng)
      return (
        <ActivityIndicator size="large" color="#35605a" style={{ flex: 2 }} />
      );

    return (
      <View style={styles.container}>
        <Header />

        <ImageBackground
          style={styles.image}
          source={require("../../assets/road2.webp")}
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
              onSubmitEditing={(e) => this.updateSearch(e.nativeEvent.text)}
              style={styles.searchInput}
              autoCapitalize="characters"
            />
          </Animatable.View>
        </ImageBackground>
      </View>
    );
  }
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

export default HomeScreen;

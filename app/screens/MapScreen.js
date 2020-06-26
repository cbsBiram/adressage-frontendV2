import React from "react";
import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";

function MapScreen(props) {
  let {
    userPosition: { userLatitude, userLongitude },
    codePosition: { codeLatitude, codeLongitude },
  } = props.route.params;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: userLatitude,
          longitude: userLongitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        followUserLocation={true}
        minZoomLevel={12}
      >
        <MapView.Marker
          title="Your Position"
          coordinate={{ latitude: userLatitude, longitude: userLongitude }}
        />
        <MapView.Marker
          title="Position related to the code"
          coordinate={{ latitude: codeLatitude, longitude: codeLongitude }}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
  },
});

export default MapScreen;

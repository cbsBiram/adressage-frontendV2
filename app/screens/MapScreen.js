import React from "react";
import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";

function MapScreen({ route }) {
  let { currentPosition, where } = route.params;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: currentPosition.latitude,
          longitude: currentPosition.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        followUserLocation={true}
        minZoomLevel={10}
      >
        <MapView.Marker
          title="Your Position"
          coordinate={{
            latitude: currentPosition.latitude,
            longitude: currentPosition.longitude,
          }}
        />
        <MapView.Marker
          title="Position related to the code"
          coordinate={{
            latitude: where.latitude,
            longitude: where.longitude,
          }}
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

import React from "react";
import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

function MapScreen({ route }) {
  let { origin, destination } = route.params;
  const GOOGLE_MAPS_APIKEY = "AIzaSyBePd8ENZ2D-7oqEHZtiSzg1C6LThmjifs";

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        followUserLocation={true}
        minZoomLevel={10}
      >
        <MapView.Marker
          title="Votre Position"
          coordinate={{
            latitude: origin.latitude,
            longitude: origin.longitude,
          }}
        />
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="hotpink"
        />
        <MapView.Marker
          title="Destination"
          coordinate={{
            latitude: destination.latitude,
            longitude: destination.longitude,
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

import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import colors from "../config/colors";
import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/MapScreen";

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 25,
        fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
        paddingLeft: 5,
      },
      // headerTitleAlign: "center",
      headerTintColor: colors.primary,
    }}
  >
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ title: "Accueil" }}
    />
    <Stack.Screen
      name="Map"
      component={MapScreen}
      options={{ title: "Carte" }}
    />
  </Stack.Navigator>
);

export default AppNavigator;

import React from "react";
import { StyleSheet, Text, View, Image, Platform } from "react-native";

import colors from "../config/colors";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.headStyle}>
        <Image
          style={styles.logoStyle}
          source={require("./../assets/logo.jpeg")}
        />
        <Text style={styles.headText}>MyHali</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headText: {
    textAlign: "left",
    textAlignVertical: "center",
    color: colors.primary,
    marginLeft: 10,
    fontSize: 45,
    fontStyle: "italic",
    flex: 4,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
  headStyle: {
    paddingTop: 20,
    paddingBottom: 10,
    paddingRight: 10,
    backgroundColor: colors.white,
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 2,
    borderColor: colors.black,
  },
  logoStyle: {
    flex: 1.5,
    width: undefined,
    height: undefined,
  },
});

import React from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import { Text, SearchBar } from "react-native-elements";
import Header from "./../sections/Header";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: "" };
  }

  updateSearch = (query) => {
    this.setState({ query });
  };

  render() {
    let { query } = this.state;

    return (
      <View style={styles.container}>
        <Header />

        <ImageBackground
          style={styles.image}
          source={require("../../assets/road2.webp")}
        >
          <SearchBar
            placeholder="Search..."
            lightTheme={true}
            containerStyle={{
              backgroundColor: "#FBFBFB",
              borderRadius: 10,
              borderBottomColor: "transparent",
              borderTopColor: "transparent",
              marginTop: 30,
            }}
            onChangeText={(text) => this.updateSearch(text)}
            value={query}
          />
          <Text
            h2
            style={styles.text}
            style={{
              textAlign: "center",
              marginTop: 20,
              color: "#FF8C00",
            }}
          >
            Junior
          </Text>
          <Text h5 style={styles.text}>
            Entrer le code dans la barre de recherche pour rechercher la
            localisation
          </Text>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonGroup: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-around",
    marginTop: 15,
  },
  image: {
    width: undefined,
    height: undefined,
    flex: 8,
  },
  text: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 20,
    marginLeft: 5,
    color: "#ffffff",
  },
});

export default Home;

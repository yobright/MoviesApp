import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  ActivityIndicator,
} from "react-native";
import { getFilms } from "../API/TMDBApi";
import FilmItem from "./FilmItem";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.page = 0;
    this.totalpages = 0;
    this.searchedText = "";
    this.state = {
      films: [],
      isLoading: false,
    };
  }

  _displayFilmDetail = (idFilm) => {
    console.log("display film with id " + idFilm)
  }

  _loadFilms() {
    if (this.searchedText.length > 0) {
      this.setState({ isLoading: true });
      getFilms(this.searchedText, this.page + 1).then((data) => {
        this.page = data.page;
        this.totalPages = data.total_pages;
        this.setState({
          films: [...this.state.films, ...data.results],
          //  Notre but ici est d'ajouter les films à ceux que l'on a déjà récupérés ou films: this.state.films.concat(data.results)
          isLoading: false,
        });
      });
    }
  }

  _onChangeText = (text) => {
    this.searchedText = text;
  };

  _searchFilms() {
    this.page = 0;
    this.totalPages = 0;
    this.setState(
      {
        films: [],
      },
      () => {
        // paramètre  callback  qui permet d'exécuter une action dès que notre state a fini de se mettre à jour.
        this._loadFilms();
      }
    );
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.main_container}>
        <TextInput
          placeholder="Titre du Film"
          style={styles.textinput}
          onChangeText={(text) => this._onChangeText(text)}
          onSubmitEditing={() => this._searchFilms()}
        />
        <Button title="Rechercher" onPress={() => this._searchFilms()} />
        <FlatList
          data={this.state.films}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <FilmItem film={item} displayFilmDetail={this._displayFilmDetail} />}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (this.page < this.totalPages) {
              // this._loadFilms();
              console.log("Ok fin atteinte")
            }
          }}
        />
        {this._displayLoading()}
      </View>
    );
  } 
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    height: 50,
    borderColor: "#000",
    borderWidth: 1,
    paddingLeft: 5,
  },
  loading_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 300,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});

export { Search };

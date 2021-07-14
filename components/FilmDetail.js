import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import { getFilmDetail } from "../API/TMDBApi";
import moment from "moment";
import numeral from "numeral";
import { connect } from "react-redux";

class FilmDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      film: undefined,
      isLoading: true,
    };
  }

  componentDidMount() {
    getFilmDetail(this.props.route.params.idFilm).then((data) => {
      this.setState({
        film: data,
        isLoading: false,
      });
    });
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

  _toggleFavorite() {
    const action = { type: "TOGGLE_FAVORITE", value: this.state.film };
    this.props.dispatch(action);
  }

  _displayFavoriteIcone() {
    var sourceImage = require("../images/not_favorite_icone.png");
    if (
      this.props.favoritesFilm.findIndex(
        (item) => item.id === this.state.film.id
      ) !== -1
    ) {
      sourceImage = require("../images/favorite_icone.png");
    }
    return <Image source={sourceImage} style={styles.icone_container} />;
  }

  _displayFilm() {
    if (this.state.film != undefined) {
      return (
        <ScrollView style={styles.scrollview_container}>
          {console.log(this.state.film)}
          <Image
            style={styles.poster_container}
            source={{
              uri:
                "https://image.tmdb.org/t/p/w300" +
                this.state.film.backdrop_path,
            }}
          />
          <Text style={styles.title_container}>{this.state.film.title}</Text>
          <Pressable
            style={styles.favorite_container}
            onPress={() => this._toggleFavorite()}
          >
            {this._displayFavoriteIcone()}
          </Pressable>

          <View style={styles.description_container}>
            {this.state.film.overview}
          </View>

          <Text style={styles.information}>
            Sorti le :{" "}
            {moment(new Date(this.state.film.release_date)).format(
              "DD/MM/YYYY"
            )}
          </Text>
          <Text style={styles.information}>
            Note : {this.state.film.vote_average} / 10{" "}
          </Text>
          <Text style={styles.information}>
            Nombres de votes : {this.state.film.vote_count}{" "}
          </Text>
          <Text style={styles.information}>
            Budget : {numeral(this.state.film.budget).format("0,0[.]00 $")}{" "}
          </Text>
          <Text style={styles.information}>
            Genre(s) :{" "}
            {this.state.film.genres.map((item) => item.name).join(" / ")}{" "}
          </Text>
          <Text style={styles.information}>
            Compagnie(s) :{" "}
            {this.state.film.production_companies
              .map((item) => item.name)
              .join(" / ")}
          </Text>
        </ScrollView>
      );
    }
  }

  render() {
    return (
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayFilm()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },

  loading_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollview_container: {
    flex: 1,
  },
  poster_container: {
    width: "100%",
    height: 250,
    margin: 5,
  },
  title_container: {
    textAlign: "center",
    margin: 5,
    fontSize: 30,
    fontWeight: "bold",
    flexWrap: "wrap",
  },
  description_container: {
    fontStyle: "italic",
    color: "#666666",
    margin: 5,
  },
  information: {
    margin: 4,
    fontSize: 16,
    fontWeight: "bold",
  },
  favorite_container: {
    alignItems: "center",
  },
  icone_container: {
    width: 40,
    height: 40,
  },
});

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm,
  };
};

export default connect(mapStateToProps)(FilmDetail);

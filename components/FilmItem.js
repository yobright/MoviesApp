// Components/FilmItem.js

import React from 'react'
import { StyleSheet, View, Text, Image, Pressable } from 'react-native'

class FilmItem extends React.Component {
  render() {
    
     return (
      <Pressable 
        style={styles.main_container}
        onPress={() => this.props.displayFilmDetail(this.props.film.id)}
        >  
      
        <Image
          style={styles.image}
          source={{uri: 'https://image.tmdb.org/t/p/w300'+this.props.film.poster_path}}
        />
        <View style={styles.content_container}>
          <View style={styles.header_container}>
            <Text style={styles.title_text} numberOfLines={2} > {this.props.film.title} </Text>
            <Text style={styles.vote_text}> {this.props.film.vote_average} </Text>
          </View>
          <View style={styles.description_container}>
            <Text style={styles.description_text} numberOfLines={6}>{this.props.film.overview}</Text>
          </View>
          <View style={styles.date_container}>
            <Text style={styles.date_text}> {this.props.film.release_date} </Text>
          </View>
        </View>
      </Pressable>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 190,
    flexDirection: 'row'
  },
  image: {
    width: 120,
    height: 180,
    margin: 5,
    backgroundColor: 'gray'
  },
  content_container: {
    flex: 1,
    margin: 5
  },
  header_container: {
    flex: 3,
    flexDirection: 'row'
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5
  },
  vote_text: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#666666'
  },
  description_container: {
    flex: 7
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666'
  },
  date_container: {
    flex: 1
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14
  }
})

export default FilmItem
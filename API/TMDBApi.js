const API_TOKEN = "9de1a4534ebbc6d2e0f48f458f09d5ee"; 

export function getFilms(text, page) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + "&page=" + page
    return fetch(url) 
        .then((response) => response.json())
        .catch((error) => console.error(error))
}


export function getFilmDetail (id) {
    return fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_TOKEN + '&language=fr')
      .then((response) => response.json())
      .catch((error) => console.error(error));
  }


const initialState = { favoritesFilm: [] };

const toggleFavorite = (state = initialState, action) => {
  let nextState;
  switch (action.type) {
    case "TOGGLE_FAVORITE":
      const favoritesFilmIndex = state.favoritesFilm.findIndex(
        (item) => item.id === action.value.id
      );
      if (favoritesFilmIndex !== -1) {
        // Le film est déjà dans les favoris, on le supprime de la liste
        nextState = {
          ...state,
          favoritesFilm: state.favoritesFilm.filter(
            (item, index) => index !== favoritesFilmIndex
          ),
        };
      } else {
        // le film n'est pas dans les favoris
        nextState = {
          ...state,
          favoritesFilm: [...state.favoritesFilm, action.value],
        };
      }
      return nextState || state;

    default:
      return state;
  }
};

export default toggleFavorite
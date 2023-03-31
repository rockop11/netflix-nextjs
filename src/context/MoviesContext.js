import { createContext, useState, useRef } from "react";
import { updateDoc, doc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../../firebase";
import { useUser } from "@auth0/nextjs-auth0/client";
//Services
import { searchMovies, getFavoritesMoviesFromFirestore } from "services";

const MoviesContext = createContext({
  showMovieInfoHandler: () => {},
});

export const MoviesContextProvider = ({ children }) => {
  const { user } = useUser();

  const inputSearchRef = useRef(null);

  const [showMovieInfo, setShowMovieInfo] = useState(false);
  const [searchValue, setSearchValue] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const addMovieToFavorites = async (movie) => {
    await updateDoc(doc(db, "usuarios", `${user.email}`), {
      favoritesList: arrayUnion(movie),
    });
  };

  const deleteMovieFromFavorites = async (id) => {
    const favoritesMovies = await getFavoritesMoviesFromFirestore(user.email);

    const [movieToDelete] = favoritesMovies.filter((movie) => {
      return movie.id === id;
    });

    await updateDoc(doc(db, "usuarios", `${user.email}`), {
      favoritesList: arrayRemove(movieToDelete),
    });
  };

  const showMovieInfoHandler = () => {
    setShowMovieInfo(true);
  };

  const searchValueHandler = () => {
    setSearchValue(inputSearchRef.current.value);
  };

  const submitFormHandler = async (e) => {
    e.preventDefault();
    const response = await searchMovies(searchValue);
    setSearchResults(response);
  };

  const resetSearch = () => {
    inputSearchRef.current.value = "";
    setSearchResults([]);
  };

  const context = {
    showMovieInfo,
    searchResults,
    showMovieInfoHandler,
    searchValueHandler,
    submitFormHandler,
    resetSearch,
    addMovieToFavorites,
    deleteMovieFromFavorites,
    inputSearchRef,
  };

  return (
    <MoviesContext.Provider value={context}>{children}</MoviesContext.Provider>
  );
};

export default MoviesContext;

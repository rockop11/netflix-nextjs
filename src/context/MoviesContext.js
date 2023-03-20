import { createContext, useState, useRef } from "react";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { useUser } from "@auth0/nextjs-auth0/client";

import { searchMovies } from "services";

const MoviesContext = createContext({
  favorites: [],
  showMovieInfoHandler: () => {},
});

export const MoviesContextProvider = ({ children }) => {
  const [favoritesList, setFavoritesList] = useState([]);
  const [showMovieInfo, setShowMovieInfo] = useState(false);
  const [searchValue, setSearchValue] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const { user } = useUser();

  const inputSearchRef = useRef(null);

  const data = {
    movies: [
      {
        adult: false,
        backdrop_path: "/2Eewgp7o5AU1xCataDmiIL2nYxd.jpg",
        belongs_to_collection: null,
        budget: 0,
        genres: [
          { id: 18, name: "Drama" },
          { id: 36, name: "Historia" },
        ],
        homepage: "",
        id: 943822,
        imdb_id: "tt4471908",
        original_language: "en",
        original_title: "Prizefighter: The Life of Jem Belcher",
        overview:
          "A principios del siglo XIX, el pugilismo era el deporte de los reyes y un talentoso joven boxeador luchó para convertirse en campeón de Inglaterra.",
        popularity: 3136.216,
        poster_path: "/grjCm3K0eWgNT7gHsE766oXs0VW.jpg",
        production_companies: [],
        production_countries: [{ iso_3166_1: "GB", name: "United Kingdom" }],
        release_date: "2022-06-30",
        revenue: 0,
        runtime: 107,
        spoken_languages: [
          { english_name: "English", iso_639_1: "en", name: "English" },
        ],
        status: "Released",
        tagline: "El origen del boxeo",
        title: "La forja de un campeón",
        video: false,
        vote_average: 7.223,
        vote_count: 56,
      },
    ],
  };

  //si ya existe el usuario, sobreescribe el valor que ya tiene previamnente
  const setDocumentId = async () => {
    await setDoc(doc(db, "usuarios", `${user.email}`), data);
  };

  //Agrega peliculas al array de favoritas, falta logica de discriminar por ID sin ya esta agregada.
  const addMovieToFavorites = async (movie) => {
    console.log(`agregaste la pelicula ${movie}`);
    setFavoritesList([...favoritesList, movie]);
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
    favoritesList,
    showMovieInfoHandler,
    searchValueHandler,
    submitFormHandler,
    resetSearch,
    addMovieToFavorites,
    setDocumentId,
    inputSearchRef,
  };

  return (
    <MoviesContext.Provider value={context}>{children}</MoviesContext.Provider>
  );
};

export default MoviesContext;

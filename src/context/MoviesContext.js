import { createContext, useState, useRef } from "react";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import { db } from "../../firebase";
import { useUser } from "@auth0/nextjs-auth0/client";

import { searchMovies } from "services";

const MoviesContext = createContext({
  showMovieInfoHandler: () => {},
});

export const MoviesContextProvider = ({ children }) => {
  const [showMovieInfo, setShowMovieInfo] = useState(false);
  const [searchValue, setSearchValue] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const { user } = useUser();

  const inputSearchRef = useRef(null);

  const addMovieToFavorites = async (movie) => {
    console.log(`agregaste la pelicula ${movie.title}`);
    await updateDoc(doc(db, "usuarios", `${user.email}`), {
      favoritesList: arrayUnion(movie),
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
    inputSearchRef,
  };

  return (
    <MoviesContext.Provider value={context}>{children}</MoviesContext.Provider>
  );
};

export default MoviesContext;

// const data = {
//   movies: [
//     {
//       adult: false,
//       backdrop_path: "/2Eewgp7o5AU1xCataDmiIL2nYxd.jpg",
//       belongs_to_collection: null,
//       budget: 0,
//       genres: [
//         { id: 18, name: "Drama" },
//         { id: 36, name: "Historia" },
//       ],
//       homepage: "",
//       id: 943822,
//       imdb_id: "tt4471908",
//       original_language: "en",
//       original_title: "Prizefighter: The Life of Jem Belcher",
//       overview:
//         "A principios del siglo XIX, el pugilismo era el deporte de los reyes y un talentoso joven boxeador luchó para convertirse en campeón de Inglaterra.",
//       popularity: 3136.216,
//       poster_path: "/grjCm3K0eWgNT7gHsE766oXs0VW.jpg",
//       production_companies: [],
//       production_countries: [{ iso_3166_1: "GB", name: "United Kingdom" }],
//       release_date: "2022-06-30",
//       revenue: 0,
//       runtime: 107,
//       spoken_languages: [
//         { english_name: "English", iso_639_1: "en", name: "English" },
//       ],
//       status: "Released",
//       tagline: "El origen del boxeo",
//       title: "La forja de un campeón",
//       video: false,
//       vote_average: 7.223,
//       vote_count: 56,
//     },
//     {
//       adult: false,
//       backdrop_path: "/wybmSmviUXxlBmX44gtpow5Y9TB.jpg",
//       belongs_to_collection: {
//         id: 724848,
//         name: "Shazam - Colección",
//         poster_path: "/5C3zeyCrwLI2xqbGOdtRPTqJMjj.jpg",
//         backdrop_path: "/f4yI8N85HRQ04MvejdAAPNIQZCt.jpg",
//       },
//       budget: 125000000,
//       genres: [
//         { id: 28, name: "Acción" },
//         { id: 35, name: "Comedia" },
//         { id: 14, name: "Fantasía" },
//       ],
//       homepage: "https://cuevana3.mu",
//       id: 594767,
//       imdb_id: "tt10151854",
//       original_language: "en",
//       original_title: "Shazam! Fury of the Gods",
//       overview:
//         'Billy Batson y sus hermanos adoptivos, que se transforman en superhéroes al decir "¡Shazam!", se ven obligados a volver a la acción y luchar contra las Hijas de Atlas, a quienes deben evitar que use un arma que podría destruir el mundo.',
//       popularity: 1861.911,
//       poster_path: "/rdYEj6wJd6lbMiHpIN4rXTYNGn1.jpg",
//       production_companies: [
//         {
//           id: 12,
//           logo_path: "/5ThIuO93vsk47oexKTSdfKEr7EC.png",
//           name: "New Line Cinema",
//           origin_country: "US",
//         },
//         {
//           id: 11565,
//           logo_path: null,
//           name: "The Safran Company",
//           origin_country: "US",
//         },
//         {
//           id: 128064,
//           logo_path: "/13F3Jf7EFAcREU0xzZqJnVnyGXu.png",
//           name: "DC Films",
//           origin_country: "US",
//         },
//       ],
//       production_countries: [
//         { iso_3166_1: "US", name: "United States of America" },
//       ],
//       release_date: "2023-03-15",
//       revenue: 65000000,
//       runtime: 130,
//       spoken_languages: [
//         { english_name: "English", iso_639_1: "en", name: "English" },
//       ],
//       status: "Released",
//       tagline: "Oh. Por. Dioses.",
//       title: "¡Shazam! La furia de los dioses",
//       video: false,
//       vote_average: 7.272,
//       vote_count: 156,
//     },
//   ],
// };

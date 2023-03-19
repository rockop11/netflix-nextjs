import { createContext, useState, useRef } from "react";
import { searchMovies } from "services";

const MoviesContext = createContext({
  favorites: [],
  showMovieInfoHandler: () => {},
});

export const MoviesContextProvider = ({ children }) => {
  const [showMovieInfo, setShowMovieInfo] = useState(false);
  const [searchValue, setSearchValue] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const inputSearchRef = useRef(null);

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
    inputSearchRef,
  };

  return (
    <MoviesContext.Provider value={context}>{children}</MoviesContext.Provider>
  );
};

export default MoviesContext;

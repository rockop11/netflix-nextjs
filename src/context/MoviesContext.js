import { createContext, useState, useRef } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { searchMovies } from "services";

const MoviesContext = createContext({
  user: {},
  favorites: [],
  loginFirebaseHandler: () => {},
  showMovieInfoHandler: () => {},
});

export const MoviesContextProvider = ({ children }) => {
  const [showMovieInfo, setShowMovieInfo] = useState(false);
  const [searchValue, setSearchValue] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [user, setUser] = useState(null);

  const inputSearchRef = useRef(null);

  const loginFirebaseHandler = async () => {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    setUser(user);
  };

  const logout = async () => {
    signOut(auth);
    setUser(null);
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
    user,
    loginFirebaseHandler,
    logout,
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

import { useContext } from "react";

import MoviesContext from "context/MoviesContext";

import styles from "./seacrhResults.module.css";

import { MovieCard } from "..";

export const SearchResults = () => {
  const { searchResults, resetSearch } = useContext(MoviesContext);
  const imagePath = "https://image.tmdb.org/t/p/w500";

  return (
    <div className={styles.pageContainer}>
      <button className={styles.button} onClick={resetSearch}>
        Limpiar búsqueda
      </button>
      <div className={styles.resultsContainer}>
        {searchResults.map((movie) => {
          return <MovieCard movie={movie} key={movie.id} />;
        })}
      </div>
    </div>
  );
};

import { useContext } from "react";
import MoviesContext from "context/MoviesContext";
//Components
import { MovieCard } from "..";
//Styles
import styles from "./searchResults.module.css";

export const SearchResults = () => {
  const { searchResults, resetSearch } = useContext(MoviesContext);

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

import { useContext } from "react";
import MoviesContext from "context/MoviesContext";
//Components
import { FavMovieCard } from "@components/index";
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
          return (
            <div className={styles.movieContainer} key={movie.id}>
              <FavMovieCard movie={movie} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

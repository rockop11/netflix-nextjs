import React from "react";
import { MovieCard } from "../index";

import styles from "./movieList.module.css";

export const MovieList = ({ movies, title }) => {
  return (
    <>
      <h4 className={styles.sectionTitle}>{title}</h4>
      <div className={styles.movieListContainer}>
        {movies.map((movie, i) => {
          return <MovieCard movie={movie} key={i} />;
        })}
      </div>
    </>
  );
};

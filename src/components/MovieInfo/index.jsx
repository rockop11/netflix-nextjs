import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0/client";
import MoviesContext from "context/MoviesContext";
import Image from "next/image";
//Services
import { getFavoritesMoviesFromFirestore } from "services";
//Icon
import { HiOutlineStar, HiStar, HiThumbUp, HiX } from "react-icons/hi";
//Styles
import styles from "./movieInfo.module.css";

export const MovieInfo = ({ movie }) => {
  const { addMovieToFavorites } = useContext(MoviesContext);
  const { user } = useUser();
  const router = useRouter();
  const { id } = router.query;

  const imagePath = "https://image.tmdb.org/t/p/original";
  const movieYear = movie.release_date.split("-")[0];

  const [containsMovie, setContainesMovie] = useState(null);
  const [fav, setFav] = useState(false);

  const getFavoritesMovies = async () => {
    const moviesList = await getFavoritesMoviesFromFirestore(user.email);
    const isFavorite = moviesList.find((movie) => {
      return movie.id == id;
    });
    setContainesMovie(isFavorite);
  };

  const addMovieToFavsHandler = async () => {
    await addMovieToFavorites(movie);
    setFav(true);
  };

  const handleCloseMovieDetail = () => {
    router.back();
  };

  useEffect(() => {
    getFavoritesMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fav]);

  return (
    <div className={styles.container}>
      <div className={styles.closeModal} onClick={handleCloseMovieDetail}>
        <HiX size={"25px"} />
      </div>
      <div className={styles.iconContainer} onClick={addMovieToFavsHandler}>
        {containsMovie || fav ? (
          <HiStar size={"25px"} color="yellow" />
        ) : (
          <HiOutlineStar size={"20px"} />
        )}
      </div>

      <div className={styles.imageContainer}>
        <Image
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          src={imagePath + movie.poster_path}
          alt={`${movie.title}-picture`}
          priority
        />
      </div>

      <div className={styles.gradient} />

      <div className={styles.movieInfo}>
        <p
          style={{
            marginBottom: "10px",
          }}
        >
          {movieYear} - {movie.runtime} min.
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <HiThumbUp size={"20px"} />
          <span style={{ paddingLeft: "8px" }}>{movie.vote_average}</span>
        </div>

        <p style={{ color: "#c6bcbc", fontWeight: "bold", marginTop: "10px" }}>
          Géneros:{" "}
        </p>
        {movie.genres.map((genre, i) => {
          return (
            <p key={i} style={{ fontSize: "14px" }}>
              {genre.name}
            </p>
          );
        })}

        <h3 className={styles.movieTitle}>{movie.title}</h3>
        <p className={styles.movieOverview}>{movie.overview}</p>
      </div>
    </div>
  );
};

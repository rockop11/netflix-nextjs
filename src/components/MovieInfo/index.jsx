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

  const getFavoritesMovies = async () => {
    const moviesList = await getFavoritesMoviesFromFirestore(user.email);
    const isFavorite = moviesList.find((movie) => {
      return movie.id == id;
    });
    setContainesMovie(isFavorite);
  };

  const handleCloseMovieDetail = () => {
    router.back();
  };

  useEffect(() => {
    getFavoritesMovies();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.closeModal} onClick={handleCloseMovieDetail}>
        <HiX size={"25px"} />
      </div>
      <div
        className={styles.iconContainer}
        onClick={() => addMovieToFavorites(movie)}
      >
        {containsMovie ? (
          <HiStar size={"25px"} color="yellow" />
        ) : (
          <HiOutlineStar size={"25px"} />
        )}
      </div>
      <Image
        width={420}
        height={20}
        src={imagePath + movie.poster_path}
        alt={`${movie.title}-picture`}
        style={{
          width: "100%",
          height: "550px",
          borderRadius: "15px 15px 0px 0px",
        }}
        priority
      />
      <div className={styles.gradient} />
      <div className={styles.movieInfo}>
        <div className={styles.leftSection}>
          <p style={{ padding: "5px 10px" }}>
            {movieYear} - {movie.runtime} min.
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: " 5px 10px",
            }}
          >
            <HiThumbUp size={"20px"} />
            <span style={{ paddingLeft: "8px" }}>{movie.vote_average}</span>
          </div>

          <h3 style={{ padding: " 5px 10px" }}>{movie.title}</h3>
          <p
            style={{
              fontSize: "14px",
              padding: "10px",
              width: "80%",
            }}
          >
            {movie.overview}
          </p>
        </div>

        <div className={styles.rightSection}>
          <>
            <p style={{ color: "grey" }}>Géneros: </p>
            {movie.genres.map((genre, i) => {
              return <p key={i}>{genre.name}</p>;
            })}
          </>
        </div>
      </div>
    </div>
  );
};

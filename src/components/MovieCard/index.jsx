import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import NoImage from "@assets/images/no-image.jpeg";
//Context
import MoviesContext from "context/MoviesContext";
//Styles
import styles from "./movieCard.module.css";

export const MovieCard = ({ movie }) => {
  const { showMovieInfoHandler } = useContext(MoviesContext);
  const imagePath = "https://image.tmdb.org/t/p/w500";

  return (
    <>
      <Link href={`/${movie.id}`}>
        <div className={styles.cardContainer} onClick={showMovieInfoHandler}>
          <Image
            src={
              movie.poster_path !== null
                ? `${imagePath}${movie.poster_path}`
                : NoImage
            }
            width={300}
            height={350}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            alt={movie.title}
            priority
          />
        </div>
      </Link>
    </>
  );
};

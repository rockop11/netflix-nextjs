import Image from "next/image";
import NoImage from "@assets/images/no-image.jpeg";

import styles from "./favMovieCard.module.css";

export const FavMovieCard = ({ movie }) => {
  const imagePath = "https://image.tmdb.org/t/p/w500";

  return (
    <div className={styles.container}>
      <Image
        src={
          movie.poster_path !== null
            ? `${imagePath}${movie.poster_path}`
            : NoImage
        }
        fill
        sizes="(max-width:425px) 50vw,
        (max-width: 768px) 250px,
        (max-width: 1024px) 300px, 250px"
        alt={movie.title}
        // priority
      />
    </div>
  );
};

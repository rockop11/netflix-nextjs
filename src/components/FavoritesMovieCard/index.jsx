import Image from "next/image";

import NoImage from "@assets/images/no-image.jpeg";

export const FavMovieCard = ({ movie }) => {
  const imagePath = "https://image.tmdb.org/t/p/w500";

  return (
    <Image
      src={
        movie.poster_path !== null
          ? `${imagePath}${movie.poster_path}`
          : NoImage
      }
      fill
      sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
      alt={movie.title}
      priority
    />
  );
};

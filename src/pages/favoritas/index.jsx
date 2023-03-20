import { useContext, useEffect } from "react";
import MoviesContext from "context/MoviesContext";

//Google Font
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

const FavoritesPage = () => {
  const { favoritesList } = useContext(MoviesContext);
  console.log("array favoritas", favoritesList);

  useEffect(() => {}, [favoritesList]);

  return (
    <div className={inter.className}>
      {favoritesList.length ? (
        favoritesList.map((movie, i) => {
          return <p key={i}>{movie.title}</p>;
        })
      ) : (
        <h3>No hay peliculas agregadas todavia...</h3>
      )}
    </div>
  );
};

export default FavoritesPage;

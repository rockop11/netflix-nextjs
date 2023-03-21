import { useContext, useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import MoviesContext from "context/MoviesContext";
//Services
import { getFavoritesMoviesFromFirestore } from "services";
//Google Font
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

const FavoritesPage = () => {
  const { favoritesList } = useContext(MoviesContext);
  const { user } = useUser();

  const [firestoreData, setFirestoreData] = useState([]);

  const getFirestoreHandler = async () => {
    const data = await getFavoritesMoviesFromFirestore(user.email);
    setFirestoreData(data);
  };

  useEffect(() => {
    getFirestoreHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favoritesList]);

  return (
    <div className={inter.className}>
      {firestoreData.length ? (
        firestoreData.map((movie, i) => {
          return <p key={i}>{movie.title}</p>;
        })
      ) : (
        <h3>No hay peliculas agregadas todavia...</h3>
      )}
    </div>
  );
};

export default FavoritesPage;

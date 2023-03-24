import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
//Components
import { MovieCard } from "@components/index";
import { Loader } from "@components/index";
//Services
import { getFavoritesMoviesFromFirestore } from "services";
//Google Font
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

const FavoritesPage = () => {
  const { user } = useUser();

  const [firestoreData, setFirestoreData] = useState([]);
  const [loader, setLoader] = useState(true);

  const getFirestoreHandler = async () => {
    const data = await getFavoritesMoviesFromFirestore(user.email);
    setFirestoreData(data);
    setLoader(false);
  };

  useEffect(() => {
    getFirestoreHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loader) {
    return <Loader />;
  }

  return (
    <div className={inter.className}>
      {!firestoreData.length && <h3>No hay Movies</h3>}

      {firestoreData &&
        firestoreData.map((movie) => {
          return <MovieCard movie={movie} key={movie.id} />;
        })}
    </div>
  );
};

export default FavoritesPage;

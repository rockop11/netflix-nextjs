import { useEffect, useState, useContext } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import MoviesContext from "context/MoviesContext";
//Components
import { MovieCard } from "@components/index";
import { Loader } from "@components/index";
//Layout
import { Layout } from "@layout/Layout";
//Icons
import { HiTrash } from "react-icons/hi";
//Services
import { getFavoritesMoviesFromFirestore } from "services";
//Styles
import styles from "./favorites.module.css";

const FavoritesPage = () => {
  const { deleteMovieFromFavorites } = useContext(MoviesContext);
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
  }, [firestoreData, user]);

  if (loader) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      {!firestoreData.length && <h3>No hay Movies</h3>}

      {firestoreData &&
        firestoreData.map((movie) => {
          return (
            <div key={movie.id} className={styles.movieInfoCard}>
              <div
                className={styles.iconContainer}
                onClick={() => deleteMovieFromFavorites(movie.id)}
              >
                <HiTrash size={"25px"} />
              </div>
              <MovieCard movie={movie} />
            </div>
          );
        })}
    </div>
  );
};

export default FavoritesPage;

FavoritesPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps = (context) => {
  return {
    props: {},
  };
};

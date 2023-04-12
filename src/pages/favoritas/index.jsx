import Head from "next/head";
import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import MoviesContext from "context/MoviesContext";
//Components
import { FavMovieCard } from "@components/index";
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
  }, []);

  if (loader) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>Favoritas</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <div className={styles.container}>
        {!firestoreData.length && <h3>Aún no has agregado Peliculas...</h3>}

        {firestoreData &&
          firestoreData.map((movie) => {
            return (
              <>
                <div className={styles.movieInfoCard}>
                  <div
                    className={styles.iconContainer}
                    onClick={() => deleteMovieFromFavorites(movie.id)}
                  >
                    <HiTrash size={"25px"} />
                  </div>
                  <Link href={`/${movie.id}`} key={movie.id}>
                    <div className={styles.imageContainer}>
                      <FavMovieCard movie={movie} />
                    </div>
                  </Link>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};

export default FavoritesPage;

FavoritesPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

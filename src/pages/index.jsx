import { useContext, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import Head from "next/head";
import MoviesContext from "context/MoviesContext";
//Components
import { MovieList } from "@components/index";
import { SearchResults } from "@components/index";
//Services
import {
  getFirestore,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "services";
//Google Font
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function Home({
  popularMovies,
  topRatedMovies,
  upcomingMovies,
}) {
  const { searchResults, favoritesList } = useContext(MoviesContext);
  const { user } = useUser();
  const router = useRouter();
  console.log(favoritesList);

  const getFirebaseData = async () => {
    await getFirestore(user.email);
  };

  useEffect(() => {
    if (user) {
      getFirebaseData();
    } else {
      router.replace("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={inter.className}>
        {user && (
          <>
            {searchResults.length ? (
              <SearchResults />
            ) : (
              <>
                <MovieList title="Peliculas Populares" movies={popularMovies} />
                <MovieList title="Mejores Puntuadas" movies={topRatedMovies} />
                <MovieList title="Proximamente" movies={upcomingMovies} />
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const popularMovies = await getPopularMovies();
  const topRatedMovies = await getTopRatedMovies();
  const upcomingMovies = await getUpcomingMovies();

  return {
    props: { popularMovies, topRatedMovies, upcomingMovies },
  };
}

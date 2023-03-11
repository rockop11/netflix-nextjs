import { useContext, useEffect } from "react";
import Head from "next/head";
import { useUser } from "@auth0/nextjs-auth0/client";
import MoviesContext from "context/MoviesContext";
//Components
import { MovieList } from "@components/index";
import { UnloggedContent } from "@components/index";
import { SearchResults } from "@components/index";
//Services
import {
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
  const { user } = useUser();
  const { searchResults } = useContext(MoviesContext);
  // console.log(searchResults);

  useEffect(() => {

  }, [searchResults]);

  return (
    <>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={inter.className}>
        <UnloggedContent />
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
  // const { data } = await axios.get(
  //   "https://netflix-nextjs-6e9af-default-rtdb.firebaseio.com/movies.json"
  // );
  const popularMovies = await getPopularMovies();
  const topRatedMovies = await getTopRatedMovies();
  const upcomingMovies = await getUpcomingMovies();

  return {
    props: { popularMovies, topRatedMovies, upcomingMovies },
  };
}

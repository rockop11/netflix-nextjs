//Componets
import { MovieInfo, MovieList } from "@components/index";
//Layout
import { Layout } from "@layout/Layout";
//Service
import { getMovieDetail, getSimilarMovies } from "services";

const MovieDetail = ({ movieDetail, similarMovies }) => {
  return (
    <>
      <MovieInfo movie={movieDetail} />
      <MovieList movies={similarMovies} title={"Títulos Similares"} />
    </>
  );
};

export default MovieDetail;

MovieDetail.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps = async (context) => {
  const { params } = context;
  const movieDetail = await getMovieDetail(params.id);
  const similarMovies = await getSimilarMovies(params.id);

  return {
    props: {
      movieDetail,
      similarMovies,
    },
  };
};

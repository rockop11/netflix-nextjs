import { MovieInfo } from "@components/index";
import { getMovieDetail } from "services";

const MovieDetail = ({ movieDetail }) => {
  return (
    <>
      <MovieInfo movie={movieDetail} />
    </>
  );
};

export default MovieDetail;

export const getServerSideProps = async (context) => {
  const { params } = context;
  const movieDetail = await getMovieDetail(params.id);

  return {
    props: {
      movieDetail,
    },
  };
};

import { MovieInfo } from "@components/index";
import { getMovieDetail } from "services";

const MovieDetail = ({ movieDetail }) => {
  return (
    <div>
      <MovieInfo movie={movieDetail} />
    </div>
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

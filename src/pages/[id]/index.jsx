//Componets
import { MovieInfo } from "@components/index";
//Layout
import { Layout } from "@layout/Layout";
//Service
import { getMovieDetail } from "services";

const MovieDetail = ({ movieDetail }) => {
  return (
    <>
      <MovieInfo movie={movieDetail} />
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

  return {
    props: {
      movieDetail,
    },
  };
};

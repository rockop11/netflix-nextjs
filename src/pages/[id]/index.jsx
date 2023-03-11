import { MovieInfo } from "@components/index";
import { getMovieDetail } from "services";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

const MovieDetail = ({ movieDetail }) => {
  return (
    <div className={inter.className}>
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

import axios from "axios";

const language = "&language=es-ES";

export const getPopularMovies = async () => {
  const { data } = await axios(
    `${process.env.NEXT_PUBLIC_TMDB_API_URL}/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}${language}`
  ).catch((err) => {
    console.log(err);
  });
  return data.results;
};

export const getTopRatedMovies = async () => {
  const { data } = await axios(
    `${process.env.NEXT_PUBLIC_TMDB_API_URL}/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}${language}`
  ).catch((err) => {
    console.log(err);
  });
  return data.results;
};

export const getUpcomingMovies = async () => {
  const { data } = await axios(
    `${process.env.NEXT_PUBLIC_TMDB_API_URL}/movie/upcoming?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}${language}`
  ).catch((err) => {
    console.log(err);
  });
  return data.results;
};

export const getMovieDetail = async (id) => {
  const { data } = await axios(
    `${process.env.NEXT_PUBLIC_TMDB_API_URL}/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}${language}`
  ).catch((err) => {
    console.log(err);
  });
  return data;
};

export const getMovieImages = async (id) => {
  const { data } = await axios(
    `${process.env.NEXT_PUBLIC_TMDB_API_URL}/movie/${id}/images?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  ).catch((err) => {
    console.log(err);
  });
  return data;
};

export const searchMovies = async (value) => {
  const { data } = await axios(
    `${process.env.NEXT_PUBLIC_TMDB_API_URL}/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}${language}&query=${value}&page=1&include_adult=true`
  ).catch((err) => {
    console.log(err);
  });
  // console.log(data);
  return data.results;
};

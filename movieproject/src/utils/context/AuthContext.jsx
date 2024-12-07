import { useContext, createContext, useState } from 'react';

const MovieContext = createContext({ list: [], selectedMovie: undefined });

function MovieContextProvider({ children }) {
  const [movieList, setMovieList] = useState([]);
  const [movie, setMovie] = useState(undefined);
  return (
    <MovieContext.Provider value={{ movieList, setMovieList, movie, setMovie }}>
      {children}
    </MovieContext.Provider>
  );
}

export default MovieContextProvider;

export const useMovieContext = () => {
  const data = useContext(MovieContext);
  return data;
};

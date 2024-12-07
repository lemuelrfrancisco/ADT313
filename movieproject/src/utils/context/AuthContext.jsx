import { useContext, createContext, useState } from 'react';

const AuthContext = createContext({ list: [], selectedMovie: undefined });

function AuthContextProvider({ children }) {
  const [movieList, setMovieList] = useState([]);
  const [movie, setMovie] = useState(undefined);
  return (
    <AuthContext.Provider value={{ movieList, setMovieList, movie, setMovie }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;

export const useAuthContext = () => {
  const data = useContext(AuthContext);
  return data;
};

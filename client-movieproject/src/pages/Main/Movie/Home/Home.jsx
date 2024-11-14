import { useNavigate } from 'react-router-dom';
import './Home.css';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import MovieCards from '../../../../components/MovieCards/MovieCards';
import { useMovieContext } from '../../../../context/MovieContext';
const Home = () => {
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const { movieList, setMovieList, setMovie } = useMovieContext();

  const getMovies = () => {
    //get the movies from the api or database
    axios
      .get('/movies')
      .then((response) => {
        setMovieList(response.data);
        const random = Math.floor(Math.random() * response.data.length);
        setFeaturedMovie(response.data[random]);
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (movieList.length) {
        console.log('change movie');
        const random = Math.floor(Math.random() * movieList.length);
        setFeaturedMovie(movieList[random]);
      }
    }, 5000);
    return;
  }, [featuredMovie]);

  return (
    <div className='main-container'>
      <h1 className='page-title'>Movies</h1>
      {featuredMovie && movieList.length ? (
        <div className='featured-list-container'>
          <div
            className='featured-backdrop'
            style={{
              background: `url(${
                featuredMovie.backdropPath !==
                'https://image.tmdb.org/t/p/original/undefined'
                  ? featuredMovie.backdropPath
                  : featuredMovie.posterPath
              }) no-repeat center top`,
            }}
          >
            <span className='featured-movie-title'>{featuredMovie.title}</span>
          </div>
        </div>
      ) : (
        <div className='featured-list-container-loader'></div>
      )}
      <div className='list-container'>
        {movieList.map((movie) => (
          <>
            <MovieCards
              movie={movie}
              onClick={() => {
                navigate(`/view/${movie.id}`);
                setMovie(movie);
              }}
            />
          </>
        ))}
      </div>
    </div>
  );
};

export default Home;

import React, { useContext, useEffect, useState, useCallback } from 'react';
import { AuthContext } from '../../../utils/context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import MovieCards from '../../../components/movieCards/MovieCards';

function Home() {
  const { auth, lists, setLists, setMovie } = useContext(AuthContext);
  const navigate = useNavigate();
  const [featuredMovie, setFeaturedMovie] = useState(null);

  const getMovies = useCallback(() => {
    let isMounted = true;

    axios({
      method: "get",
      url: '/movies',
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      }
    })
      .then((response) => {
        if (!isMounted) return;
        const movies = response.data;
        const featuredMovies = movies.filter(
          (movie) => movie.isFeatured === true || movie.isFeatured === "true"
        );

        if (featuredMovies.length > 0) {
          const randomIndex = Math.floor(Math.random() * featuredMovies.length);
          setFeaturedMovie(featuredMovies[randomIndex]);
        }
        setLists(movies);
      })
      .catch((error) => console.error('Error fetching movies:', error));

    return () => {
      isMounted = false;
    };
  }, [setLists, auth.accessToken]);

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  useEffect(() => {
    if (lists.length === 0) return;

    const intervalId = setInterval(() => {
      const featuredMovies = lists.filter(
        (movie) => movie.isFeatured === true || movie.isFeatured === "true"
      );

      if (featuredMovies.length > 0) {
        const randomIndex = Math.floor(Math.random() * featuredMovies.length);
        setFeaturedMovie(featuredMovies[randomIndex]);
        console.log('Updated featured movie:', featuredMovies[randomIndex]);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [lists]);

  return (
    <div className='main-container'>
      {featuredMovie && lists.length ? (
        <div className='featured-list-container'>
          <div
            className='featured-backdrop'
            style={{
              backgroundImage: `url(${featuredMovie.backdropPath !== 'https://image.tmdb.org/t/p/original/undefined'
                  ? featuredMovie.backdropPath
                  : featuredMovie.posterPath})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center top',
              backgroundSize: 'cover',
            }}
          >
            <h1 className='title-movies-h1-2'>
              {featuredMovie.title}
            </h1>
            <div className='Movies-Title-Description'>
              <div className='PostPath-Img'>
                <img className='img-postpath-auto'
                  src={featuredMovie.posterPath}
                  alt='image-movie'
                  onClick={() => {
                    navigate(`/home/movie/${featuredMovie.id}`);
                    setMovie(featuredMovie);
                  }}
                />
              </div>
              <div className='Title-Description-Box'>
                <h1 className='title-movies-h1'>
                  {featuredMovie.title}
                </h1>
                <hr></hr>
                <p className='overview-movies-p'>
                  {featuredMovie.overview}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='featured-list-container-loader'>
          Loading featured movie...
        </div>
      )}
      <div className='movies-list'>
        <h1 className='title-text-movie-lists'>List of Movies</h1>
        <div className='list-container'>
          {lists.map((movie) => (
            <MovieCards
              key={movie.id}
              movie={movie}
              onClick={() => {
                navigate(`/home/movie/${movie.id}`);
                setMovie(movie);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;

import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../../../utils/context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './Movie.css'

function Movie() {
  const { movie, setMovie } = useContext(AuthContext);

  const { movieId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (movieId !== undefined) {
      axios
        .get(`/movies/${movieId}`)
        .then((response) => {
          setMovie(response.data);
        })
        .catch((e) => {
          console.log(e);
          navigate('/');
        });
    }
    return () => { };
  }, [movieId]);
  return (
    <div className='container-movie-card'>
      {movie && (
        <>
          <div className='Movie-Tab-Info'
            style={{
              backgroundImage: `url(${movie.backdropPath !== 'https://image.tmdb.org/t/p/original/undefined'
                ? movie.backdropPath
                : movie.posterPath
                })`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center top',
              backgroundSize: 'cover',
            }}>
            <div className='background-overlay'></div>
            <div className='banner'>
              <img
                className='View-Movie-Poster'
                src={movie.posterPath}
              />
            </div>
            <div className='info-movie-flex'>
              <h1>{movie.title}</h1>
              <hr></hr>
              <h3 className='overview-h3'>{movie.overview}</h3>
            </div>
          </div>

          {movie.casts && movie.casts.length && (
            <div>
              <h1>Cast & Crew</h1>
              {JSON.stringify(movie.casts)}
            </div>
          )}

          {movie.videos && movie.videos.length && (
            <div>
              <h1>Videos</h1>
              {JSON.stringify(movie.videos)}
            </div>
          )}

          {movie.photos && movie.photos.length && (
            <div>
              <h1>Photos</h1>
              {JSON.stringify(movie.photos)}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Movie
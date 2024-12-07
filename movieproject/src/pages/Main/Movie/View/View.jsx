import { useEffect } from 'react';
import { useMovieContext } from '../../../../context/MovieContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function View() {
  const { movie, setMovie } = useMovieContext();
  const { movieId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (movieId) {
      axios
        .get(`/movies/${movieId}`)
        .then((response) => {
          console.log(response.data); // Inspect the data here
          setMovie(response.data);
        })
        .catch((error) => {
          console.error(error);
          navigate('/');
        });
    }
  }, [movieId, setMovie, navigate]);

  return (
    <div className="view-container">
      {movie ? (
        <>
          {/* Movie Banner */}
          <div className="movie-banner" style={{ backgroundImage: `url(${movie.bannerImage || ''})` }}>
            <div className="banner-overlay">
              <h1 className="movie-title">{movie.title}</h1>
            </div>
          </div>

          {/* Movie Details */}
          <div className="movie-details">
            <h3 className="movie-overview">{movie.overview}</h3>
          </div>

          {/* Cast & Crew */}
          {movie.casts && movie.casts.length > 0 && (
            <div className="section">
              <h2>Cast & Crew</h2>
              <ul className="cast-list">
                {movie.casts.map((cast, index) => (
                  <li key={index}>{cast.name}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Videos */}
          {movie.videos && movie.videos.length > 0 && (
            <div className="section">
              <h2>Videos</h2>
              <div className="video-gallery">
                {movie.videos.map((video, index) => (
                  <video key={index} controls>
                    <source src={video.url} type="video/mp4" />
                  </video>
                ))}
              </div>
            </div>
          )}

          {/* Photos */}
          {movie.photos && movie.photos.length > 0 && (
            <div className="section">
              <h2>Photos</h2>
              <div className="photo-gallery">
                {movie.photos.map((photo, index) => (
                  <img key={index} src={photo.url} alt={`Movie Photo ${index + 1}`} />
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default View;

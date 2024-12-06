import { useEffect, useState } from "react";
import { useMovieContext } from "../../../../context/MovieContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./View.css";

const View = () => {
  const { movie, setMovie } = useMovieContext();
  const { movieId, tmdbId } = useParams();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  const [castInformation, setCastInformation] = useState([]);
  const [photoInformation, setPhotoInformation] = useState([]);
  const [videoInformation, setVideoInformation] = useState([]);

  const fetchMovieData = async (id) => {
    try {
      const response = await axios.get(`/movies/${id}`);
      setMovie(response.data);
    } catch (error) {
      console.error("Error fetching movie data:", error);
      navigate("/main/movies");
    }
  };

  const fetchAdditionalData = async (url, setter) => {
    try {
      const response = await axios.get(url, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setter(response.data);
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
    }
  };

  useEffect(() => {
    if (movieId) {
      fetchMovieData(movieId);
    }
  }, [movieId]);

  useEffect(() => {
    if (movie) {
      fetchAdditionalData("/casts", setCastInformation);
      fetchAdditionalData("/photos", setPhotoInformation);
      fetchAdditionalData("/videos", setVideoInformation);
    }
  }, [movie]);

  const renderCast = () => {
    return castInformation.length > 0 ? (
      <div>
        <h2>Cast & Crew</h2>
        <ul>
          {castInformation
            .filter((cast) => cast.movieId === parseInt(tmdbId))
            .map((cast) => (
              <li key={cast.id}>
                <img src={cast.url} alt={cast.name} />
                <span>
                  {cast.name} as {cast.characterName}
                </span>
              </li>
            ))}
        </ul>
      </div>
    ) : (
      <p>No cast information available.</p>
    );
  };

  const renderVideos = () => {
    return videoInformation.length > 0 ? (
      <div>
        <h2>Videos</h2>
        {videoInformation
          .filter((video) => video.movieId === parseInt(tmdbId))
          .map((video) => (
            <div key={video.id}>
              <h3>{video.name}</h3>
              {video.url.includes("youtube") ? (
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${video.videoKey}`}
                  title={video.name}
                  frameBorder="0"
                  allowFullScreen
                  className="video-iframe"
                ></iframe>
              ) : (
                <video controls width="100%" height="auto">
                  <source src={video.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          ))}
      </div>
    ) : (
      <p>No videos available.</p>
    );
  };

  const renderPhotos = () => {
    return photoInformation.length > 0 ? (
      <div>
        <h2>Photos</h2>
        <div className="photos-container">
          {photoInformation
            .filter((photo) => photo.movieId === parseInt(tmdbId))
            .map((photo) => (
              <img key={photo.id} src={photo.url} alt="Movie Scene" />
            ))}
        </div>
      </div>
    ) : (
      <p>No photos available.</p>
    );
  };

  return (
    <>
      {movie && (
        <div className="movie-details">
          {/* Movie Poster */}
          <div className="movie-poster">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
              alt="Poster"
            />
          </div>

          {/* Movie Information */}
          <div className="movie-info">
            <div
              className="banner"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdropPath})`,
              }}
            >
              <h1>{movie.title}</h1>
            </div>

            <p>{movie.overview}</p>

            {/* Movie Meta Information */}
            <div className="movie-meta">
              {movie.popularity && <h4>Popularity: {movie.popularity}</h4>}
              {movie.releaseDate && (
                <h4>
                  Release Date:{" "}
                  {new Date(movie.releaseDate).toLocaleDateString()}
                </h4>
              )}
              {movie.voteAverage && (
                <h4>Vote Average: {movie.voteAverage}</h4>
              )}
              {typeof movie.isFeatured === "boolean" && (
                <h4>{movie.isFeatured ? "Featured Movie" : "Not Featured"}</h4>
              )}
            </div>

            {/* Render Cast, Videos, Photos */}
            {renderCast()}
            {renderVideos()}
            {renderPhotos()}
          </div>
        </div>
      )}
    </>
  );
};

export default View;

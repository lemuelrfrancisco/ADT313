import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import './Form.css';

const Form = () => {
  const [query, setQuery] = useState('');
  const [searchedMovieList, setSearchedMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(undefined);
  const [movie, setMovie] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  let { movieId } = useParams();

  const handleSearch = useCallback(() => {
    if (query.trim() === '') return; 
    axios({
      method: 'get',
      url: `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${currentPage}`,
      headers: {
        Accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTdiNmUyNGJkNWRkNjhiNmE1ZWFjZjgyNWY3NGY5ZCIsIm5iZiI6MTcyOTI5NzI5Ny4wNzMzNTEsInN1YiI6IjY2MzhlZGM0MmZhZjRkMDEzMGM2NzM3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZIX4EF2yAKl6NwhcmhZucxSQi1rJDZiGG80tDd6_9XI', 
      },
    })
      .then((response) => {
        setSearchedMovieList(response.data.results);
        setTotalPages(response.data.total_pages);
        console.log(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        alert("An error occurred while fetching movies.");
      });
  }, [query, currentPage]);

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
  };

  const handleSave = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (selectedMovie === undefined) {
      alert('Please search and select a movie.');
      return;
    }

    const data = {
      tmdbId: selectedMovie.id,
      title: selectedMovie.original_title,
      overview: selectedMovie.overview,
      popularity: selectedMovie.popularity,
      releaseDate: selectedMovie.release_date,
      voteAverage: selectedMovie.vote_average,
      backdropPath: `https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path}`,
      posterPath: `https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`,
      isFeatured: 0,
    };

    const request = movieId 
      ? axios.patch(`/movies/${movieId}`, data, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
      : axios.post('/movies', data, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

    request
      .then((saveResponse) => {
        console.log(saveResponse);
        alert('Success');
        navigate('/main/movies');
      })
      .catch((error) => {
        console.error("Error saving movie:", error);
        alert("An error occurred while saving the movie.");
      });
  };

  useEffect(() => {
    if (movieId) {
      axios.get(`/movies/${movieId}`)
        .then((response) => {
          setMovie(response.data);
          setSelectedMovie({
            id: response.data.tmdbId,
            original_title: response.data.title,
            overview: response.data.overview,
            popularity: response.data.popularity,
            poster_path: response.data.posterPath,
            release_date: response.data.releaseDate,
            vote_average: response.data.voteAverage,
          });
        })
        .catch((error) => {
          console.error("Error fetching movie:", error);
          alert("An error occurred while fetching the movie.");
        });
    }
  }, [movieId]);

  return (
    <>
      <h1>{movieId !== undefined ? 'Edit ' : 'Create '} Movie</h1>

      {movieId === undefined && (
        <>
          <div className='search-container'>
            Search Movie:{' '}
            <input
              type='text'
              onChange={(event) => setQuery(event.target.value)}
            />
            <button type='button' onClick={handleSearch}>
              Search
            </button>
            <div className='searched-movie'>
              {searchedMovieList.map((movie) => (
                <p key={movie.id} onClick={() => handleSelectMovie(movie)}>
                  {movie.original_title}
                </p>
              ))}
            </div>
            {totalPages > 1 && (
              <div>
                <button 
                  disabled={currentPage === 1} 
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
                  Previous
                </button>
                {}
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button 
                  disabled={currentPage >= totalPages} 
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>
                  Next
                </button>
              </div>
            )}
          </div>
          <hr />
        </>
      )}

      <div className='container'>
        <form>
          {selectedMovie && (
            <img
              className='poster-image'
              src={`https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`}
              alt='Poster'
            />
          )}
          <div className='field'>
            Title:
            <input
              type='text'
              value={selectedMovie ? selectedMovie.original_title : ''}
              onChange={(e) => setSelectedMovie((prev) => ({
                ...prev,
                original_title: e.target.value,
              }))}
            />
          </div>
          <div className='field'>
            Overview:
            <textarea
              rows={10}
              value={selectedMovie ? selectedMovie.overview : ''}
              onChange={(e) => setSelectedMovie((prev) => ({
                ...prev,
                overview: e.target.value,
              }))}
            />
          </div>

          <div className='field'>
            Popularity:
            <input
              type='text'
              value={selectedMovie ? selectedMovie.popularity : ''}
              onChange={(e) => setSelectedMovie((prev) => ({
                ...prev,
                popularity: e.target.value,
              }))}
            />
          </div>

          <div className='field'>
            Release Date:
            <input
              type='text'
              value={selectedMovie ? selectedMovie.release_date : ''}
              onChange={(e) => setSelectedMovie((prev) => ({
                ...prev,
                release_date: e.target.value,
              }))}
            />
          </div>

          <div className='field'>
            Vote Average:
            <input
              type='text'
              value={selectedMovie ? selectedMovie.vote_average : ''}
              onChange={(e) => setSelectedMovie((prev) => ({
                ...prev,
                vote_average: e.target.value,
              }))}
            />
          </div>

          <button type='button' onClick={handleSave}>
            Save
          </button>
        </form>
      </div>
      
      {movieId !== undefined && selectedMovie && (
        <div>
          <hr />
          <nav>
            <ul className='tabs'>
              <li
                onClick={() => {
                  navigate(`/main/movies/form/${movieId}/cast-and-crews/${selectedMovie.id}`);
                }}
              >
                Cast & Crews
              </li>
              <li
                onClick={() => {
                  navigate(`/main/movies/form/${movieId}/videos/${selectedMovie.id}`);
                }}
              >
                Videos
              </li>
              <li
                onClick={() => {
                  navigate(`/main/movies/form/${movieId}/photos/${selectedMovie.id}`);
                }}
              >
                Photos
              </li>
            </ul>
          </nav>

          <Outlet />
        </div>
       )}

    </>
  );
};

export default Form;

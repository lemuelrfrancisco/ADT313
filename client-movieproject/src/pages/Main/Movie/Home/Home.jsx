import { useNavigate } from 'react-router-dom';
import './Home.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCards from '../../../../components/MovieCards/MovieCards';
const Home = () => {
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  const [lists, setLists] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);

  const getMovies = () => {
    //get the movies from the api or database
    axios
      .get('/movies')
      .then((response) => {
        setLists(response.data);
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
      if (lists.length) {
        console.log('change movie');
        const random = Math.floor(Math.random() * lists.length);
        setFeaturedMovie(lists[random]);
      }
    }, 5000);
    return;
  }, [featuredMovie]);

  return (
    <div className='main-container'>
      <h1 className='page-title'>Movies</h1>
      {featuredMovie && lists.length ? (
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
        {lists.map((movie) => (
          <>
            <MovieCards
              movie={movie}
              onClick={() => alert('Open modal to view Movie')}
            />
          </>
        ))}
      </div>
    </div>
  );
};

export default Home;

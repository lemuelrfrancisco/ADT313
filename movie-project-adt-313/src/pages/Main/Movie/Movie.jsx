import { Outlet } from 'react-router-dom';
import './Movie.css';

const Movies = () => {
  return (
    <div className="movies-container">
      <h1>Movie Page</h1>
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
};

export default Movies;

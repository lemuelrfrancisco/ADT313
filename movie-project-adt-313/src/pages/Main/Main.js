import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './Main.css';

function Main() {
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  useEffect(() => {
    if (
      accessToken === undefined ||
      accessToken === '' ||
      accessToken === null
    ) {
      handleLogout();
    }
  }, []);
  return (
    <div className='main-wrapper'>
      <div className='main-container'>
        <div className='navigation-sidebar'>
          <ul>
            <li>
              <a href='/main/movies' className='nav-link'>
                Movies
              </a>
            </li>
            <li className='logout-item'>
              <a onClick={handleLogout} className='logout-link'>
                Logout
              </a>
            </li>
          </ul>
        </div>
        <div className='main-content'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Main;

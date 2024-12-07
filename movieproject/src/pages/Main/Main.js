import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './Main.css';

function Main() {
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  // State to manage loading status
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?'); // Ask for confirmation
    if (confirmLogout) {
      setIsLoggingOut(true); // Show loading spinner
      setTimeout(() => {
        localStorage.removeItem('accessToken');
        setIsLoggingOut(false); // Hide loading spinner
        navigate('/login'); // Redirect to login page after logout
      }, 3000); // 3-second delay before navigating
    }
  };

  useEffect(() => {
    if (!accessToken) { // Simplified check for accessToken
      navigate('/login'); // Redirect to login if no access token
    }
  }, [accessToken, navigate]); // Added accessToken and navigate as dependencies

  return (
    <div className="Main">
      <div className="container">
        <div className="navigation">
          <ul>
            <li>
              {/* Disable navigation for Movies */}
              <a
                style={{ pointerEvents: 'none', color: 'gray', cursor: 'not-allowed' }}
                onClick={(e) => e.preventDefault()}
              >
                ADT Movies
              </a>
            </li>
            <li>
              <a onClick={() => navigate('/home')}>Home</a>
            </li>
            {accessToken ? (
              <li className="logout">
                <a onClick={handleLogout}>Log Out</a>
              </li>
            ) : (
              <li className="login">
                <a onClick={() => navigate('/login')}>Login</a> {/* Updated to navigate to login */}
              </li>
            )}
          </ul>
        </div>
        <div className="outlet">
          {isLoggingOut ? (
            <div className="loading-spinner"></div>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;

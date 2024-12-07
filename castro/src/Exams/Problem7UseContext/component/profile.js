// src/components/Profile.js
import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Profile = () => {
  const { user, logout } = useContext(UserContext);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) { // Bonus 3
      logout();
    }
  };

  return (
    <div className="profile">
      {user && (
        <>
          <h2>Profile</h2>
          <p>Welcome, {user.username}!</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
};

export default Profile;

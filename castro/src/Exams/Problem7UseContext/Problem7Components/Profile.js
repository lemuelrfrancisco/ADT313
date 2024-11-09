// src/components/Profile.js
import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

function Profile() {
  const { userProfile, setUserProfile } = useContext(UserContext);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      setUserProfile(null);
    }
  };

  return (
    <div className="profile">
      <h2>Profile</h2>
      {userProfile && (
        <>
          <p>Username: {userProfile.username}</p>
          <p>Name: {userProfile.name}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
}

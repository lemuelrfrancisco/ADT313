import React, { useState } from 'react';

function Problem2() {
  const user = {
    name: 'Hedy Lamarr',
    imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
    imageSize: 90,
  };

  function Profile() {
    return (
      <>
        <h1>{user.name}</h1>
        <img
          className='avatar'
          src={user.imageUrl}
          alt={'Photo of ' + user.name}
          style={{
            width: user.imageSize,
            height: user.imageSize,
          }}
        />
      </>
    );
  }

  function InitialContent() {
    return <h1>User profile is hidden.</h1>;
  }


  const [showProfile, setShowProfile] = useState(false);

  
  const toggleProfileVisibility = () => {
    setShowProfile(!showProfile);
  };

  return (
    <>
      <div>
        {showProfile ? <Profile /> : <InitialContent />}
        <button type='button' onClick={toggleProfileVisibility}>
          {showProfile ? 'Hide Profile' : 'Show Profile'}
        </button>
      </div>
    </>
  );
}

export default Problem2;
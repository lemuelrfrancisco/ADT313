import logo from './logo.svg';
import './App.css';
import Name from './components/Name/Name';
import Section from './components/Section/Section';
import Description from './components/Description/Description';
import { useState } from 'react';

function App() {
  const [isMoving, setIsMoving] = useState(false);
  const [userInformation, setUserInformation] = useState({
    firstName: 'Lemuel',
    middleInitial: 'R.',
    lastName: 'Francisco',
    section: 'Section',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, laborum tempore earum sit rerum recusandae, eum ab repellat inventore possimus deleniti atque! Odit porro illum autem eos eaque accusantium veritatis.',
  });

  function updateName() {
    userInformation.firstName = 'Lem';
    setUserInformation({ ...userInformation });
  }

  return (
    <div className='App'>
      <Name
        firstName={userInformation.firstName}
        middleInitial={userInformation.middleInitial}
        lastName={userInformation.lastName}
      />
      <Section />
      <Description />
      <div className={isMoving ? 'move-moon' : 'moon'}></div>
      <button type='button' onClick={updateName}>
        Update name
      </button>
      <button type='button' onClick={() => setIsMoving(!isMoving)}>
        {isMoving ? 'Night' : 'Day'}
      </button>
    </div>
  );
}

export default App;

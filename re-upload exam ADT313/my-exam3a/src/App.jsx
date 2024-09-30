
import React from 'react';
import './App.css';
import Login from './src/components/LogIn.jsx';
import SignUp from './src/components/SignUp.jsx';

function App() {
  return (
    <div className="App">
      <h1>Welcome to My Website</h1>
      <Login />
      <SignUp />
    </div>
  );
}

export default App;

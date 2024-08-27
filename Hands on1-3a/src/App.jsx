import logo from './logo.svg';
import './App.css';
import Name from './component/Name/Name';
import Section from './component/Section/Section';
import Description from './component/Description/Description';

function App() {
  const userInformation = {
    firstName: 'Ma. Elaiza',
    lastName: 'Pugosa',
    description: 'Very Demure, Very Cutesy, Very Mindful'
  }

  return (
    <div className="App">
      <Name firstName={userInformation.firstName} lastName={userInformation.lastName} description={userInformation.description}/>
      <Section />
      <Description />
    </div>
  );
}

export default App;

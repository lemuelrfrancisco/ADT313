import logo from './logo.svg';
import './App.css';
import Name from './component/Name/Name';
import Section from './component/Section/Section';
import Description from './component/Description/Description';


function App() {
  const userInformation = {
    firstName: 'Lem',
    lastName: 'Francisco',
    section: 'IT-3A',
    description: 'Short description'
  }
  return (
    <div className='App'>
      <Name firstName={userInformation.firstName} lastName={userInformation.lastName} />
      <Section />
      <Description />
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import Name from './component/User/Name';
import Section from './component/Section/Section';
import Description from './component/Description/Description';


function App() {
const userInformation = {
  firstName: "Christine",
  lastName: "Lazaro",
  section: 'BSIT-3A',
  description: 'Class Representive of BSIT-3A'
  
}

  return (
    <div className="App">
      <Name firstName={userInformation.firstName} lastName={userInformation.lastName}/>
      <Section section={userInformation.section}/>
      <Description Description={userInformation.description}/>
    </div>
  );
}

export default App;

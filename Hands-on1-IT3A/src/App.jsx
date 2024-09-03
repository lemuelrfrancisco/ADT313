import logo from './logo.svg';
import './App.css';
import Name from './component/Name/Name';
import Section from './component/Section/Section';
import Desc from './component/Description/Desc';

function App() {
  const userInformation = {
    firstName: "Ace",
    lastName: "Matamis",
    section: "BSIT-3A",
    desc: "Shytype langs"
  }
  return (
    <div className="App">
      <Name firstName = {userInformation.firstName} lastName = {userInformation.lastName}/>
      <Section section = {userInformation.section}/>
      <Desc desc = {userInformation.desc}/>
    </div>
  );
}

export default App;
import logo from './logo.svg';
import './App.css';
import Name from './component/Name/Name';
import Section from './component/Section/Section';
import Description from './component/Description/Description';




function App() {
  const userInformation = {
    firstName: "Franc Alvenn",
    lastName: "Dela Cruz",
    section : "BSIT 3A",
    description: "I am an enthusiastic and driven 3rd year Bachelor of Science in Information Technology student."
  }
  return (
    <div className="App">
        <Name firstName={userInformation.firstName} lastName={userInformation.lastName}/>
        <Section section={userInformation.section}/>
        <Description description={userInformation.description}/>
    </div>
  );
}

export default App;

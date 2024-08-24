import logo from './logo.svg';
import './App.css';
import Header from './layout/Header/Header';
import Body from './layout/Body/Body';




function App() {
  const userInformation = {
    firstName: "Franc Alvenn",
    lastName: "Dela Cruz",
    section : "BSIT 3A",
    description: "I am an enthusiastic and driven 3rd year Bachelor of Science in Information Technology student."
  }
  return (
    <div className="App">
        <Header />
        <Body firstName={userInformation.firstName} lastName={userInformation.lastName}
              section={userInformation.section} description={userInformation.description}/>
    </div>
  );
}

export default App;

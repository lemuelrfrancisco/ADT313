import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './pages/Main/Main';
import Home from './pages/Main/Movie/Home/Home';
import MovieContextProvider from './context/MovieContext';
import View from './pages/Main/Movie/View/View';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/view/:movieId?',
        element: <View />,
      },
    ],
  },
]);

function App() {
  return (
    <div className='App'>
      <MovieContextProvider>
        <RouterProvider router={router} />
      </MovieContextProvider>
    </div>
  );
}

export default App;

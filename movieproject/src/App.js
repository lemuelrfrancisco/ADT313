import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './pages/Main/Main';
import Home from './pages/Main/Movie/Home/Home';
import AuthContextProvider from './utils/context/AuthContext';
import View from './pages/Main/Movie/View/View';
import Login from './pages/Public/Login/Login';
import Register from './pages/Public/Register/Register';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
  path: '/register',
  element: <Register />,
},
{
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/home',
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
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </div>
  );
}

export default App;

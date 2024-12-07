import react, { useReducer, useState, useRef, useEffect, useCallback, useContext} from 'react';
import { UserContext } from '../context/useRef';

const initialState = {
    isLoading: false,
    isLoading: false,
    error: null
};

function LoginReducer(state, action) {
    switch (action.type) {
        case 'LOGIN_START':
            return { ...state, isLoading: true, error: null };
        case 'lOGIN_SUCCESS':
            return {...state, isLoading: false, isloggedIn: true};
        case 'LOGIN_FAILURE':
            return {...state, isloading: false, error: action.payload};
    }
}

function LoginForm() {
    const [state, dispatch] = useReducer(loginReducer, initialState);
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const { setUserProfile } = useContext(UserContext);
  
    const togglePasswordVisibility = useCallback(() => {
      setShowPassword(prev => !prev);
    }, []);
  
    useEffect(() => {
      const validateFields = () => {
        const newErrors = {};
        if (!formData.username.trim()) {
          newErrors.username = 'Username is required';
        }
        if (!formData.password.trim()) {
          newErrors.password = 'Password is required';
        }
        setErrors(newErrors);
      };
  
      const timeoutId = setTimeout(validateFields, 2000);
      return () => clearTimeout(timeoutId);
    }, [formData]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      dispatch({ type: 'LOGIN_START' });
  
      // Simulate API call
      setTimeout(() => {
        if (formData.username && formData.password) {
          dispatch({ type: 'LOGIN_SUCCESS' });
          setUserProfile({
            username: formData.username,
            name: 'Test User'
          });
        } else {
          dispatch({ type: 'LOGIN_FAILURE', payload: 'Invalid credentials' });
        }
      }, 3000);
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    return (
      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <input
            ref={usernameRef}
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>
        <div>
          <input
            ref={passwordRef}
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <button type="button" onClick={togglePasswordVisibility}>
          {showPassword ? 'Hide' : 'Show'} Password
        </button>
        <button type="submit" disabled={state.isLoading}>
          {state.isLoading ? 'Loading...' : 'Login'}
        </button>
        {state.error && <div className="error">{state.error}</div>}
      </form>
    );
  }
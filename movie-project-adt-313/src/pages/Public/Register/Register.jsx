import { useState, useRef, useCallback, useEffect } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../../utils/hooks/useDebounce';
import axios from 'axios';

function Register() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isFieldsDirty, setIsFieldsDirty] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const userInputDebounce = useDebounce(
    { email, firstName, middleName, lastName, contactNo, password, confirmPassword },
    2000
  );
  const navigate = useNavigate();

  const handleShowPassword = useCallback(() => {
    setIsShowPassword((value) => !value);
  }, []);

  const handleOnChange = (event, type) => {
    setIsFieldsDirty(true);
    switch (type) {
      case 'email':
        setEmail(event.target.value);
        break;
      case 'firstName':
        setFirstName(event.target.value);
        break;
      case 'middleName':
        setMiddleName(event.target.value);
        break;
      case 'lastName':
        setLastName(event.target.value);
        break;
      case 'contactNo':
        setContactNo(event.target.value);
        break;
      case 'password':
        setPassword(event.target.value);
        break;
      case 'confirmPassword':
        setConfirmPassword(event.target.value);
        break;
      default:
        break;
    }
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      await axios.post('/admin/register', {
        email,
        firstName,
        middleName,
        lastName,
        contactNo,
        password,
      });

      alert('Account created successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Failed to create account. Please try again.');
    }
  };

  useEffect(() => {
    // Trigger debounce state logic here if needed
  }, [userInputDebounce]);

  return (
    <div className='Register'>
      <div className='main-container-register'>
        <h3>Register</h3>
        <form>
          <div className='form-container-register'>
            {['Email', 'First Name', 'Middle Name', 'Last Name', 'Contact No.'].map((label, index) => (
              <div key={index} className='form-group-register'>
                <label>{label}:</label>
                <input
                className='email-reg'
                  type='text'
                  onChange={(e) => handleOnChange(e, label.replace(' ', '').toLowerCase())}
                />
              </div>
            ))}
            {['Password', 'Confirm Password'].map((label, index) => (
              <div key={index} className='form-group-register'>
                <label>{label}:</label>
                <input
                className='pass-reg'
                  type={isShowPassword ? 'text' : 'password'}
                  onChange={(e) => handleOnChange(e, label.replace(' ', '').toLowerCase())}
                />
              </div>
            ))}
            <div className='show-password-register' onClick={handleShowPassword}>
              {isShowPassword ? 'Hide' : 'Show'} Password
            </div>
            <div className='submit-container-register'>
              <button type='button' onClick={handleRegister}>
                Register
              </button>
            </div>
            <div className='login-container'>
              <a href='/'>Already have an account? Login</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;

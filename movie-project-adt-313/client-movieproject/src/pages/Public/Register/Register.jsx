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
  const [status, setStatus] = useState('idle');
  const userInputDebounce = useDebounce({ email, firstName, middleName, lastName, contactNo, password, confirmPassword }, 2000);
  const [debounceState, setDebounceState] = useState(false);

  const emailRef = useRef();
  const firstNameRef = useRef();
  const middleNameRef = useRef();
  const lastNameRef = useRef();
  const contactNoRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const navigate = useNavigate();

  const handleShowPassword = useCallback(() => {
    setIsShowPassword((value) => !value);
  }, [isShowPassword]);

  const handleOnChange = (event, type) => {
    setDebounceState(false);
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
    const data = { email, firstName, middleName, lastName, contactNo, password, confirmPassword };
    setStatus('loading');

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      setStatus('idle');
      return;
    }

    try {
      const response = await axios.post('/user/register', {
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
    setDebounceState(true);
  }, [userInputDebounce]);

  return (
    <div className='Register'>
      <div className='main-container-register'>
        <h3>Register</h3>
        <form>
          <div className='form-container-register'>
            <div className='form-group-register'>
              <label>Email:</label>
              <input
                type='text'
                name='email'
                ref={emailRef}
                onChange={(e) => handleOnChange(e, 'email')}
              />
              {debounceState && isFieldsDirty && email === '' && (
                <span className='errors'>This field is required</span>
              )}
            </div>

            <div className='form-group'>
              <label>First Name:</label>
              <input
                type='text'
                name='firstName'
                ref={firstNameRef}
                onChange={(e) => handleOnChange(e, 'firstName')}
              />
              {debounceState && isFieldsDirty && firstName === '' && (
                <span className='errors'>This field is required</span>
              )}
            </div>

            <div className='form-group'>
              <label>Middle Name:</label>
              <input
                type='text'
                name='middleName'
                ref={middleNameRef}
                onChange={(e) => handleOnChange(e, 'middleName')}
              />
              {debounceState && isFieldsDirty && middleName === '' && (
                <span className='errors'>This field is required</span>
              )}
            </div>

            <div className='form-group'>
              <label>Last Name:</label>
              <input
                type='text'
                name='lastName'
                ref={lastNameRef}
                onChange={(e) => handleOnChange(e, 'lastName')}
              />
              {debounceState && isFieldsDirty && lastName === '' && (
                <span className='errors'>This field is required</span>
              )}
            </div>

            <div className='form-group'>
              <label>Contact No.:</label>
              <input
                type='text'
                name='contactNo'
                ref={contactNoRef}
                onChange={(e) => handleOnChange(e, 'contactNo')}
              />
              {debounceState && isFieldsDirty && contactNo === '' && (
                <span className='errors'>This field is required</span>
              )}
            </div>

            <div className='form-group'>
              <label>Password:</label>
              <input
                type={isShowPassword ? 'text' : 'password'}
                name='password'
                ref={passwordRef}
                onChange={(e) => handleOnChange(e, 'password')}
              />
              {debounceState && isFieldsDirty && password === '' && (
                <span className='errors'>This field is required</span>
              )}
            </div>

            <div className='form-group'>
              <label>Confirm Password:</label>
              <input
                type={isShowPassword ? 'text' : 'password'}
                name='confirmPassword'
                ref={confirmPasswordRef}
                onChange={(e) => handleOnChange(e, 'confirmPassword')}
              />
              {debounceState && isFieldsDirty && confirmPassword === '' && (
                <span className='errors'>This field is required</span>
              )}
            </div>

            <div className='show-password-register' onClick={handleShowPassword}>
              {isShowPassword ? 'Hide' : 'Show'} Password
            </div>

            <div className='submit-container-register'>
              <button
                type='button'
                disabled={status === 'loading'}
                onClick={() => {
                  if (status === 'loading') {
                    return;
                  }
                  if (email && firstName && middleName && lastName && contactNo && password && confirmPassword) {
                    handleRegister();
                  } else {
                    setIsFieldsDirty(true);
                    if (email === '') emailRef.current.focus();
                    if (firstName === '') firstNameRef.current.focus();
                    if (middleName === '') middleNameRef.current.focus();
                    if (lastName === '') lastNameRef.current.focus();
                    if (contactNo === '') contactNoRef.current.focus();
                    if (password === '') passwordRef.current.focus();
                    if (confirmPassword === '') confirmPasswordRef.current.focus();
                  }
                }}
              >
                {status === 'idle' ? 'Register' : 'Loading'}
              </button>
            </div>

            <div className='login-container'>
              <a href='/'>
                <small>Already have an account? Login</small>
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;

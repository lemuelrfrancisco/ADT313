import { useState, useRef, useCallback, useEffect } from 'react'; 
import './Register.css';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../../utils/hooks/useDebounce';
import axios from 'axios';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [isFieldsDirty, setIsFieldsDirty] = useState(false);
  
  const firstNameRef = useRef();
  const middleNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  
  const [isShowPassword, setIsShowPassword] = useState(false);
  const userInputDebounce = useDebounce({ firstName, middleName, lastName, email, password, confirmPassword, contactNo }, 2000);
  const [debounceState, setDebounceState] = useState(false);
  const [status, setStatus] = useState('idle');

  const navigate = useNavigate();

  const handleShowPassword = useCallback(() => {
    setIsShowPassword((value) => !value);
  }, [isShowPassword]);

  const handleOnChange = (event, type) => {
    setDebounceState(false);
    setIsFieldsDirty(true);

    switch (type) {
      case 'firstName':
        setFirstName(event.target.value);
        break;
      case 'middleName':
        setMiddleName(event.target.value);
        break;
      case 'lastName':
        setLastName(event.target.value);
        break;
      case 'email':
        setEmail(event.target.value);
        break;
      case 'password':
        setPassword(event.target.value);
        break;
      case 'confirmPassword':
        setConfirmPassword(event.target.value);
        break;
      case 'contactNo':
        setContactNo(event.target.value);
        break;
      default:
        break;
    }
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const data = { firstName, middleName, lastName, email, password, contactNo, role: 'user' }; 
    setStatus('loading');
    console.log(data);

    await axios({
      method: 'post',
      url: '/user/register',
      data,
      headers: { 'Access-Control-Allow-Origin': '*' },
    })
      .then((res) => {
        console.log(res);

        navigate('/'); 
        setStatus('idle');
      })
      .catch((e) => {
        console.log(e);
        setStatus('idle');

      });
  };

  useEffect(() => {
    setDebounceState(true);
  }, [userInputDebounce]);

  return (
    <div className='Register'>
      <div className='main-container'>
        <h3>Register</h3>
        <form>
          <div className='form-container'>
            <div className='form-group'>
              <label>First Name:</label>
              <input
                type='text'
                name='firstName'
                ref={firstNameRef}
                onChange={(e) => handleOnChange(e, 'firstName')}
              />
            </div>
            {debounceState && isFieldsDirty && firstName === '' && (
              <span className='errors'>This field is required</span>
            )}

            <div className='form-group'>
              <label>Middle Name:</label>
              <input
                type='text'
                name='middleName'
                ref={middleNameRef}
                onChange={(e) => handleOnChange(e, 'middleName')}
              />
            </div>

            <div className='form-group'>
              <label>Last Name:</label>
              <input
                type='text'
                name='lastName'
                ref={lastNameRef}
                onChange={(e) => handleOnChange(e, 'lastName')}
              />
            </div>

            <div className='form-group'>
              <label>E-mail:</label>
              <input
                type='text'
                name='email'
                ref={emailRef}
                onChange={(e) => handleOnChange(e, 'email')}
              />
            </div>
            {debounceState && isFieldsDirty && email === '' && (
              <span className='errors'>This field is required</span>
            )}

            <div className='form-group'>
              <label>Password:</label>
              <input
                type={isShowPassword ? 'text' : 'password'}
                name='password'
                ref={passwordRef}
                onChange={(e) => handleOnChange(e, 'password')}
              />
            </div>
            {debounceState && isFieldsDirty && password === '' && (
              <span className='errors'>This field is required</span>
            )}

            <div className='form-group'>
              <label>Confirm Password:</label>
              <input
                type={isShowPassword ? 'text' : 'password'}
                name='confirmPassword'
                ref={confirmPasswordRef}
                onChange={(e) => handleOnChange(e, 'confirmPassword')}
              />
            </div>
            {debounceState && isFieldsDirty && confirmPassword === '' && (
              <span className='errors'>This field is required</span>
            )}

            <div className='form-group'>
              <label>Contact Number:</label>
              <input
                type='text'
                name='contactNo'
                ref={confirmPasswordRef}
                onChange={(e) => handleOnChange(e, 'contactNo')}
              />
            </div>

            <div className='show-password' onClick={handleShowPassword}>
              {isShowPassword ? 'Hide' : 'Show'} Password
            </div>

            <div className='submit-container'>
              <button
                type='button'
                disabled={status === 'loading'}
                onClick={() => {
                  if (status === 'loading') {
                    return;
                  }
                  if (firstName && middleName && lastName && email && password && confirmPassword && contactNo) {
                    handleRegister();
                  } else {
                    setIsFieldsDirty(true);
                    if (firstName === '') {
                      firstNameRef.current.focus();
                    }
                    if (middleName === '') {
                      middleNameRef.current.focus();
                    }
                    if (lastName === '') {
                      lastNameRef.current.focus();
                    }
                    if (email === '') {
                      emailRef.current.focus();
                    }
                    if (password === '') {
                      passwordRef.current.focus();
                    }
                    if (confirmPassword === '') {
                      confirmPasswordRef.current.focus();
                    }
                    if (contactNo === '') {
                      confirmPasswordRef.current.focus();
                    }
                  }
                }}
              >
                {status === 'idle' ? 'Register' : 'Loading'}
              </button>
            </div>
            <div className='login-container'>
              <a href='/'>
                <small>Login</small>
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
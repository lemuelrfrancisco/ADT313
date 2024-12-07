import { useState, useRef, useCallback, useEffect, createContext, useContext } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../../utils/hooks/useDebounce';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFieldsDirty, setIsFieldsDirty] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const userInputDebounce = useDebounce({ email, password }, 2000);
  const [debounceState, setDebounceState] = useState(false);
  const [status, setStatus] = useState('idle');

  const navigate = useNavigate();

  //useContext to share user token and credentials
  const { setAuthData } = useContext(AuthContext);

  //alert-box
  const [alertMessage, setAlertMessage] = useState('');
  const [isError, setIsError] = useState(false);

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

      case 'password':
        setPassword(event.target.value);
        break;

      default:
        break;
    }
  };

  let apiEndpoint;

  if (window.location.pathname.includes('/admin')) {
    apiEndpoint = '/admin/login';
  } else {
    apiEndpoint = '/user/login';
  }

  const handleLogin = async () => {
    const data = { email, password };
    setStatus('loading');


    await axios({
      method: 'post',
      url: apiEndpoint,
      data,
      headers: { 'Access-Control-Allow-Origin': '*' },
    })
      .then((res) => {
        console.log(res);
        localStorage.setItem('accessToken', res.data.access_token);
        localStorage.setItem('user' , JSON.stringify(res.data.user));
        //set the user auth and data
        setAuthData({
          accessToken: res.data.access_token,
          user: res.data.user,
        });
        //show the alert message
        setIsError(false);
        setAlertMessage(res.data.message);
        setTimeout(() => {
          if (res.data.user.role === 'admin'){
            navigate('/main/dashboard');
          }else{
            navigate('/main/movies'); // this is the user login
          }
          setStatus('idle');
        }, 3000);
      })
      .catch((e) => {
        console.log(e);

        //show the alert message
        setIsError(true);
        setAlertMessage(e.response?.data?.message || e.message);
        setTimeout(() => {
          setAlertMessage('');
          setStatus('idle');
        }, 3000);

        // alert(e.response.data.message);
      });
  };

  const { auth } = useContext(AuthContext);

  useEffect(() => {
    console.log('Auth State Updated:', auth);
  }, [auth]);

  useEffect(() => {
    setDebounceState(true);
  }, [userInputDebounce]);

  return (
    <div className='Login'>
      <div className='main-container'>
        {alertMessage && (<div className={`alert-box ${isError ? 'error' : 'success'}`}>{alertMessage}</div>)}
        <div className="background"></div>
        <form>
          <div className='form-container'>

            <div className='login-header'>
              <h1>Welcome to Movie<span>DB</span>!</h1>
              <p>Unlock the world of movies, reviews, and exclusive content.</p>
            </div>

            <div>
              <div className='form-group'>
                <label>E-mail:</label>
                <input type='text' name='email' ref={emailRef} onChange={(e) => handleOnChange(e, 'email')}/>
              </div>
              {debounceState && isFieldsDirty && email == '' && (<span className='errors'>This field is required</span>)}
            </div>

            <div>
              <div className='form-group'>
                <label>Password:</label>
                <div>
                  <input type={isShowPassword ? 'text' : 'password'} name='password' ref={passwordRef} onChange={(e) => handleOnChange(e, 'password')}/>
                  <span className={`fas ${isShowPassword ? 'fa-eye-slash' : 'fa-eye'}` } id='icon-toggle' onClick={handleShowPassword} />
                </div>
              </div>
              {debounceState && isFieldsDirty && password == '' && (<span className='errors'>This field is required</span>)}
            </div>


            <div className='submit-container'>
              <button type='button' disabled={status === 'loading'}
                onClick={() => {
                  if (status === 'loading') {
                    return;
                  }
                  if (email && password) {
                    handleLogin({
                      type: 'login',
                      user: { email, password },
                    });
                  } else {
                    setIsFieldsDirty(true);
                    if (email == '') {
                      emailRef.current.focus();
                    }

                    if (password == '') {
                      passwordRef.current.focus();
                    }
                  }
                }}
              >
                {status === 'idle' ? 'LOGIN' : 'LOADING'}
              </button>
            </div>
            <div className='register-container'>
              <span><small>Don't have an account? <a href='/register'>Register</a></small></span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
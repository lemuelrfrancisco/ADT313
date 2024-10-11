import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

function Register() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
  
    setStatus('loading');
    setError(null);
  
    try {
      const response = await axios.post('http://localhost:3000/admin/register', {
        email,
        firstName,  
        lastName,
        middleName,
        contactNo,
        password,
      });
  
      console.log(response);
      localStorage.setItem('accessToken', response.data.access_token);
      setStatus('idle');
      navigate('/'); 
    } catch (e) {
      console.log(e);
      setStatus('idle');
      setError(e.response?.data?.message || 'An error occurred during registration');
    }
  };
  

  return (
    <div className='Register'>
      <div className='main-container'>
        <h3>Register</h3>
        <form>
          <div className='form-container'>
            <div className='form-group'>
              <label>Email:</label>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label>First Name:</label>
              <input
                type='text'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label>Middle Name:</label>
              <input
                type='text'
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label>Last Name:</label>
              <input
                type='text'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label>Contact No.:</label>
              <input
                type='text'
                value={contactNo}
                onChange={(e) => setContactNo(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label>Password:</label>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label>Confirm Password:</label>
              <input
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {error && <span className='errors'>{error}</span>}
            <div className='submit-container'>
              <button
                type='button'
                disabled={status === 'loading'}
                onClick={handleRegister}
              >
                {status === 'idle' ? 'Register' : 'Loading'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;

import doodle from '../assets/welcome_char.svg';
import { NavLink } from 'react-router-dom';
import axios from '../axios/axios';
import { useState } from 'react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const checkEmailExists = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        '/users/reset',
        JSON.stringify({ email }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.data) {
        setError('');
        response.status === 200 ? setSuccess(true) : setSuccess(false);
      }
    } catch (error) {
      setError(error.response.data);
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        '/users/reset-password',
        JSON.stringify({ email, password }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.data) {
        setError('');
        response.status === 200 ? setSuccess(true) : setSuccess(false);
        if (response.status === 200) {
          setSuccessMessage('Password reset successful');
        }
      }
    } catch (error) {
      setError(error.response.data);
      error.response.status === 400 ? setSuccess(true) : setSuccess(false);
    }
  };

  return (
    <div>
      <div className='login-container'>
        <div className='login-image'>
          <img src={doodle} alt='doodle' />
        </div>
        <div className='login-form-wrapper'>
          <h2>Reset Password</h2>
          {!success ? (
            <div>
              <p>Please enter your email</p>
              <form action='post'>
                <input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='Email'
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
                <p className='error-message'>{error}</p>
                <button type='submit' onClick={checkEmailExists}>
                  Reset Password
                </button>
              </form>
            </div>
          ) : (
            <div>
              <p>Set new password</p>
              <form action='post'>
                <input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='Set new password'
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
                <p className='error-message'>{error}</p>
                {successMessage && (
                  <p className='success-message'>{successMessage}</p>
                )}
                <button type='submit' onClick={resetPassword}>
                  Reset Password
                </button>
              </form>
            </div>
          )}

          <div className='login-form-options'>
            <NavLink to='/login'>Back to Login</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

import { NavLink, Navigate } from 'react-router-dom';
import axios from '../axios/axios';
import doodle from '../assets/welcome_char.svg';
import { useState } from 'react';
import Cookies from 'universal-cookie';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginURl = '/users/login';
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        loginURl,
        JSON.stringify({ email, password }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.data) {
        const cookies = new Cookies();
        cookies.set('auth-token', response.data.token, {
          path: '/',
          sameSite: 'strict',
          secure: true,
          maxAge: 60 * 60 * 24,
        });

        const firstName = response.data.user.firstName;

        localStorage.setItem('firstName', firstName);
        setSuccess(true);
        setError('');
      }
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <>
      {success ? (
        <Navigate
          to={{
            pathname: '/dashboard',
          }}
        />
      ) : (
        <div>
          <div className='login-container'>
            <div className='login-image'>
              <img src={doodle} alt='doodle' />
            </div>
            <div className='login-form-wrapper'>
              <h2>Welcome back</h2>
              <p>Please sign in to continue</p>
              <form action='post' onSubmit={handleSubmit}>
                <input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='Email'
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
                <input
                  type='password'
                  name='password'
                  id='password'
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder='Password'
                  required
                />
                {error && <p className='error-message'>{error}</p>}
                <button type='submit'>Sign In</button>
              </form>
              <div className='login-form-options'>
                <NavLink to='/forgot-password'>Forgot password?</NavLink>
                <NavLink to='/register'>
                  Don't have an account? Register
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

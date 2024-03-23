import doodle from '../assets/welcome_char.svg';
import { NavLink, Navigate } from 'react-router-dom';
import axios from '../axios/axios';
import { useState } from 'react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const registerURl = '/users/register';
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const passwordCheck = () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
    } else {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        registerURl,
        JSON.stringify({ email, password, firstName, lastName }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      if (response.data) {
        setSuccess(true);
        setError('');
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data);
    }
  };

  return (
    <>
      {success ? (
        <Navigate
          to={{
            pathname: '/login',
          }}
        />
      ) : (
        <div>
          <div className='login-container'>
            <div className='login-image'>
              <img src={doodle} alt='doodle' />
            </div>
            <div className='login-form-wrapper'>
              <h2>Sign up</h2>
              <p>Please create your account</p>
              <form action='post' onSubmit={handleSubmit}>
                <input
                  type='text'
                  name='firstName'
                  id='firstName'
                  onChange={(e) => setfirstName(e.target.value)}
                  value={firstName}
                  placeholder='First name'
                  required
                />
                <input
                  type='text'
                  name='lastName'
                  id='lastName'
                  onChange={(e) => setlastName(e.target.value)}
                  value={lastName}
                  placeholder='Last name'
                  required
                />
                <input
                  type='email'
                  name='email'
                  id='email'
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder='Email'
                  required
                />
                <input
                  type='password'
                  name='password'
                  id='password'
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={passwordCheck}
                  value={password}
                  placeholder='Password'
                  required
                />
                <input
                  type='password'
                  name='confirm-password'
                  id='confirm-password'
                  onChange={(e) => setconfirmPassword(e.target.value)}
                  onBlur={passwordCheck}
                  value={confirmPassword}
                  placeholder='Confirm your password'
                  required
                />
                {error && <p className='error-message'>{error}</p>}
                <button type='submit'>Sign Up</button>
              </form>
              <div className='login-form-options'>
                <NavLink to='/login'>
                  Already have an account? Click here to log in.
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

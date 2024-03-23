import doodle from '../assets/welcome_char.svg';
import { NavLink } from 'react-router-dom';

export default function ForgotPassword() {
  return (
    <div>
      <div className='login-container'>
        <div className='login-image'>
          <img src={doodle} alt='doodle' />
        </div>
        <div className='login-form-wrapper'>
          <h2>Reset Password</h2>
          <p>Please enter your email</p>
          <form action='post'>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='Email'
              required
            />
            <button type='submit'>Reset Password</button>
          </form>
          <div className='login-form-options'>
            <NavLink to='/login'>
              Already have an account? Click here to log in.
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

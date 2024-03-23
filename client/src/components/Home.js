import illustration from '../assets/Illustrations_coffee.svg';
import { NavLink } from 'react-router-dom';
export default function Home() {
  return (
    <div className='index'>
      <div className='w-3/4'>
        <h1>Welcome to MetaDev HR</h1>
        <p>
          Welcome to MetaDev HR ERP, a comprehensive human resources management
          system designed to streamline your employee management processes and
          enhance organizational efficiency. With our platform, you can
          effortlessly oversee your workforce, monitor open positions, and much
          more.
        </p>
        <p>
          Getting started is easy – simply log in or register for an account to
          access our suite of powerful tools. Should you ever forget your
          password, our user-friendly interface offers a convenient "Forgot
          Password" link for seamless account recovery.
        </p>
        <div className='flex space-x-4 mt-8'>
          <NavLink to='/login' className='btn'>
            Log In
          </NavLink>
          <NavLink to='/register' className='btn'>
            Register
          </NavLink>
        </div>
      </div>
      <img
        src={illustration}
        alt='Illustration'
        className='w-2/3 object-cover'
      />
    </div>
  );
}

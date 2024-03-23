import { NavLink, useLocation } from 'react-router-dom';
import logo from '../assets/logo.svg';
import burger from '../assets/burger.svg';
import close from '../assets/close.svg';
import { useEffect, useRef } from 'react';
export default function Navigation() {
  const location = useLocation();
  const burgerBtnRef = useRef(null);
  const closeBtnRef = useRef(null);
  const closeBtnRef2 = useRef(null);

  const closeMenu = () => {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.remove('vertical-nav');
  };

  useEffect(() => {
    const navLinks = document.querySelector('.nav-links');
    const navLinkElements = navLinks.querySelectorAll('a');
    const handleBurgerClick = () => {
      navLinks.classList.toggle('vertical-nav');
      console.log('click');
    };

    const burgerBtn = burgerBtnRef.current;
    burgerBtn.addEventListener('click', handleBurgerClick);

    const closeBtn = closeBtnRef.current;
    closeBtn.addEventListener('click', handleBurgerClick);

    const closeBtn2 = closeBtnRef2.current;
    closeBtn2.addEventListener('click', closeMenu);

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        navLinks.classList.remove('vertical-nav');
      }
    });

    navLinkElements.forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    return () => {
      burgerBtn.removeEventListener('click', handleBurgerClick);
      closeBtn.removeEventListener('click', handleBurgerClick);
      navLinkElements.forEach((link) => {
        link.removeEventListener('click', closeMenu);
      });
    };
  }, []);

  return (
    <div className='home-navbar'>
      <nav>
        <button ref={burgerBtnRef} className='burger-btn'>
          <img src={burger} alt='' />
        </button>
        <NavLink to='/' className='logo'>
          <img src={logo} alt='logo' />
        </NavLink>
        <div
          className={
            location.pathname === '/' ||
            location.pathname === '/login' ||
            location.pathname === '/register' ||
            location.pathname === '/forgot-password'
              ? 'nav-links hidden'
              : 'hidden'
          }
        >
          <button ref={closeBtnRef} className='burger-btn'>
            <img src={close} alt='' />
          </button>
          <NavLink
            to='/'
            className={location.pathname === '/' ? 'underline' : ''}
          >
            Home
          </NavLink>
          <NavLink
            to='/login'
            className={
              location.pathname === '/login' ||
              location.pathname === '/forgot-password'
                ? 'underline'
                : ''
            }
          >
            Login
          </NavLink>
          <NavLink
            to='/register'
            className={location.pathname === '/register' ? 'underline' : ''}
          >
            Register
          </NavLink>
        </div>
        <div
          className={
            location.pathname === '/dashboard' ||
            location.pathname === '/employees' ||
            location.pathname === '/departments' ||
            location.pathname === '/open-positions'
              ? 'nav-links hidden'
              : 'hidden'
          }
        >
          <button ref={closeBtnRef2} className='burger-btn'>
            <img src={close} alt='' />
          </button>
          <NavLink
            to='/dashboard'
            className={location.pathname === '/dashboard' ? 'underline' : ''}
          >
            Dashboard
          </NavLink>
          <NavLink
            to='/employees'
            className={location.pathname === '/employees' ? 'underline' : ''}
          >
            Employees
          </NavLink>
          <NavLink
            to='/departments'
            className={location.pathname === '/departments' ? 'underline' : ''}
          >
            Departments
          </NavLink>
          <NavLink
            to='/open-positions'
            className={
              location.pathname === '/open-positions' ? 'underline' : ''
            }
          >
            Open Positions
          </NavLink>
        </div>
      </nav>
    </div>
  );
}

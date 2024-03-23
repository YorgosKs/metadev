import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Navigation from './components/Navbar';
import ForgotPassword from './components/ForgotPassword';
import Dashboard from './components/dashboard/Dashboard';
import Employees from './components/employees/Employees';
import Departments from './components/departments/Departments';
import OpenPositions from './components/hr/OpenPositions';
import NotFound from './components/404';
import Protected from './Protected';
import Cookies from 'universal-cookie';
function App() {
  const cookies = new Cookies();
  const token = cookies.get('auth-token');
  return (
    <div className='main relative'>
      <Router>
        <Navigation />
        <Routes>
          <Route
            path='/'
            element={
              <Protected cookie={token}>
                <Home />
              </Protected>
            }
          />
          <Route
            path='/login'
            element={
              <Protected cookie={token}>
                <Login />
              </Protected>
            }
          />
          <Route
            path='/register'
            element={
              <Protected cookie={token}>
                <Register />
              </Protected>
            }
          />
          <Route
            path='/forgot-password'
            element={
              <Protected cookie={token}>
                <ForgotPassword />
              </Protected>
            }
          />
          <Route
            path='/dashboard'
            element={
              <Protected cookie={token}>
                <Dashboard />
              </Protected>
            }
          />
          <Route
            path='/employees'
            element={
              <Protected cookie={token}>
                <Employees />
              </Protected>
            }
          />
          <Route
            path='/departments'
            element={
              <Protected cookie={token}>
                <Departments />
              </Protected>
            }
          />
          <Route
            path='/open-positions'
            element={
              <Protected cookie={token}>
                <OpenPositions />
              </Protected>
            }
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

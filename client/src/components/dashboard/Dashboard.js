import EmployeesData from './EmployeesData';
import DepartmentsData from './DepartmentsData';
import CurrentPositions from './CurrentPositions';
import axios from '../../axios/axios';
import Cookies from 'universal-cookie';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);
  const [firstName, setFirstName] = useState([]);
  const [greeting, setGreeting] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [search, setSearch] = useState('');

  const getEmployeesLengthPerDepartment = async () => {
    try {
      const cookies = new Cookies();
      const token = cookies.get('auth-token');
      const response = await axios.get('/departments/employees', {
        headers: { 'auth-token': token },
      });

      if (response) {
        setDepartments(response.data);
        setSuccess(true);
        setError('');
      }
    } catch (error) {
      setError('Something went wrong');
    }
  };

  const getOpenPositions = async () => {
    try {
      const cookies = new Cookies();
      const token = cookies.get('auth-token');
      const response = await axios.get('/positions/open', {
        headers: { 'auth-token': token },
      });

      if (response) {
        setPositions(response.data);
        setSuccess(true);
        setError('');
      }
    } catch (error) {
      setError('Something went wrong');
    }
  };

  useEffect(() => {
    getEmployeesLengthPerDepartment();
    getOpenPositions();
    localStorage.getItem('firstName') &&
      setFirstName(localStorage.getItem('firstName'));

    const date = new Date();
    const hour = date.getHours();
    if (hour < 12) {
      setGreeting('Good morning');
    } else if (hour >= 12 && hour < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
  }, []);

  return (
    <div className='dashboard-container'>
      <h2>
        {greeting + ', '} {firstName + '!'}
      </h2>
      <div className='dashboard-wrapper'>
        <div className='left-col'>
          <EmployeesData />
          <DepartmentsData departments={departments} error={error} />
        </div>
        <div className='right-col'>
          <CurrentPositions positions={positions} />
        </div>
      </div>
    </div>
  );
}

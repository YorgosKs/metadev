import EmployeesList from './EmployeesList';
import Search from './Search';
import { useState, useEffect } from 'react';
import axios from '../../axios/axios';
import Cookies from 'universal-cookie';

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [search, setSearch] = useState('');

  const getEmployees = async () => {
    try {
      const cookies = new Cookies();
      const token = cookies.get('auth-token');

      const response = await axios.get('/employees/', {
        headers: { 'auth-token': token },
      });
      setEmployees(response.data);
      setFilteredEmployees(response.data);
      setSuccess(true);
      setError('');
    } catch (error) {
      setError(error.response.data);
    }
  };

  const getEmployeesLengthPerDepartment = async () => {
    try {
      const cookies = new Cookies();
      const token = cookies.get('auth-token');

      const response = await axios.get('/departments/employees', {
        headers: { 'auth-token': token },
      });
      setDepartments(response.data);
      setSuccess(true);
      setError('');
    } catch (error) {
      setError(error.response.data);
    }
  };

  useEffect(() => {
    getEmployees();
    getEmployeesLengthPerDepartment();
  }, []);

  const handleInputChange = (value) => {
    const searchTerm = value;

    const initEmployees = [...employees];

    if (
      searchTerm === '' ||
      searchTerm === null ||
      searchTerm === undefined ||
      searchTerm.length === 0
    ) {
      setFilteredEmployees(initEmployees);
    }

    setSearch(searchTerm);

    const filteredData = employees.filter((employee) => {
      return (
        employee.firstName.toLowerCase().includes(search.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(search.toLowerCase()) ||
        employee.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
        employee.department.toLowerCase().includes(search.toLowerCase()) ||
        employee.email.toLowerCase().includes(search.toLowerCase()) ||
        employee.phone.toLowerCase().includes(search.toLowerCase()) ||
        employee.employeeStatus.toLowerCase().includes(search.toLowerCase())
      );
    });

    setFilteredEmployees(filteredData);
  };

  return (
    <div className='employees-container'>
      <Search fromChild={handleInputChange} />
      <EmployeesList employees={filteredEmployees} />
    </div>
  );
}

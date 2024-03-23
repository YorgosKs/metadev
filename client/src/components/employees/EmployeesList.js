import React, { useState } from 'react';
import EmployeesItem from './EmployeesItem';

export default function EmployeesList({ employees }) {
  const [currentPage, setCurrentPage] = useState(1); // new state variable for current page
  const employeesPerPage = 10; // number of employees per page

  // calculate the range of employees for the current page
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  return (
    <div className='employees-list-container'>
      <div className='employees-list'>
        {currentEmployees.length === 0 ? (
          <div className='no-employees'>
            <h2>No employees found</h2>
          </div>
        ) : (
          currentEmployees.map((employee) => (
            <EmployeesItem key={employee._id} employee={employee} />
          ))
        )}
      </div>
      <div className='w-full flex flex-row gap-8'>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          style={{ display: currentPage === 1 ? 'none' : 'block' }}
          className='bg-very-dark-blue hover:bg-des-blue text-gray-blue py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        >
          Previous
        </button>
        <p
          className='text-center text-gray-700 px-4 py-2 bg-gray-200 rounded-xl w-1/10'
          style={{ display: employees.length === 0 ? 'none' : 'block' }}
        >
          Page {currentPage} of {Math.ceil(employees.length / employeesPerPage)}
        </p>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage * employeesPerPage >= employees.length}
          style={{
            display:
              currentPage * employeesPerPage >= employees.length
                ? 'none'
                : 'block',
          }}
          className='bg-very-dark-blue hover:bg-des-blue text-gray-blue py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        >
          Next
        </button>
      </div>
    </div>
  );
}

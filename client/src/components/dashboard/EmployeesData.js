import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default function EmployeesData({ employees }) {
  // total number of employees
  const totalEmployees = employees.length;
  // find all employees with status 'working'
  const workingEmployees = employees.filter(
    (employee) => employee.employeeStatus === 'Active'
  ).length;
  // find all employees with status 'day off'
  const dayOffEmployees = employees.filter(
    (employee) => employee.employeeStatus === 'On Leave'
  ).length;
  // find all employees with status 'sick'
  const sickEmployees = employees.filter(
    (employee) => employee.employeeStatus === 'Terminated'
  ).length;

  const data = {
    labels: ['Active', 'On Leave', 'Terminated'],
    datasets: [
      {
        data: [workingEmployees, dayOffEmployees, sickEmployees],
        backgroundColor: [
          'rgba(255, 206, 86, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='dashboard-item'>
      <div className='employees-quick-details'>
        <div className='quick-details-list'>
          <ul>
            <li>
              Total employees <span>{totalEmployees}</span>
            </li>
            <li>
              Active <span>{workingEmployees}</span>
            </li>
            <li>
              On Leave <span>{dayOffEmployees}</span>
            </li>
            <li>
              Terminated <span>{sickEmployees}</span>
            </li>
          </ul>
        </div>
        <div className='quick-details-pie'>
          <Doughnut data={data} />
        </div>
      </div>
    </div>
  );
}

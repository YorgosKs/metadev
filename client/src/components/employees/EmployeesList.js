import EmployeesItem from './EmployeesItem';

export default function EmployeesList({ employees }) {
  console.log(employees.length);
  return (
    <div className='employees-list-container'>
      <div className='list-header'>
        <ul>
          <li>Name</li>
          <li>Surname</li>
          <li>Job Title</li>
          <li>Departments</li>
          <li>Email</li>
          <li>Phone</li>
          <li>Working</li>
          <li>Employee Status</li>
        </ul>
      </div>
      <div className='employees-list'>
        {employees.length === 0 ? (
          <div className='no-employees'>
            <h2>No employees found</h2>
          </div>
        ) : (
          employees.map((employee) => (
            <EmployeesItem key={employee._id} employee={employee} />
          ))
        )}
      </div>
    </div>
  );
}

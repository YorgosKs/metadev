export default function EmployeesItem({ employee }) {
  return (
    <div className='employees-item-container'>
      <ul>
        <li>{employee.firstName}</li>
        <li>{employee.lastName}</li>
        <li>{employee.jobTitle}</li>
        <li>{employee.department}</li>
        <li>{employee.email}</li>
        <li>{employee.phone}</li>
        <li>{employee.working}</li>
        <li>{employee.employeeStatus}</li>
      </ul>
    </div>
  );
}

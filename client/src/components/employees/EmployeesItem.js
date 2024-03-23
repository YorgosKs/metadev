export default function EmployeesItem({ employee }) {
  return (
    <div className='employees-item-container'>
      <ul>
        <li>
          <span>Name</span>
          {employee.firstName}
        </li>
        <li>
          <span>Surname</span>
          {employee.lastName}
        </li>
        <li>
          <span>Job Title</span>
          {employee.jobTitle}
        </li>
        <li>
          <span>Departments</span>
          {employee.department}
        </li>
        <li>
          <span>Email</span>
          {employee.email}
        </li>
        <li>
          <span>Phone</span>
          {employee.phone}
        </li>
        <li>
          <span>Employee Status</span>
          {employee.employeeStatus}
        </li>
      </ul>
    </div>
  );
}

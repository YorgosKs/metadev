export default function DepartmentsData({ departments, error }) {
  return (
    <div className='dashboard-item'>
      <div className='departments-quick-details'>
        <h3>Departments</h3>
        <div className='quick-details-list'>
          <ul>
            {departments ? (
              departments.map((department) => (
                <li key={department._id}>
                  {department.departmentName}{' '}
                  <span>{department.employeeCount}</span>
                </li>
              ))
            ) : (
              <li>{error}</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function EmployeesData() {
  return (
    <div className='dashboard-item'>
      <div className='employees-quick-details'>
        <div className='quick-details-list'>
          <ul>
            <li>
              Total employees <span>46</span>
            </li>
            <li>
              Working <span>35</span>
            </li>
            <li>
              Day off <span>9</span>
            </li>
            <li>
              Sick <span>0</span>
            </li>
          </ul>
        </div>
        <div className='quick-details-pie'>
          <h1>pie chart</h1>
        </div>
      </div>
    </div>
  );
}

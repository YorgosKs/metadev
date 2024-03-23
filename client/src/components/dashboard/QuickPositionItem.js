export default function QuickPositionItem({ position }) {
  const { positionName, department, date, shortDescription } = position;

  function calculateDaysFromDate(dateString) {
    const givenDate = new Date(dateString);
    const currentDate = new Date();

    const differenceInTime = currentDate.getTime() - givenDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    return Math.floor(differenceInDays);
  }

  const daysSince = calculateDaysFromDate(date);

  return (
    <div className='position-item'>
      <div className='position-item-details'>
        <h3>{positionName}</h3>
        <h4>{department}</h4>
        <p>
          Posted{' '}
          {daysSince > 0
            ? daysSince === 1
              ? 'yesterday'
              : `${daysSince} days ago`
            : 'today'}
        </p>
        <p className='short-description'>{shortDescription}</p>
      </div>
    </div>
  );
}

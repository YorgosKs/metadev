import QuickPositionItem from './QuickPositionItem';
import { NavLink } from 'react-router-dom';
export default function CurrentPositions({ positions }) {
  console.log(positions);
  return (
    <div className='dashboard-item'>
      <div className='positions-quick-details'>
        <h3>Current open positions</h3>
        {positions.length > 0 ? (
          positions.map((position) => (
            <QuickPositionItem key={position._id} position={position} />
          ))
        ) : (
          <p className='empty-positions'>No open positions</p>
        )}
        <NavLink to={'/open-positions'} className='show-more'>
          Show more
        </NavLink>
      </div>
    </div>
  );
}

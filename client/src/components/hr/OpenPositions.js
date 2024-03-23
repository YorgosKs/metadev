import PositionItem from './PositionItem';
import axios from '../../axios/axios';
import Cookies from 'universal-cookie';
import { useEffect, useState } from 'react';
import NewPositionForm from './NewPositionForm';
export default function OpenPositions() {
  console.log('OpenPositions.js');
  const [positions, setPositions] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // new state variable for current page
  const positionsPerPage = 3; // number of positions per page

  useEffect(() => {
    getOpenPositions();
  }, []);

  const getOpenPositions = async () => {
    try {
      const cookies = new Cookies();
      const token = cookies.get('auth-token');
      const response = await axios.get('/positions/open', {
        headers: { 'auth-token': token },
      });

      if (response) {
        setPositions(response.data.reverse());
        setSuccess(true);
        setError('');
      }
    } catch (error) {
      setError('Something went wrong');
    }
  };

  const setOpenFormFunc = () => {
    setOpenForm(!openForm);
    getOpenPositions();
    window.scrollTo(0, 0);
  };

  // calculate the range of positions for the current page
  const indexOfLastPosition = currentPage * positionsPerPage;
  const indexOfFirstPosition = indexOfLastPosition - positionsPerPage;
  const currentPositions = positions.slice(
    indexOfFirstPosition,
    indexOfLastPosition
  );

  return (
    <div className='positions-container relative mb-10'>
      <div className='positions-header'>
        {openForm && (
          <NewPositionForm fromChild={setOpenFormFunc} openForm={openForm} />
        )}
        <h2>Current open positions</h2>
        <button
          onClick={() => setOpenForm(!openForm)}
          className='new-position-button'
        >
          New position
        </button>
      </div>
      <div className='positions-list'>
        {currentPositions.map((position) => (
          <PositionItem
            key={position._id}
            position={position}
            getOpenPositions={getOpenPositions}
          />
        ))}
      </div>
      <div className='w-full mx-auto flex flex-row items-center justify-between md:justify-start gap-8 mt-10'>
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
          style={{ display: positions.length === 0 ? 'none' : 'block' }}
        >
          Page {currentPage} of {Math.ceil(positions.length / positionsPerPage)}
        </p>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage * positionsPerPage >= positions.length}
          style={{
            display:
              currentPage * positionsPerPage >= positions.length
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

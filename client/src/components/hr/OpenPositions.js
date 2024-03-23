import PositionItem from './PositionItem';
import axios from '../../axios/axios';
import Cookies from 'universal-cookie';
import { useEffect, useState } from 'react';
import NewPositionForm from './NewPositionForm';
export default function OpenPositions() {
  const [positions, setPositions] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [openForm, setOpenForm] = useState(false);

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
        console.log(response.data);
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

  return (
    <div className='positions-container relative'>
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
        {positions.map((position) => (
          <PositionItem
            key={position.positionId}
            position={position}
            getOpenPositions={getOpenPositions}
          />
        ))}
      </div>
    </div>
  );
}

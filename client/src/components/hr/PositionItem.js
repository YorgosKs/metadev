import axios from '../../axios/axios';
import Cookies from 'universal-cookie';
import EditPositionForm from './EditPositionForm';
import { useState } from 'react';

export default function PositionItem({ position, getOpenPositions }) {
  const [openForm, setOpenForm] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const {
    positionName,
    department,
    date,
    shortDescription,
    totalApplications,
    firstStage,
    secondStage,
    finalStage,
    _id,
  } = position;

  console.log(_id);

  const localDate = new Date(date);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = localDate.toLocaleDateString('en-US', options);

  const setOpenFormFunc = () => {
    setOpenForm(!openForm);
    getOpenPositions();
    window.scrollTo(0, 0);
  };

  const deletePosition = async () => {
    try {
      const cookies = new Cookies();
      const token = cookies.get('auth-token');
      const response = await axios.delete(`/positions/${_id}`, {
        headers: { 'auth-token': token },
      });

      if (response) {
        getOpenPositions();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='position-item'>
      {openForm && (
        <EditPositionForm
          fromChild={setOpenFormFunc}
          openForm={openForm}
          positionDetails={position}
        />
      )}
      {deleteModal && (
        <div className='delete-modal'>
          <div className='delete-modal-content'>
            <h3>Are you sure you want to delete this position?</h3>
            <button onClick={deletePosition}>Yes</button>
            <button onClick={() => setDeleteModal(!deleteModal)}>No</button>
          </div>
        </div>
      )}
      <div className='position-item-detail'>
        <h3>
          {positionName}
          <div className='flex flex-row gap-4 mt-2 justify-between md:pl-6'>
            <button onClick={setOpenFormFunc} className='edit-position-button'>
              Edit
            </button>
            <button
              onClick={() => setDeleteModal(!deleteModal)}
              className='delete-position-button'
            >
              Delete
            </button>
          </div>
        </h3>
        <h4>{department}</h4>
        <p>{formattedDate}</p>
        <p className='short-description'>{shortDescription}</p>
      </div>
      <div className='position-stats'>
        <ul>
          <li className='w-full text-center '>
            Total Applications
            <span>{totalApplications || 0}</span>
          </li>
          <li>
            First Stage <span>{firstStage || 0}</span>
          </li>
          <li>
            Second Stage <span>{secondStage || 0}</span>
          </li>
          <li>
            Final Stage <span>{finalStage || 0}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

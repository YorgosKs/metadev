import React, { useEffect, useState } from 'react';
import axios from '../../axios/axios';
import Cookies from 'universal-cookie';

export default function EditPositionForm({
  positionDetails,
  fromChild,
  openForm,
}) {
  const clearForm = () => {
    document.getElementById('position-name').value = '';
    document.getElementById('department').value = '';
    document.getElementById('short-description').value = '';
    document.getElementById('full-description').value = '';
    fromChild(!openForm);
  };

  const [positionName, setPositionName] = useState(
    positionDetails.positionName
  );
  const [department, setDepartment] = useState(positionDetails.department);
  const [shortDescription, setShortDescription] = useState(
    positionDetails.shortDescription
  );
  const [fullDescription, setFullDescription] = useState(
    positionDetails.fullDescription
  );
  const [status, setStatus] = useState(positionDetails.status);
  const [totalApplication, setTotalApplication] = useState(
    positionDetails.totalApplication
  );
  const [firstStage, setFirstStage] = useState(positionDetails.firstStage);
  const [secondStage, setSecondStage] = useState(positionDetails.secondStage);
  const [finalStage, setFinalStage] = useState(positionDetails.finalStage);
  const id = positionDetails._id;

  const setters = {
    'position-name': setPositionName,
    department: setDepartment,
    'short-description': setShortDescription,
    'full-description': setFullDescription,
    status: setStatus,
    'total-application': setTotalApplication,
    'first-stage': setFirstStage,
    'second-stage': setSecondStage,
    'final-stage': setFinalStage,
  };

  const handleChanges = (e) => {
    const setterFunction = setters[e.target.id];
    if (setterFunction) {
      setterFunction(e.target.value);
    }
  };

  const getDepartments = async () => {
    try {
      const cookies = new Cookies();
      const token = cookies.get('auth-token');
      const response = await axios.get('/departments', {
        headers: { 'auth-token': token },
      });

      if (response) {
        const select = document.getElementById('department');
        response.data.forEach((department) => {
          const option = document.createElement('option');
          option.value = department.departmentName;
          option.innerHTML = department.departmentName;
          select.appendChild(option);
        });

        if (department) {
          document.getElementById('department').value = department;
        }
      } else {
      }
    } catch (error) {}
  };

  useEffect(() => {
    getDepartments();
  }, []);

  const updatePosition = async () => {
    const positionName = document.getElementById('position-name').value;
    const department = document.getElementById('department').value;
    const shortDescription = document.getElementById('short-description').value;
    const fullDescription = document.getElementById('full-description').value;
    const status = document.getElementById('status').value;
    const totalApplication = document.getElementById('total-application').value;
    const firstStage = document.getElementById('first-stage').value;
    const secondStage = document.getElementById('second-stage').value;
    const finalStage = document.getElementById('final-stage').value;

    try {
      const cookies = new Cookies();
      const token = cookies.get('auth-token');
      const response = await axios.put(
        `/positions/${id}`,
        {
          positionName,
          department,
          shortDescription,
          fullDescription,
          status,
          totalApplication,
          firstStage,
          secondStage,
          finalStage,
        },
        {
          headers: { 'auth-token': token },
        }
      );

      if (response) {
        clearForm();
      }
    } catch (error) {}
  };

  return (
    <div className='edit-position-form'>
      <h2>Edit position</h2>
      <form>
        <div className='form-group'>
          <label htmlFor='position-name'>Position name</label>
          <input
            type='text'
            id='position-name'
            value={positionName}
            onChange={(e) => handleChanges(e)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='department'>Department</label>
          <select id='department' onChange={(e) => handleChanges(e)}></select>
        </div>
        <div className='form-group'>
          <label htmlFor='short-description'>Short description</label>
          <textarea
            id='short-description'
            value={shortDescription}
            onChange={(e) => handleChanges(e)}
          ></textarea>
        </div>
        <div className='form-group'>
          <label htmlFor='full-description'>Full description</label>
          <textarea
            id='full-description'
            value={fullDescription}
            onChange={(e) => handleChanges(e)}
          ></textarea>
        </div>
        <div className='form-group'>
          <label htmlFor='status'>Status</label>
          <select id='status' onChange={(e) => handleChanges(e)}>
            <option value='true'>Open</option>
            <option value='false'>Closed</option>
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='total-application'>Total Applications</label>
          <input
            type='number'
            id='total-application'
            onChange={(e) => handleChanges(e)}
            value={totalApplication}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='first-stage'>First Stage</label>
          <input
            type='number'
            id='first-stage'
            onChange={(e) => handleChanges(e)}
            value={firstStage}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='second-stage'>Second Stage</label>
          <input
            type='number'
            id='second-stage'
            onChange={(e) => handleChanges(e)}
            value={secondStage}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='final-stage'>Final Stage</label>
          <input
            type='number'
            id='final-stage'
            onChange={(e) => handleChanges(e)}
            value={finalStage}
          />
        </div>

        <div className='btn-group'>
          <button onClick={() => clearForm()} type='button'>
            Cancel
          </button>
          <button
            onClick={() => updatePosition()}
            type='button'
            className='btn-primary'
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

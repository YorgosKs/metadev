import axios from '../../axios/axios';
import Cookies from 'universal-cookie';
import { useEffect, useState } from 'react';

export default function NewPositionForm(props) {
  useEffect(() => {
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
        } else {
        }
      } catch (error) {}
    };
    getDepartments();
  }, []);

  const clearForm = () => {
    document.getElementById('position-name').value = '';
    document.getElementById('department').value = '';
    document.getElementById('short-description').value = '';
    document.getElementById('full-description').value = '';
    props.fromChild(!props.openForm);
  };

  const postNewPosition = async () => {
    const positionName = document.getElementById('position-name').value;
    const department = document.getElementById('department').value;
    const shortDescription = document.getElementById('short-description').value;
    const fullDescription = document.getElementById('full-description').value;

    try {
      const cookies = new Cookies();
      const token = cookies.get('auth-token');
      const response = await axios.post(
        '/positions/new',
        {
          positionName,
          department,
          shortDescription,
          fullDescription,
          status: true,
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
    <div className='new-position-form'>
      <h2>New position</h2>
      <form>
        <div className='form-group'>
          <label htmlFor='position-name'>Position name</label>
          <input type='text' id='position-name' />
        </div>
        <div className='form-group'>
          <label htmlFor='department'>Department</label>
          <select name='department' id='department'>
            <option value=''>Select department</option>
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='short-description'>Short description</label>
          <textarea name='short-description' id='short-description'></textarea>
        </div>
        <div className='form-group'>
          <label htmlFor='full-description'>Full description</label>
          <textarea name='full-description' id='full-description'></textarea>
        </div>
        <div className='btn-group'>
          <button onClick={() => clearForm()} type='button'>
            Cancel
          </button>
          <button
            onClick={() => postNewPosition()}
            type='button'
            className='btn-primary'
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

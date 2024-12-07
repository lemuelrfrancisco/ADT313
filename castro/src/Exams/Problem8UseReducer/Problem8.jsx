import { useCallback, useEffect, useState } from 'react';
import data from './problem8mock_data.json';
export default function Problem8() {
  const [foods, setFoods] = useState(data);
  const [selected, setSelected] = useState();

  return (
    <>
      <div>
        <div style={{ display: 'block' }}>
          Food Name:{' '}
          <input
            type='text'
            value={selected && selected.food_name ? selected.food_name : ''}
          />
        </div>
        <div style={{ display: 'block' }}>
          Price:{' '}
          <input
            type='text'
            value={selected && selected.price ? selected.price : ''}
          />
        </div>
        <div style={{ display: 'block' }}>
          Expiration Date:{' '}
          <input
            type='text'
            value={
              selected && selected.expiration_date
                ? selected.expiration_date
                : ''
            }
          />
        </div>
        <div style={{ display: 'block' }}>
          Calories:{' '}
          <input
            type='text'
            value={selected && selected.calories ? selected.calories : ''}
          />
        </div>

        <button type='button'>Save</button>
        <button type='button'>Clear</button>
      </div>
      <div className='table-container'>
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Food Name</th>
              <th>Price</th>
              <th>Expiration Date</th>
              <th>Calories</th>
            </tr>
          </thead>
          <tbody style={{ textAlign: 'center' }}>
            {foods.map((car, index) => {
              return (
                <tr>
                  <td>{car.food_name}</td>
                  <td>{car.price}</td>
                  <td>{car.expiration_date}</td>
                  <td>{car.calories}</td>
                  <td>
                    <button type='button'>Edit</button>
                    <button type='button'>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

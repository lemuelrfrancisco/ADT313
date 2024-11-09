import { useCallback, useEffect, useState } from 'react';
import data from './MOCK_DATA.json';

export default function Problem6() {
  const [cars, setCars] = useState(data);
  const [selected, setSelected] = useState(null);
  const [formValues, setFormValues] = useState({
    vin: '',
    make: '',
    model: '',
    year: '',
    color: '',
  });


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const clearForm = useCallback(() => {
    setFormValues({
      vin: '',
      make: '',
      model: '',
      year: '',
      color: '',
    });
    setSelected(null);
  }, []);

  
  const handleSave = useCallback(() => {
    if (selected !== null) {

      setCars((prevCars) =>
        prevCars.map((car, index) =>
          index === selected ? { ...formValues } : car
        )
      );
    } else {

      setCars((prevCars) => [...prevCars, formValues]);
    }
    clearForm();
  }, [formValues, selected, clearForm]);


  const handleEdit = useCallback(
    (index) => {
      const car = cars[index];
      setFormValues(car);
      setSelected(index);
    },
    [cars]
  );

 
  const handleDelete = useCallback(
    (index) => {
      setCars((prevCars) => prevCars.filter((_, i) => i !== index));
      if (selected === index) {
        clearForm();
      }
    },
    [selected, clearForm]
  );

  return (
    <>
      {}
      <div>
        <div style={{ display: 'block', marginBottom: '10px' }}>
          VIN: <input type='text' name='vin' value={formValues.vin} onChange={handleChange} />
        </div>
        <div style={{ display: 'block', marginBottom: '10px' }}>
          Make: <input type='text' name='make' value={formValues.make} onChange={handleChange} />
        </div>
        <div style={{ display: 'block', marginBottom: '10px' }}>
          Model: <input type='text' name='model' value={formValues.model} onChange={handleChange} />
        </div>
        <div style={{ display: 'block', marginBottom: '10px' }}>
          Year: <input type='text' name='year' value={formValues.year} onChange={handleChange} />
        </div>
        <div style={{ display: 'block', marginBottom: '10px' }}>
          Color: <input type='text' name='color' value={formValues.color} onChange={handleChange} />
        </div>

        <button type='button' onClick={handleSave}>
          {selected !== null ? 'Update' : 'Save'}
        </button>
        <button type='button' onClick={clearForm}>
          Clear
        </button>
      </div>

      {}
      <div className='table-container'>
        <table style={{ width: '100%', marginTop: '20px' }}>
          <thead>
            <tr>
              <th>VIN</th>
              <th>Make</th>
              <th>Model</th>
              <th>Year</th>
              <th>Color</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody style={{ textAlign: 'center' }}>
            {cars.map((car, index) => (
              <tr key={index}>
                <td>{car.vin}</td>
                <td>{car.make}</td>
                <td>{car.model}</td>
                <td>{car.year}</td>
                <td>{car.color}</td>
                <td>
                  <button type='button' onClick={() => handleEdit(index)}>
                    Edit
                  </button>
                  <button type='button' onClick={() => handleDelete(index)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
import { useNavigate } from 'react-router-dom';
import './Lists.css';
const Lists = () => {
  const navigate = useNavigate();
  return (
    <div className='lists-container'>
      <div className='create-container'>
        <button
          type='button'
          onClick={() => {
            navigate('/main/movies/form');
          }}
        >
          Create new
        </button>
      </div>
      <div className='table-container'>
        <table className='movie-lists'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Sample Movie</td>
              <td>
                <button
                  type='button'
                  onClick={() => {
                    navigate('/main/movies/form/1');
                  }}
                >
                  Edit
                </button>
                <button type='button'>Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Lists;

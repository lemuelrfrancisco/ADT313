import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Casts.css';

function Casts() {
  const [selectedCast, setSelectedCast] = useState(null); 
  const [castInfo, setCastInfo] = useState([]);
  const [state, setState] = useState("base");
  const [importedCast, setImportedCast] = useState([]);  // Store imported cast
  const [loading, setLoading] = useState(false);
  const [castFormData, setCastFormData] = useState({
    name: '',
    characterName: '',
    url: '',
  });

  let { tmdbId } = useParams();
  const accessToken = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem('user'));
  const TMDB_API_KEY = '43bde163469fc36ca5281d58b7e2e4c0';

  useEffect(() => {
    axios({
      method: 'get',
      url: `/casts`,  
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((response) => {
      setCastInfo(response.data);
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCastFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveNewCast = () => {
    const formData = new FormData();
    formData.append('userId', user.userId);
    formData.append('movieId', tmdbId);
    formData.append('name', castFormData.name);
    formData.append('characterName', castFormData.characterName);
    formData.append('url', castFormData.url);

    axios({
      method: 'post',
      url: '/casts',  // Adjust this endpoint to work with your backend
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        setCastInfo([...castInfo, response.data]);
        alert(`${castFormData.name} has been added to the cast list.`);
        resetForm();
        setState("base");
      })
      .catch((error) => console.error(error));
  };

  const handleEditCast = () => {
    const updatedCast = {
      ...selectedCast,
      name: castFormData.name,
      characterName: castFormData.characterName,
      url: castFormData.url,
    };

    axios({
      method: 'patch',
      url: `/casts/${selectedCast.id}`,  // Use the correct dynamic URL
      data: updatedCast,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        const updatedList = castInfo.map((cast) =>
          cast.id === selectedCast.id ? response.data : cast
        );
        setCastInfo(updatedList);
        alert(`The cast ${castFormData.name} has been updated.`);
        resetForm();
        setState("base");
      })
      .catch((error) => console.error(error));
  };

  const resetForm = () => {
    setCastFormData({ name: '', characterName: '', url: '' });
    setSelectedCast(null);
  };

  const handleDelete = (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this cast?');
    if (isConfirmed) {
      axios({
        method: 'delete',
        url: `/casts/${id}`,  // Use the correct dynamic URL
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then(() => {
          setCastInfo(castInfo.filter((cast) => cast.id !== id));
        })
        .catch((error) => console.error(error));
    }
  };

  const handleImportCast = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${tmdbId}/credits?api_key=${TMDB_API_KEY}`
      );
      const importedData = response.data.cast;
      setImportedCast(importedData);  // Store imported cast

      setCastInfo((prev) => [
        ...prev,
        ...importedData.map((cast) => ({
          name: cast.name,
          characterName: cast.character,
          url: `https://image.tmdb.org/t/p/w500${cast.profile_path}`, // Construct image URL
        }))
      ]);
    } catch (error) {
      console.error("Error importing cast:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelImport = () => {
    setImportedCast([]);  // Reset the imported cast data
    setLoading(false);  // Stop the loading state
  };

  const handleAddImportedCast = (cast) => {
    const formData = new FormData();
    formData.append('userId', user.userId);
    formData.append('movieId', tmdbId);
    formData.append('name', cast.name);
    formData.append('characterName', cast.character);
    formData.append('url', `https://image.tmdb.org/t/p/w500${cast.profile_path}`);

    axios({
      method: 'post',
      url: '/casts',  // Adjust this endpoint to work with your backend
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        setCastInfo([...castInfo, response.data]);
        alert(`${cast.name} has been added to the cast list.`);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="container">
      <div className="button-container">
        <button
          className="button-Add"
          onClick={() => setState("add")}
        >
          Add Cast
        </button>
        <button
          className="button-Import"
          onClick={handleImportCast}
        >
          Import Cast from TMDB
        </button>
      </div>

      {state === "add" && (
        <div className="add-edit-form">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={castFormData.name}
            onChange={handleInputChange}
          />
          <label>Character Name:</label>
          <input
            type="text"
            name="characterName"
            value={castFormData.characterName}
            onChange={handleInputChange}
          />
          <label>Profile Image URL:</label>
          <input
            type="text"
            name="url"
            value={castFormData.url}
            onChange={handleInputChange}
          />
          <button
            onClick={handleSaveNewCast}
          >
            Save Cast
          </button>
          <button
            onClick={() => setState("base")}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Edit Cast Form */}
      {state === "edit" && (
        <div className="add-edit-form">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={castFormData.name}
            onChange={handleInputChange}
          />
          <label>Character Name:</label>
          <input
            type="text"
            name="characterName"
            value={castFormData.characterName}
            onChange={handleInputChange}
          />
          <label>Profile Image URL:</label>
          <input
            type="text"
            name="url"
            value={castFormData.url}
            onChange={handleInputChange}
          />
          <button
            onClick={handleEditCast} // Call function to save changes
          >
            Save Changes
          </button>
          <button
            onClick={() => {
              resetForm(); // Reset form state
              setState("base"); // Return to base state
            }}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Render imported cast list */}
      {importedCast.length > 0 && (
        <div className="imported-cast-container">
          {importedCast.map((cast) => (
            <div key={cast.id} className="cast-card">
              <img src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`} alt={cast.name} />
              <div className="info">
                <h3>{cast.name}</h3>
                <p>{cast.character}</p>
              </div>
              <button
                className="edit-button"
                onClick={() => handleAddImportedCast(cast)}
              >
                Add to Cast
              </button>
            </div>
          ))}
          <button
            className="cancel-button"
            onClick={handleCancelImport}  // Reset imported cast and stop loading
          >
            Cancel Import
          </button>
        </div>
      )}

      {/* Render saved cast list */}
      {castInfo.length > 0 && (
        <div className="saved-cast-container">
          {castInfo.map((cast) => (
            cast.movieId === parseInt(tmdbId) && (
              <div key={cast.id} className="cast-card">
                <img src={cast.url} alt={cast.name} />
                <div className="info">
                  <h3>{cast.name}</h3>
                  <p>{cast.characterName}</p>
                </div>
                <div className="actions">
                  <button
                    className="edit-button"
                    onClick={() => {
                      setState("edit");
                      setCastFormData({
                        name: cast.name,
                        characterName: cast.characterName,
                        url: cast.url,
                      });
                      setSelectedCast(cast); // Set selected cast for editing
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(cast.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          ))}
        </div>
      )}

      {loading && <p>Loading...</p>}
    </div>
  );
}

export default Casts;

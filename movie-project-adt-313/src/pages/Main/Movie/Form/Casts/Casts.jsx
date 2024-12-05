import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Casts.css';

function Casts() {
  const [selectedCast, setSelectedCast] = useState(null); 
  const [castInfo, setCastInfo] = useState([]);
  const [state, setState] = useState("base");
  const [movieQuery, setMovieQuery] = useState("");
  const [importedCast, setImportedCast] = useState([]);
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
      url: '/casts',
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
      url: `/casts/${selectedCast.id}`,
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
        url: `/casts/${id}`,
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

  const renderAddOrEditForm = () => (
    <div className="add-edit-form">
      <form>
        <label>
          Cast Name:
          <input
            type="text"
            name="name"
            value={castFormData.name}
            onChange={handleInputChange}
            placeholder="Enter cast name"
          />
        </label>
        <label>
          Character Name:
          <input
            type="text"
            name="characterName"
            value={castFormData.characterName}
            onChange={handleInputChange}
            placeholder="Enter character name"
          />
        </label>
        <label>
          Profile URL:
          <input
            type="text"
            name="url"
            value={castFormData.url}
            onChange={handleInputChange}
            placeholder="Enter profile image URL"
          />
        </label>
      </form>
      <button onClick={state === "edit" ? handleEditCast : handleSaveNewCast}>
        {state === "edit" ? "Save Changes" : "Add Cast"}
      </button>
    </div>
  );

  return (
    <div className="container">
      <button
        className="button-Add"
        onClick={() => {
          resetForm();
          setState(state === "add" ? "base" : "add");
        }}
      >
        {state === "add" ? "Cancel" : "Add Cast"}
      </button>

      <button
        className="button-Import"
        onClick={() => setState("import")}
      >
        Import Cast
      </button>

      {state === "add" && renderAddOrEditForm()}
      {state === "edit" && renderAddOrEditForm()}

      {castInfo.map((cast) => (
        cast.movieId === parseInt(tmdbId) && (
          <div key={cast.id} className="cast-card">
            <img src={cast.url} alt={`${cast.name} Profile`} />
            <div className="info">
              <h1>{cast.name}</h1>
              <h3>Character: {cast.characterName}</h3>
            </div>
            <div className="actions">
              <button
                className="edit-button"
                onClick={() => {
                  setSelectedCast(cast);
                  setCastFormData({
                    name: cast.name,
                    characterName: cast.characterName,
                    url: cast.url,
                  });
                  setState("edit");
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
  );
}

export default Casts;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Photos.css';

function Photos() {
  const [selectedPhoto, setSelectedPhoto] = useState({});
  const [photoInfo, setPhotoInfo] = useState([]);
  const [data, setData] = useState({});
  const [state, setState] = useState("base");

  let { tmdbId } = useParams();

  const accessToken = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem('user'));

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    if (state === "update") {
      setSelectedPhoto((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    axios({
      method: 'get',
      url: '/photos',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((response) => {
      setPhotoInfo(response.data);
    });
  }, []);

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('userId', user.userId);
    formData.append('movieId', tmdbId);
    formData.append('url', data.url);
    formData.append('description', data.description);

    axios({
      method: 'post',
      url: '/photos',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        alert("Photo has been saved successfully!");
        setState("base");
      });
  };

  const handleUpdate = async () => {
    const updateData = {
      id: selectedPhoto.id,
      userId: selectedPhoto.userId,
      movieId: tmdbId,
      url: selectedPhoto.url,
      description: selectedPhoto.description,
    };

    axios({
      method: 'patch',
      url: `/photos/${selectedPhoto.id}`,
      data: updateData,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        alert("Photo has been updated successfully!");
        setState("base");
      });
  };

  const handleDelete = (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this photo?');
    if (isConfirmed) {
      axios({
        method: 'delete',
        url: `/photos/${id}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => {
          alert("Photo has been deleted successfully!");
        });
    }
  };

  const renderForm = () => (
    <div className="photos-form-container">
      <form className="photos-form">
        <label className="photos-form-label">
          Photo URL:
          <input
            type="text"
            name="url"
            value={state === "update" ? selectedPhoto.url : data.url}
            onChange={handleOnChange}
            className="photos-form-input"
          />
        </label>
        <label className="photos-form-label">
          Photo Description:
          <input
            type="text"
            name="description"
            value={state === "update" ? selectedPhoto.description : data.description}
            onChange={handleOnChange}
            className="photos-form-input"
          />
        </label>
        <button
          type="button"
          onClick={state === "update" ? handleUpdate : handleSave}
          className="photos-form-button"
        >
          {state === "update" ? "Update" : "Save"}
        </button>
      </form>
    </div>
  );

  return (
    <div className="photos">
      <button
        className="photos-add-button"
        onClick={() => setState(state === "base" ? "add" : "base")}
      >
        {state === "add" ? "Cancel" : "Add Photo"}
      </button>
      {state !== "base" && renderForm()}

      <div className="photos-gallery">
        {photoInfo.map(
          (photo) =>
            photo.movieId === parseInt(tmdbId) && (
              <div className="photos-item" key={photo.id}>
                <img src={photo.url} alt="photo" className="photos-image" />
                <p className="photos-description">{photo.description}</p>
                <div className="photos-item-buttons">
                  <button
                    className="photos-edit-button"
                    onClick={() => {
                      setSelectedPhoto(photo);
                      setState("update");
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="photos-delete-button"
                    onClick={() => handleDelete(photo.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default Photos;

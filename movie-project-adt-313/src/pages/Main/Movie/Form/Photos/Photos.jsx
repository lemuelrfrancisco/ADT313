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

  // Handle form changes
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

  // Fetch photos on page load
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
      console.log(response.data);
    });
  }, []);

  // Save new photo
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
        console.log(response.data);
      });
  };

  // Update existing photo
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
        console.log(response.data);
      });
  };

  // Delete a photo
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
          console.log('Photo Deleted');
        });
    }
  };

  // Render the form for adding or updating a photo
  const renderForm = () => {
    if (state === "add") {
      return (
        <div>
          <form>
            <label>
              Photo URL
              <input type="text" name="url" value={data.url} onChange={handleOnChange} />
            </label>
            <label>
              Photo Description
              <input type="text" name="description" value={data.description} onChange={handleOnChange} />
            </label>
          </form>
          <button onClick={handleSave}>Save</button>
        </div>
      );
    } else if (state === "update") {
      return (
        <div>
          <form>
            <label>
              Photo URL
              <input type="text" name="url" value={selectedPhoto.url} onChange={handleOnChange} />
            </label>
            <label>
              Photo Description
              <input type="text" name="description" value={selectedPhoto.description} onChange={handleOnChange} />
            </label>
          </form>
          <button onClick={handleUpdate}>Save</button>
        </div>
      );
    }
  };

  return (
    <div>
      <button className="button-Add" onClick={() => setState(state === "base" ? "add" : "base")}>Add Photo</button>
      {renderForm()}

      {photoInfo.map((photo) => (
        photo.movieId === parseInt(tmdbId) && (
          <div key={photo.id}>
            <img src={photo.url} alt="photo" />
            <p>{photo.description}</p>
            <button onClick={() => { setSelectedPhoto(photo); setState("update"); }}>Edit</button>
            <button onClick={() => handleDelete(photo.id)}>Delete</button>
          </div>
        )
      ))}
    </div>
  );
}

export default Photos;

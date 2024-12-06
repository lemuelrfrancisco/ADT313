  import axios from 'axios';
  import React, { useEffect, useState } from 'react';
  import { useParams } from 'react-router-dom';
  import './Photos.css';

  function Photos() {
    const [selectedPhoto, setSelectedPhoto] = useState({});
    const [photoInfo, setPhotoInfo] = useState([]);
    const [data, setData] = useState({});
    const [state, setState] = useState("base");
    const [searchQuery, setSearchQuery] = useState("");
    const [tmdbPhotos, setTmdbPhotos] = useState([]);
    const [importState, setImportState] = useState(false);

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

    const handleSearch = async () => {
      if (searchQuery) {
        const apiKey = "edf660c254764564ec311f4572e462ad";
        try {
          const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=${apiKey}`);
          console.log('Movie Search Response:', response.data); 

          const movieId = response.data.results[0]?.id;
          if (movieId) {
            const photosResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${apiKey}`);
            console.log('Movie Images Response:', photosResponse.data); 
            setTmdbPhotos(photosResponse.data.backdrops); 
          }
        } catch (error) {
          console.error("Error fetching movie data", error);
        }
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

    const handleImportSave = async (photo) => {
      
      const formData = new FormData();
      formData.append('userId', user.userId);
      formData.append('movieId', tmdbId);
      formData.append('url', `https://image.tmdb.org/t/p/w500/${photo.file_path}`);
      formData.append('description', "Imported from TMDB");

      try {
        await axios({
          method: 'post',
          url: '/photos',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
        });
        alert("Photo has been imported and saved successfully!");
        setImportState(false);
        setTmdbPhotos([]); 
      } catch (error) {
        console.error("Error importing photo:", error);
        alert("Failed to import photo.");
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
        <button
          className="photos-import-button"
          onClick={() => setImportState(!importState)}
        >
          {importState ? "Cancel Import" : "Import Photos"}
        </button>

        {importState && (
          <div className="photos-import-container">
            <input
              type="text"
              placeholder="Search Movie"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="photos-search-input"
            />
            <button
              type="button"
              onClick={handleSearch}
              className="photos-search-button"
            >
              Search
            </button>
            <div className="photos-import-gallery">
              {tmdbPhotos.length > 0 ? (
                tmdbPhotos.map((photo) => (
                  <div key={photo.file_path} className="photos-item">
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${photo.file_path}`}
                      alt="movie-photo"
                      className="photos-image"
                    />
                    <p className="photos-description">TMDB Photo</p>
                    <button
                      className="photos-import-save-button"
                      onClick={() => handleImportSave(photo)} 
                    >
                      Import
                    </button>
                  </div>
                ))
              ) : (
                <p>No photos found for this movie.</p>
              )}
            </div>
          </div>
        )}

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

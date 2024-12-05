import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Videos.css';

function Videos() {
  const [selectedVideo, setSelectedVideo] = useState([]);
  const [videoInfo, setVideoInfo] = useState([]);
  const [data, setData] = useState([]);
  const [state, setState] = useState("base");

  let { tmdbId } = useParams();

  const accessToken = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem('user'));

  const handleOnChange = (e) => {
    const { name, value, type } = e.target;

    if (state === "update") {
      setSelectedVideo((prevSelectedVideo) => ({
        ...prevSelectedVideo,
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
      url: '/videos',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((response) => {
      setVideoInfo(response.data);
    });
  }, []);

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('userId', user.userId);
    formData.append('movieId', tmdbId);
    formData.append('url', data.url);
    formData.append('name', data.name);
    formData.append('site', data.site);
    formData.append('videoKey', data.videoKey);
    formData.append('videoType', data.videoType);
    formData.append('official', data.official);

    axios({
      method: 'post',
      url: '/videos',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        console.log(response.data);
        window.alert("Video has been saved successfully!"); // Pop-up message
        setState("base"); // Reset to base state
      })
      .catch((error) => {
        console.error("Error saving video:", error);
      });
  };

  const handleUpdate = async () => {
    const updateData = {
      id: selectedVideo.id,
      userId: selectedVideo.userId,
      movieId: tmdbId,
      url: selectedVideo.url,
      name: selectedVideo.name,
      site: selectedVideo.site,
      videoKey: selectedVideo.videoKey,
      videoType: selectedVideo.videoType,
      official: selectedVideo.official,
    };

    axios({
      method: 'patch',
      url: `/videos/${selectedVideo.id}`,
      data: updateData,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((response) => {
      console.log(response.data);
    });
  };

  const handleDelete = (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this video?');
    if (isConfirmed) {
      axios({
        method: 'delete',
        url: `/videos/${id}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then(() => {
        console.log('Video Deleted');
      });
    }
  };

  const renderForm = () => (
    <div className="videos__form-container">
      <form className="videos__form">
        <label>
          Video URL:
          <input
            type="text"
            name="url"
            value={state === "update" ? selectedVideo.url : data.url}
            onChange={handleOnChange}
          />
        </label>
        <label>
          Video Name:
          <input
            type="text"
            name="name"
            value={state === "update" ? selectedVideo.name : data.name}
            onChange={handleOnChange}
          />
        </label>
        <label>
          Video Site:
          <input
            type="text"
            name="site"
            value={state === "update" ? selectedVideo.site : data.site}
            onChange={handleOnChange}
          />
        </label>
        <label>
          Video Key:
          <input
            type="text"
            name="videoKey"
            value={state === "update" ? selectedVideo.videoKey : data.videoKey}
            onChange={handleOnChange}
          />
        </label>
        <label>
          Video Type:
          <input
            type="text"
            name="videoType"
            value={state === "update" ? selectedVideo.videoType : data.videoType}
            onChange={handleOnChange}
          />
        </label>
        <label>
          Official:
          <div>
            <label>
              <input
                type="radio"
                name="official"
                value="1"
                checked={state === "update" ? selectedVideo.official === "1" : data.official === "1"}
                onChange={handleOnChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="official"
                value="0"
                checked={state === "update" ? selectedVideo.official === "0" : data.official === "0"}
                onChange={handleOnChange}
              />
              No
            </label>
          </div>
        </label>
      </form>
      <button onClick={state === "update" ? handleUpdate : handleSave}>
        {state === "update" ? "Update" : "Save"}
      </button>
    </div>
  );

  return (
    <div className="videos">
      <button
        className="videos__add-button"
        onClick={() => setState(state === "base" ? "add" : "base")}
      >
        {state === "add" ? "Cancel" : "Add Video"}
      </button>
      {state !== "base" && renderForm()}
      <div className="videos__list">
        {videoInfo.map(
          (video) =>
            video.movieId === parseInt(tmdbId) && (
              <div className="videos__item" key={video.id}>
                <h1 className="videos__title">{video.name}</h1>
                <h3 className="videos__site">{video.site}</h3>
                {video.url.includes("youtube") && (
                  <iframe
                    className="videos__iframe"
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${video.videoKey}`}
                    title={video.name}
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                )}
                <button
                  className="videos__edit-button"
                  onClick={() => {
                    setSelectedVideo(video);
                    setState("update");
                  }}
                >
                  Edit
                </button>
                <button
                  className="videos__delete-button"
                  onClick={() => handleDelete(video.id)}
                >
                  Delete
                </button>
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default Videos;

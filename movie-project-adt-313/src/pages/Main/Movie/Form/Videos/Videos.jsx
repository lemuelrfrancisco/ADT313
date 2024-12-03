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

  // Handle form changes
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    
    // Update selectedVideo state when in update mode
    if (state === "update") {
      setSelectedVideo((prevSelectedVideo) => ({
        ...prevSelectedVideo,
        [name]: value,
      }));
    } else {
      // Update data state when adding a new video
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  

  // Fetch existing video information on page load
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
      console.log(response.data);
    });
  }, []);

  // Handle save for new video
  const handleSave = async (event) => {
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
      });
  };

  // Handle update for an existing video
  const handleUpdate = async (event) => {
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
    })
      .then((response) => {
        console.log(response.data);
      });
  };

  // Handle delete for a specific video
  const handleDelete = (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this video?');
    if (isConfirmed) {
      axios({
        method: 'delete',
        url: `/videos/${id}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => {
          console.log('Video Deleted');
        });
    }
  };

  // Render the form for adding or updating video
  const renderForm = () => {
    if (state === "add") {
      return (
        <div>
          <form>
            <label>
              Video URL
              <input type="text" name="url" value={data.url} onChange={handleOnChange} />
            </label>
            <label>
              Video Name
              <input type="text" name="name" value={data.name} onChange={handleOnChange} />
            </label>
            <label>
              Video Site
              <input type="text" name="site" value={data.site} onChange={handleOnChange} />
            </label>
            <label>
              Video Key
              <input type="text" name="videoKey" value={data.videoKey} onChange={handleOnChange} />
            </label>
            <label>
              Video Type
              <input type="text" name="videoType" value={data.videoType} onChange={handleOnChange} />
            </label>
            <label>
              Official (0 or 1)
              <input type="text" name="official" value={data.official} onChange={handleOnChange} />
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
              Video URL
              <input type="text" name="url" value={selectedVideo.url} onChange={handleOnChange} />
            </label>
            <label>
              Video Name
              <input type="text" name="name" value={selectedVideo.name} onChange={handleOnChange} />
            </label>
            <label>
              Video Site
              <input type="text" name="site" value={selectedVideo.site} onChange={handleOnChange} />
            </label>
            <label>
              Video Key
              <input type="text" name="videoKey" value={selectedVideo.videoKey} onChange={handleOnChange} />
            </label>
            <label>
              Video Type
              <input type="text" name="videoType" value={selectedVideo.videoType} onChange={handleOnChange} />
            </label>
            <label>
              Official (0 or 1)
              <input type="text" name="official" value={selectedVideo.official} onChange={handleOnChange} />
            </label>
          </form>
          <button onClick={handleUpdate}>Save</button>
        </div>
      );
    }
  };

  return (
    <div>
      <button onClick={() => setState(state === "base" ? "add" : "base")}>Add Video</button>
      {renderForm()}
  
      {videoInfo.map((video) =>
        video.movieId === parseInt(tmdbId) && (
          <div key={video.id}>
            <h1>{video.name}</h1>
            <h3>{video.site}</h3>
            {video.url.includes("youtube") && (
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${video.videoKey}`}
                title={video.name}
                frameBorder="0"
                allowFullScreen
                className="video-iframe"
              ></iframe>
            )}
            <button onClick={() => { setSelectedVideo(video); setState("update"); }}>Edit</button>
            <button onClick={() => handleDelete(video.id)}>Delete</button>
          </div>
        )
      )}
    </div>
  );
  
}

export default Videos;

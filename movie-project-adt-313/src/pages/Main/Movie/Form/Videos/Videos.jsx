import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Videos.css";

function Videos() {
  const [selectedVideo, setSelectedVideo] = useState({});
  const [videoInfo, setVideoInfo] = useState([]);
  const [state, setState] = useState("base");
  const [data, setData] = useState({});
  const [movieQuery, setMovieQuery] = useState("");
  const [importedVideos, setImportedVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const { tmdbId } = useParams();
  const accessToken = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("user"));
  const TMDB_API_KEY = "edf660c254764564ec311f4572e462ad";

  
  useEffect(() => {
    axios
      .get("/videos", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => setVideoInfo(response.data))
      .catch((error) => console.error("Error fetching videos:", error));
  }, [accessToken]);


  const handleOnChange = (e) => {
    const { name, value } = e.target;
    const currentState = state === "update" ? selectedVideo : data;
    if (name === "official") {
      currentState[name] = value === "1" ? true : false;
    } else {
      currentState[name] = value;
    }
    state === "update" ? setSelectedVideo({ ...currentState }) : setData({ ...currentState });
  };

 
  const handleSave = async () => {
    const formData = new FormData();
    formData.append("userId", user.userId);
    formData.append("movieId", tmdbId);
    Object.keys(data).forEach((key) => formData.append(key, data[key]));

    try {
      const response = await axios.post("/videos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("Response data:", response.data); 
      setVideoInfo((prev) => [...prev, response.data]); 
      alert("Video saved successfully!");
      setState("base");
      setData({}); 
    } catch (error) {
      console.error("Error saving video:", error);
      alert("Failed to save video. Please try again.");
    }
  };

  
  const handleUpdate = async () => {
    try {
      const response = await axios.patch(`/videos/${selectedVideo.id}`, selectedVideo, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setVideoInfo((prev) =>
        prev.map((video) => (video.id === response.data.id ? response.data : video))
      );
      alert("Video updated successfully!");
      setState("base");
    } catch (error) {
      console.error("Error updating video:", error);
    }
  };


  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      axios
        .delete(`/videos/${id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then(() => setVideoInfo((prev) => prev.filter((video) => video.id !== id)))
        .catch((error) => console.error("Error deleting video:", error));
    }
  };

  
  const handleMovieSearch = async () => {
    if (!movieQuery) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${movieQuery}&api_key=${TMDB_API_KEY}`
      );
      const movie = response.data.results[0];
      if (movie) fetchVideos(movie.id);
      else alert("No movie found with that title.");
    } catch (error) {
      console.error("Error searching for movie:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchVideos = async (movieId) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${TMDB_API_KEY}`
      );
      setImportedVideos(response.data.results);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const handleAddImportedVideo = async (video) => {
    try {
      const formData = new FormData();
      formData.append("userId", user.userId); 
      formData.append("movieId", tmdbId); 
      formData.append("url", `https://www.youtube.com/watch?v=${video.key}`);
      formData.append("name", video.name);
      formData.append("site", video.site || "YouTube");
      formData.append("videoKey", video.key);
      formData.append("videoType", video.type || "Trailer");
      formData.append("official", video.official ? "true" : "false");

      const response = await axios.post("/videos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setVideoInfo((prev) => [...prev, response.data]);
      alert(`${video.name} added successfully!`);
    } catch (error) {
      console.error("Error adding video:", error);
      alert("Failed to add video. Please try again.");
    }
  };

  const renderForm = () => (
    <div className="videos__form-container">
      <form className="videos__form">
        {["url", "name", "site", "videoKey", "videoType"].map((field) => (
          <label key={field}>
            {field.charAt(0).toUpperCase() + field.slice(1)}:
            <input
              type="text"
              name={field}
              value={state === "update" ? selectedVideo[field] || "" : data[field] || ""}
              onChange={handleOnChange}
            />
          </label>
        ))}
        <label>
          Official:
          <div>
            <label>
              <input
                type="radio"
                name="official"
                value="1"
                checked={state === "update" ? selectedVideo.official : data.official === true}
                onChange={handleOnChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="official"
                value="0"
                checked={state === "update" ? !selectedVideo.official : data.official === false}
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
      <button onClick={() => setState(state === "base" ? "add" : "base")}>
        {state === "add" ? "Cancel" : "Add Video"}
      </button>
      <button onClick={() => setState(state === "import" ? "base" : "import")}>
        {state === "import" ? "Cancel Import" : "Import Videos"}
      </button>
      {state === "add" || state === "update" ? renderForm() : null}
      {state === "import" && (
        <div>
          <input
            type="text"
            placeholder="Search movie..."
            value={movieQuery}
            onChange={(e) => setMovieQuery(e.target.value)}
          />
          <button onClick={handleMovieSearch}>Search</button>
          {loading ? <p>Loading...</p> : null}
          {importedVideos.map((video) => (
            <div key={video.id}>
              <h4>{video.name}</h4>
              <button onClick={() => handleAddImportedVideo(video)}>Add</button>
            </div>
          ))}
        </div>
      )}
      <div className="videos__list">
        {videoInfo.map((video) => video.movieId === parseInt(tmdbId) && (
          <div key={video.id} className="videos__item">
            <h3>{video.name}</h3>
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${video.videoKey}`}
              title={video.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <p>Site: {video.site}</p>
            <p>Type: {video.videoType}</p>
            <p>Official: {video.official ? "Yes" : "No"}</p>
            <button onClick={() => { setSelectedVideo(video); setState("update"); }}>Edit</button>
            <button onClick={() => handleDelete(video.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Videos;

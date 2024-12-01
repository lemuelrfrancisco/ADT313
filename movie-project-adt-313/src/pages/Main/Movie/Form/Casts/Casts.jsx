import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import './Casts.css';


function Casts() {

const [selectedCast, setSelectedCast] = useState([]);

let {tmdbId} = useParams();

const [castInfo, setCastInfo] = useState([]);
const [data,setData] = useState([]);

const accessToken = localStorage.getItem("accessToken");
const user = JSON.parse(localStorage.getItem('user'))

const handleOnChange = (e) => {
    const{name, value} = e.target; 

    setSelectedCast((prevData) => ({
        ...prevData,
        [name]: value,
    }))
}



useEffect(()=>{
    axios({
        method: 'get',
        url: `/casts`,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    }).then((response) => {
        setCastInfo(response.data)
        console.log(response.data)
    })
},[])

const handleSave = async (event) => {


    const formData = new FormData();
    formData.append('userId', user.userId);
    formData.append('movieId', tmdbId);
    formData.append('description', data.description);
    // formData.append('cast', file); // Use the state variable file
    formData.append('name', data.name);
    formData.append('characterName', data.characterName);
    formData.append('url', data.url);


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
        console.log(response.data);
      })
  };

const handleUpdate = async (event) => {

    const data = {
        id: selectedCast.id,
        userId: selectedCast.userId,
        movieId: tmdbId,
        name: selectedCast.name,
        characterName: selectedCast.characterName,
        description: selectedCast.description,
        url: selectedCast.url
    }
    axios({
        method: 'patch',
        url: `/casts/${selectedCast.id}`,
        data: data,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    })
    .then((response) => {
        console.log(response.data);
    })

}

const handleDelete = (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this cast?');
    if(isConfirmed){
        axios({
            method: 'delete',
            url: `/casts/${id}`,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        .then((response)=> {
            console.log('Database Updated');
        })
    }
}

const renderForm = () => {
    if (state === "add") {
      return (
        <div>
          <form>
            <label className='castProfile'>
              Cast Profile
              <input className="castImg" type="text" name="url" value={data.url} onChange={handleOnChange} />
            </label>
            <label>
              Cast Name
              <input className="castName" type="text" name="name" value={data.name} onChange={handleOnChange} />
            </label>
            <label>
              Cast Character Name
              <input className="castCharName" type="text" name="characterName" value={data.characterName} onChange={handleOnChange} />
            </label>
            <label>
              Cast Description
              <input className="castDesc" type="text" name="description" value={data.description} onChange={handleOnChange} />
            </label>
          </form>
          <button onClick={handleSave}>Save</button>
        </div>
      );
    } else if(state === "update"){
      return(<div>
        <form>
          CastProfile
          <input className="castImg" type="text" name='url' value={selectedCast.url} onChange={handleOnChange}/>
          CastName
          <input className="castName" type="text" name='name' value={selectedCast.name} onChange={handleOnChange}/>
          castCharacterName
          <input className="castCharName" type="text" name='characterName' value={selectedCast.characterName} onChange={handleOnChange}/>
          CastDescription
          <input className="castDesc" type="text" name='description' value={selectedCast.description} onChange={handleOnChange}/>
        </form>
        <button onClick={handleUpdate}>Save</button>
      </div>)
    }
  };

  const [state, setState] = useState("base");

  return (
    <div>
        <button className = "button-Add" onClick = {() => state == "base"?  setState("add"): setState("base")}>Add Cast</button>
        {renderForm()}

      {castInfo.map((cast) => (
        cast.movieId === parseInt(tmdbId) && (
        <div>
            <img src={cast.url}/>
            <h1>{cast.name}</h1>
            <h3>{cast.characterName}</h3>
            <button onClick={()=> {setSelectedCast(cast); setState("update")}}>Edit</button>
            <button onClick={() => handleDelete(cast.id)}>Delete</button>
        </div>
      )))}
    

        {/* <form>
            castProfile
            <input type="text" name = 'url' value={data.url} onChange={handleOnChange}/>
            castName
            <input type="text" name = 'name' value={data.name} onChange={handleOnChange}/>
            castCharacterName
            <input type="text" name = 'characterName' value={data.characterName} onChange={handleOnChange}/>
            castDescription
            <input type="text" name = 'description' value={data.description} onChange={handleOnChange}/>
        </form>
        <button onClick={handleSave}>Save</button> */}


        {/* <form>
            castProfile
            <input type="text" name = 'url' value={selectedCast.url} onChange={handleOnChange}/>
            castName
            <input type="text" name = 'name' value={selectedCast.name} onChange={handleOnChange}/>
            castCharacterName
            <input type="text" name = 'characterName' value={selectedCast.characterName} onChange={handleOnChange}/>
            castDescription
            <input type="text" name = 'description' value={selectedCast.description} onChange={handleOnChange}/>
        </form>
        <button onClick={handleUpdate}>Save</button>
        <button onClick={handleDelete}>Delete</button> */}

    </div>
  )
}

export default Casts

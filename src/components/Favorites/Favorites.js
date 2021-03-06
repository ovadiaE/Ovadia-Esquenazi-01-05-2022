import React, {useEffect, useState} from 'react';
import ApiRequest from '../../api/ApiRequest'
import Navbar from '../Navbar/Navbar';
import './Favorites.css'
import {useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import {selectCity} from '../../store/likes/likes'

function Favorites () {
  
  const dispatch = useDispatch()
  
  const [data, setData] = useState([])

  const [image, setImage] = useState('')
  
  const likes = useSelector(state => state.likedCities)
  
  const getLikedCitiesWeather = async (likes) => {
    
    if(!likes.length) return
    
    const weather = await ApiRequest.fetchLikedCities(likes)
    
    setData(weather)
    return data
  };

  const getLikedCitiesImages = async (likes) => {
    
    if(!likes.length) return
    
    const data = await ApiRequest.fetchLikedCityImages(likes)
    let randomNumber = Math.floor(Math.random() * data.length) + 0;

    setImage(data[randomNumber])
}

  
  useEffect(() => {
     getLikedCitiesImages(likes)
     getLikedCitiesWeather(likes)
  },[]) // eslint-disable-line


  const weatherDisplayBody = () => {
    return (
    <nav className='wrapper' style={{ 
      backgroundImage: `url(${image})` 
    }}>
      { data.length ? data.map((element) => {
        return ( 
          <div className = 'favorites-card' key={element.city} onClick = {(event) => {event.preventDefault(); dispatch(selectCity(element.city))}}>
            <Link className='favorites-link' to="/">
              <span className='favorites-first'> {element.city} </span>
              <span className='favorites-second'> {element.text} </span>
              <span className='favorites-third'> {element.temp}F </span>
            </Link>
          </div> ) }): null} 
      </nav>
      )
  }

  return (
    <> 
      <Navbar/>
      {weatherDisplayBody()}
    </>
  )
}

export default Favorites;
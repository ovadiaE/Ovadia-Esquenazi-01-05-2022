import axios from "axios";

export default class ApiRequest {

  static async fetchWeatherInfo(city) {
    
    const key  = process.env.REACT_APP_API_KEY
    
    try {
      const response = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${key}&q=${city}`)
      const data = await response
      
      const locationKey = data.data[0].Key
      const name = data.data[0].LocalizedName
    
      const fiveDayForecast = await fetchFiveDayForecast(locationKey, key)
      const currentWeather = await fetchCurrentWeather(locationKey, key)
      
      const allData = {cityName: name, currentWeather: currentWeather, fiveDayForecast: fiveDayForecast}
      return allData
    } 
    
    catch (error) {
      const data = error.name
      return data
    }
 }

 static async fetchLikedCities(likes) {
  const key = process.env.REACT_APP_API_KEY
  let likedCityWeather = []
  
  for (let i = 0; i < likes.length; i++) {
    
    try {
      const response = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${key}&q=${likes[i]}`)
      const data = await response
      
      const locationKey = data.data[0].Key
      
      const currentWeather = await fetchCurrentWeather(locationKey, key)
      
      const dataObject = {city: likes[i], text: currentWeather.data[0].WeatherText, temp:currentWeather.data[0].Temperature.Metric.Value}
      
      likedCityWeather.push(dataObject)      
    } 
    
    catch (error) {
      console.log(error)
    }
  }
  
  return likedCityWeather
}

static async fetchCityImage (city) {
  const response = 
  await axios.get(`https://api.unsplash.com/search/photos?&query=${city}&client_id=rZo00pgfVSBHngotZDZxM0FPyBMYASuH4Zm_IrZjaJs`)
  const data = await response
  return data
}

static async fetchLikedCityImages (likes) {
  let likedCityImages = []
  for(let i = 0; i < likes.length; i++){
    const response = 
    await axios.get(`https://api.unsplash.com/search/photos?&query=${likes[i]}&client_id=rZo00pgfVSBHngotZDZxM0FPyBMYASuH4Zm_IrZjaJs`)
    const data = await response

    likedCityImages.push(data.data.results[0].urls.regular)
  }

  return likedCityImages

}

}
  
async function fetchFiveDayForecast (locationKey, key) {
    
  try {
      const response = await axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${key}`)
      const data = await response
      
      return data
    } 
    
    catch (error) {
      console.log(error)
    }
  }

  async function fetchCurrentWeather (locationKey, key){
    try {
      const response = await axios.get(`https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${key}`)
      const data = await response
      return data
    } 
    
    catch (error) {
      console.log(error)
    }
  }
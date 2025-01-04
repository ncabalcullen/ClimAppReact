import { useState } from 'react'
import './WeatherApp.css'


export const WeatherApp = () => {

  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
  const API_KEY = 'YOUR_API_KEY'
  const difKelvin = 273.15 //Para lograr obtener grados celsius debemos restar este numero a los grados Kelvin 

  const fetchWeather = async () => {
    try {
      const response = await fetch(`${urlBase}?q=${city}&appid=${API_KEY}&lang=es`)
      const data = await response.json()
      setWeatherData(data)
    } catch (error) {
      console.error(error)

    }

  }

  const handleSubmit = (event) => {
    event.preventDefault()
    fetchWeather()


  }

  const handleCityChange = (event) => {
    setCity(event.target.value)

  }
  return (
    <>
      <div className="container">
        <h1>App del clima</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ingrese ciudad"
            value={city}
            onChange={handleCityChange}
          />
          <button type="submit">Obtener</button>
        </form>
        {weatherData && (
            <div className="card" style={{width: '18rem'}}>
            <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}  alt="..." />
            <div className="card-body">
              <h2>{weatherData.name}, {weatherData.sys.country}</h2>
              <p className="card-text">La temperatura actual es de {Math.floor(weatherData.main.temp - difKelvin)} °C</p>
              <p>La condicion meteorologia actual es: <b>{weatherData.weather[0].description}</b></p>
            </div>
            <div className="card-body">
              <a href="#" className="card-link">Card link</a>
              <a href="#" className="card-link">Another link</a>
            </div>




        </div>
        )}
      </div>
    </>
  )
}

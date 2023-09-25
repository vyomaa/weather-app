import React, {useState} from 'react'
import axios from 'axios'

function App() {
  const [data,setData] = useState({})
  const [location, setLocation] = useState('')
  const [error, setError] = useState(null);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=f882bd0828595772936061dae66bfe5a&units=metric`
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        setError(null)
        console.log(response.data)
      })
      .catch((error) => {
        setError(error);
        console.error('Error:', error)
      })
      .finally(() => {
        setLocation('')
      })
      
    }
  }
  return (
    <div className="App">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
      {error && (
        <div className="error-message">
          <h1>Error 404</h1>
          <p>Invalid Location</p>
        </div>
      )}
      {!error && (
        <div className="container">
          <div className="top">
            <div className="left">
              <div className="location">
                <p>{data.name}</p>
              </div>
              <div className="temp">
                {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
              </div>
              <div className="feels">
                {data.main ? <p>Feels like {data.main.feels_like.toFixed()}°C</p> : null}    
              </div>
            </div>
            <div className="right">
              <div className="weather-icon">
                {data.weather ? (
                  <img
                    src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                    alt="Weather Icon"
                  />
                ) : null}
              </div>
              <div className="desc">
                {data.weather ? <p>{data.weather[0].main}</p> : null}
              </div>
            </div>
          </div>
          {data.name !== undefined &&
            <div className="bottom">
              <div className="humidity">
                {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
                <p>Humidity</p>
              </div>
              <div className="wind">
                {data.wind ? <p className='bold'>{(data.wind.speed*3.6).toFixed()} km/h</p> : null}
                <p>Wind</p>
              </div>
            </div>
          }
        </div>
      )}
    </div>
  );
}

export default App;

import React from 'react';

function Forecast({date, weather}) {
  return (
    <div>
      <p>Weather for the {date}</p>
      <div className="weather-container">
        {weather.map((data) => {
          return (
            <div className="weather">
              <p>At {new Date(data.datetime).toLocaleTimeString()}</p>
              <p>{Math.floor(data.temperature)}°C</p>
              <p>{data.description}</p>
            </div>
          )
        }
        )}
      </div>
    </div>
  )
}

export default Forecast

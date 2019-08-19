import React from 'react';

class Forecast extends React.Component {
  render() {
    console.log(this.props.weather)
    return (
      <div>
        <p>Weather for the {this.props.date}</p>
        <div className="weather-container">
          {this.props.weather.map((data) => {
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
}

export default Forecast

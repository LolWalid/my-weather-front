import React from 'react';
import * as WeatherAPI from '../services/WeatherAPI';
import * as UserAPI from '../services/UserAPI';
import Forecast from './Forecast';

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_date: null,
      weather_data: null
    };

    this.saveFavoriteCity = this.saveFavoriteCity.bind(this)
  }

  componentDidMount() {
    this.fetchCity()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.city !== this.props.city) {
      this.fetchCity()
    }
  }

  fetchCity() {
    WeatherAPI.fetch(this.props.city)
              .then((response) => {
                const data = response.data;
                this.setState({ weather_data: data, selected_date: Object.keys(data)[0] })
              })
              .catch((error) => {
              })
  }

  saveFavoriteCity() {
    UserAPI.saveFavoriteCity(this.props.city)
            .then(() => {
              alert(`${this.props.city} saved as your favorite city`)
            })
            .catch((error) => {
            })
  }

  onDateSelected(date) {
    this.setState({selected_date: date})
  }

  render() {
    return (
      <div>
        <p> Weather at {this.props.city}</p>
        <button className="btn" onClick={this.saveFavoriteCity}> Save as favorite city</button>
        {
          this.state.weather_data && this.state.selected_date && this.renderForecast()
        }
      </div>
    )
  }

  renderForecast() {
    return (
      <div>
        { this.renderDateOptions() }
        <Forecast
          date={this.state.selected_date}
          weather={this.state.weather_data[this.state.selected_date]} />
      </div>
    )
  }

  renderDateOptions() {
    return (
      <ul>
        {
          Object.keys(this.state.weather_data).map( (key) => {
            return (
              <li
                key={key}
                onClick={() => this.onDateSelected(key)}
                className={(key === this.state.selected_date) ? "link selected" : "link"}>
                  {key}
              </li>
            )
          })
        }
      </ul>
    )
  }
}


export default Weather;

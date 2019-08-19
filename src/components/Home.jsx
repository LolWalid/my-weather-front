import React from 'react';
import Weather from './Weather';
import * as AuthAPI from '../services/AuthAPI';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_city: localStorage.getItem('favorite_city'),
      search: ''
    };

    this.submitForm = this.submitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    if (!AuthAPI.isLoggedIn()) {
      this.props.history.push("/login");
    }
  }

  submitForm(event) {
    event.preventDefault();
    const search = this.state.search
    if (search === "") {
    } else {
      this.setState({selected_city: search})
    }
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({search: event.target.value})
  }

  logout(event) {
    event.preventDefault();
    AuthAPI.logout()
           .then(() => {
             this.props.history.push("/login")
           })
           .catch((error) => {

           })
  }

  render() {
    return (
      <div>
        <div className="header">
          <a onClick={this.logout} href="#">logout</a>
        </div>
        <div className="container">
          <div className="row">
            <form onSubmit={this.submitForm}>
              <select
                className="form-control"
                style={{width: "auto"}}
                onChange={this.handleChange}>
                  <option value="">Select a city</option>
                  <option value="London">London</option>
                  <option value="New York">New York</option>
                  <option value="Paris">Paris</option>
                  <option value="Roma">Roma</option>
                  <option value="Singapore">Singapore</option>
              </select>
              <input
                type="submit"
                value="Search"
                className="btn btn-submit"/>
            </form>
          </div>
          { this.state.selected_city &&
                  <Weather
                    city={this.state.selected_city} />}
        </div>
      </div>
    )
  }
}

export default Home

import React from 'react';
import * as AuthAPI from '../services/AuthAPI';
import { Link } from "react-router-dom";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: null
    };

    this.submitForm = this.submitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (AuthAPI.isLoggedIn()) {
      this.props.history.push("/");
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      errors: null
    });
  }

  submitForm(event) {
    event.preventDefault();

    AuthAPI.signup({
      email: this.state.email,
      password: this.state.password
    })
    .then(() => {
      this.props.history.push("/");
    })
    .catch(error => {
      this.setState({errors: error.response.data.messages});
    });
  }

  render() {
    return (
      <div className="center">
        <div className="area">
          <form className="area" onSubmit={this.submitForm}>
            { this.state.errors && <div className="error">{renderErrors(this.state.errors)}</div> }
            <input
              name="email"
              placeholder="Email"
              type="email"
              className="form-control"
              onChange={this.handleChange}
            />
            <input
              name="password"
              placeholder="Password"
              type="password"
              className="form-control"
              onChange={this.handleChange}
            />
            <input
              type="submit"
              value="Sign up"
              className="btn btn-submit"
            />
          </form>
          <Link to="/login">Back to login page</Link>
        </div>
      </div>
    );
  }
}

function renderErrors(errors) {
  return (
    <ul>
      {
        Object.keys(errors).map(key => {
          return (
            errors[key].map(item => {
              return <li>{`${key} ${item}`}</li>
            })
          )
        })
      }
    </ul>
  )
}

export default Signup

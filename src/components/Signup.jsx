import React from 'react';
import * as AuthAPI from '../services/AuthAPI';
import { Link } from "react-router-dom";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      password_confirmation: '',
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

  validateForm() {
    if (!this.state.email) {
      this.setState({ errors: { Email: ["must be filled"] }})
      return false;
    } else if (this.state.password !== this.state.password_confirmation) {
      this.setState({ errors: { password: ["does not match password confirmation"] }})
      return false;
    }
    return true;
  }

  submitForm(event) {
    event.preventDefault();
    if (!this.validateForm()) {
      return;
    }

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
          <form onSubmit={this.submitForm}>
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
              name="password_confirmation"
              placeholder="Password Confirmation"
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

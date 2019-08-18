import React from 'react';
import * as AuthAPI from '../services/AuthAPI';

class Home extends React.Component {
  render() {
    return (
      <p>Home</p>
    )
  }

  componentDidMount() {
    if (!AuthAPI.isLoggedIn()) {
      this.props.history.push("/login");
    }
  }
}

export default Home

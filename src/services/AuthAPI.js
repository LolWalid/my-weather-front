import axiosClient from '../utils/axiosClient';

function connect(user) {
  return new Promise((resolve, reject) => {
    axiosClient
      .post('/sign_in', {
        user
      })
      .then(response => {
        localStorage.setItem(
          'jwt_token',
          response.headers.authorization
        );
        resolve();
      })
      .catch(error => {
        reject(error);
      });
  });
}

function signup(user) {
  return new Promise((resolve, reject) => {
    axiosClient
      .post('/users', {
        user
      })
      .then(response => {
        connect(user).then(response => {
          resolve();
        })
      })
      .catch(error => {
        reject(error);
      });
  })
}

function isLoggedIn() {
  return localStorage.getItem('jwt_token');
}

function disconnectUser() {
  return new Promise((resolve, reject) => {
    axiosClient
      .delete('/sign_out')
      .then(() => {
        localStorage.removeItem('jwt_token');

        resolve();
      })
      .catch(error => {
        reject(error);
      });
  });
}

export {connect, disconnectUser, isLoggedIn, signup};

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

        setFavoriteCity(response)
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

function logout() {
  return new Promise((resolve, reject) => {
    axiosClient
      .delete('/sign_out')
      .then(() => {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('favorite_city');

        resolve();
      })
      .catch(error => {
        reject(error);
      });
  });
}

function setFavoriteCity(response) {
  const city = response.data.favorite_city
  if (city) {
    localStorage.setItem('favorite_city', response.data.favorite_city);
  } else {
    localStorage.removeItem('favorite_city');
  }
}

export {connect, logout, isLoggedIn, signup, setFavoriteCity};

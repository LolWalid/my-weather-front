import axiosClient from '../utils/axiosClient';

function fetch(city) {
  return new Promise((resolve, reject) => {
    axiosClient
      .get('/weather', {
        params: { city },
        headers: {
          Authorization: localStorage.getItem('jwt_token')
        }
      })
      .then(response => {
        console.log(response)
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  })
}

export { fetch }

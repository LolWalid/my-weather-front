import axiosClient from '../utils/axiosClient';
import { setFavoriteCity } from '../services/AuthAPI';

function saveFavoriteCity(favorite_city) {
  return new Promise((resolve, reject) => {
    axiosClient
      .patch('/users/favorite_city',
        { favorite_city },
        {
          headers: {
          Authorization: localStorage.getItem('jwt_token')
        }
      })
      .then(response => {
        setFavoriteCity(response)
        resolve();
      })
      .catch(error => {
        reject(error);
      });
  })
}

export { saveFavoriteCity }

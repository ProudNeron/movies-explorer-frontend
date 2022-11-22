import {API_URL} from './consts';
import {checkServerResponse} from "./utils";

const checkToken = (token) => {
  return fetch(`${API_URL}/users/me`, {
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then(checkServerResponse);
};

const register = ({name, email, password}) => {
  return fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({name, email, password}),
  }).then(checkServerResponse);
};

const login = ({email, password}) => {
  return fetch(`${API_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password}),
  }).then(checkServerResponse);
};

const getUserInfo = (token) => {
  return fetch(`${API_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + token,
    },
  }).then(checkServerResponse);
};

const patchUserData = ({name, email}) => {
  return fetch(`${API_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + localStorage.getItem('token'),
    },
    body: JSON.stringify({email, name}),
  }).then(checkServerResponse);
};

const getSavedMovies = () => {
  return fetch(`${API_URL}/movies`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + localStorage.getItem('token'),
    },
  }).then(checkServerResponse);
}

const removeLike = (movieId) => {
  return fetch(`${API_URL}/movies/${movieId}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then(checkServerResponse);
};

const putLike = (data) => {
  return fetch(`${API_URL}/movies`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      country: data.country || '',
      director: data.director || '',
      duration: data.duration || 0,
      year: data.year || '',
      description: data.description || '',
      image: data.image,
      trailerLink: data.trailer || '',
      thumbnail: data.image || '',
      movieId: data.id || '',
      nameRU: data.nameRU,
      nameEN: data.nameEN || '',
    }),
  })
    .then(checkServerResponse);
};

export {checkToken, register, login, getUserInfo, patchUserData, getSavedMovies, putLike, removeLike};

import {API_MOVIES_SEARCH} from "./consts";
import {checkServerResponse} from "./utils";

const getAllMovies = () => {
  return fetch(API_MOVIES_SEARCH, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(checkServerResponse);
};

export {getAllMovies};

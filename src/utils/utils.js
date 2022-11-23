import {SHORT_DURATION_MIN} from "./consts";

const checkServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(res.statusMessage);
};

const transformDurationToHoursAndMinutes = (dur) => {
  const hours = (dur - (dur % 60))/60;
  if (hours) {
    return `${hours}ч ${dur - hours *60}м`;
  }

  return `${dur}м`;
}

const filterShort = movies => movies.filter(mov => mov.duration <= SHORT_DURATION_MIN);

export {checkServerResponse, transformDurationToHoursAndMinutes, filterShort};

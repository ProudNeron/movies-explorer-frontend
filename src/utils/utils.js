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

export {checkServerResponse, transformDurationToHoursAndMinutes};

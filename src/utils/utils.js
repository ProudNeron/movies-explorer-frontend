const checkServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(res.statusMessage);
};

export {checkServerResponse};

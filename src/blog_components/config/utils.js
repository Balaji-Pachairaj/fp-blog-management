export const setToken = (data) => {
  localStorage.setItem("token", data);
};

export const getToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return token;
  }
  return null;
};

export const setPreview = (data) => {
  localStorage.setItem("preview", JSON.stringify(data));
};

export const getPreview = () => {
  const token = localStorage.getItem("preview");
  if (token) {
    return JSON.parse(token);
  }
  return null;
};

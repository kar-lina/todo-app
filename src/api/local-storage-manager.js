export const setToLocalStorage = (key, items) => {
  localStorage.setItem(key, JSON.stringify(items));
};
export const getFromLocalStorage = (key) => {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
};

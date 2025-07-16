import axios from 'axios';


function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let c of cookies) {
      const cookie = c.trim();
      if (cookie.substring(0, name.length + 1) === `${name}=`) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
const API = axios.create({
  baseURL: 'http://localhost:8000/',
});

// Add interceptor to include CSRF token in unsafe requests
API.interceptors.request.use(
  config => {
    const csrfSafeMethods = ['GET', 'HEAD', 'OPTIONS'];
    const csrfToken = getCookie('csrftoken');

    if (!csrfSafeMethods.includes(config.method.toUpperCase()) && csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken;
    }

    return config;
  },
  error => Promise.reject(error)
);

export default API;

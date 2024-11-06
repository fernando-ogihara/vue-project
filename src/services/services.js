import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost/wp-json/api"
});

axiosInstance.interceptors.request.use(
  function(config) {
    const token = window.localStorage.token;
    if(token) {
      config.headers.Authorization = token
    } 
    return config;
  },
  function (error) {
    return Promise.reject(error)
  }
)

export const api = {
  get(endpoint) {
    return axiosInstance.get(endpoint);
  },
  post(endpoint, body) {
    return axiosInstance.post(endpoint, body);
  },
  put(endpoint, body) {
    return axiosInstance.put(endpoint, body);
  },
  delete(endpoint) {
    return axiosInstance.delete(endpoint);
  },
  login(body) {
    return axios.post(`http://localhost/wp-json/jwt-auth/v1/token`, body)
  },
  validateToken(){
    return axiosInstance.post(`http://localhost/wp-json/jwt-auth/v1/token/validate`)
  }
};

export function postcodeLookup(postcode) {
  try {
    const response = axios.get(`https://api.postcodes.io/postcodes/${postcode}`);
    return response;
  } catch (error) {
    if (error.response) {
      console.error(error.response);
    }
  }
}